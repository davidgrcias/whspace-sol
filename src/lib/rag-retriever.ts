import { KNOWLEDGE_BASE, KBChunk } from "./knowledge-base";

// Basic English & Indonesian stop words to clean up vectors
const STOP_WORDS = new Set([
  // English
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "to", "for", "in", "on", "at", "by", "from", "with", "about", "what", "who", "where", "how", "why", "we", "our", "you", "your", "they", "them", "it", "its", "that", "this", "these", "those",
  // Indonesian
  "yang", "di", "ke", "dari", "pada", "dalam", "untuk", "dengan", "dan", "atau", "adalah", "itu", "ini", "kami", "kita", "saya", "anda", "mereka", "dia", "tentang", "seperti", "oleh", "untuk", "oleh", "apakah", "siapa", "mengapa", "bagaimana", "dimana", "ada", "adalah"
]);

// Helper: Tokenize text into words
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove punctuation except dashes
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

// Compute IDF for all terms in the knowledge base
function calculateIDF(docs: KBChunk[]): Map<string, number> {
  const docCount = docs.length;
  const termDocCounts = new Map<string, number>();

  docs.forEach(doc => {
    const tokens = new Set(tokenize(doc.content));
    tokens.forEach(token => {
      termDocCounts.set(token, (termDocCounts.get(token) || 0) + 1);
    });
  });

  const idf = new Map<string, number>();
  termDocCounts.forEach((count, token) => {
    // Standard IDF formula with smoothing
    idf.set(token, Math.log((docCount + 1) / (count + 0.5)));
  });

  return idf;
}

// Create TF vector for a text
function getTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  tokens.forEach(token => {
    tf.set(token, (tf.get(token) || 0) + 1);
  });
  // Normalize TF
  const total = tokens.length || 1;
  tf.forEach((count, token) => {
    tf.set(token, count / total);
  });
  return tf;
}

// Global cache for IDF
const docIDF = calculateIDF(KNOWLEDGE_BASE);

// Compute Cosine Similarity between query vector and document vector
function cosineSimilarity(
  queryTF: Map<string, number>,
  docTF: Map<string, number>,
  idf: Map<string, number>
): number {
  let dotProduct = 0;
  let queryNormSq = 0;
  let docNormSq = 0;

  // Set of all unique terms in both vectors
  const allTerms = new Set([...queryTF.keys(), ...docTF.keys()]);

  allTerms.forEach(term => {
    const termIDF = idf.get(term) || 0.1;
    const qVal = (queryTF.get(term) || 0) * termIDF;
    const dVal = (docTF.get(term) || 0) * termIDF;

    dotProduct += qVal * dVal;
    queryNormSq += qVal * qVal;
    docNormSq += dVal * dVal;
  });

  if (queryNormSq === 0 || docNormSq === 0) return 0;
  return dotProduct / (Math.sqrt(queryNormSq) * Math.sqrt(docNormSq));
}

export interface RetrievalResult {
  chunk: KBChunk;
  score: number;
}

/**
 * Retrieve top-K relevant chunks from the knowledge base for a given query.
 */
export function retrieveContext(query: string, topK = 3): KBChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    // Fallback: return the first few general chunks if query is empty
    return KNOWLEDGE_BASE.slice(0, topK);
  }

  const queryTF = getTF(queryTokens);

  const results: RetrievalResult[] = KNOWLEDGE_BASE.map(doc => {
    const docTokens = tokenize(doc.content);
    const docTF = getTF(docTokens);

    // Calculate baseline cosine similarity
    let score = cosineSimilarity(queryTF, docTF, docIDF);

    // Metadata Tag Matching Boost (highly effective for short keyword queries)
    let tagMatches = 0;
    queryTokens.forEach(token => {
      if (doc.tags.includes(token)) {
        tagMatches++;
      }
    });

    if (tagMatches > 0) {
      // Boost score significantly for explicit keyword hits in tags
      score += tagMatches * 0.25;
    }

    return { chunk: doc, score };
  });

  // Sort by score descending and filter out zeros
  const sorted = results
    .filter(r => r.score > 0.01)
    .sort((a, b) => b.score - a.score);

  // Return the chunks
  const retrieved = sorted.slice(0, topK).map(r => r.chunk);

  // Fallback: If nothing matched, return default chunks
  if (retrieved.length === 0) {
    return KNOWLEDGE_BASE.slice(0, topK);
  }

  return retrieved;
}
