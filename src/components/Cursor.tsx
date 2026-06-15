"use client";

import React, { useEffect, useRef } from "react";

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth lerp animation for cursor following
    const updateCursor = () => {
      // Lerp logic
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(updateCursor);
    };

    const animId = requestAnimationFrame(updateCursor);

    // Event listeners to detect interaction and morph the cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !cursor) return;

      // Check if target is a link, button, or has interactive roles
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive");

      // Check if inside a dark section
      const inDarkSection = target.closest(".dark-section");

      // Check if hovering large title
      const isLargeTitle =
        target.classList.contains("overflowing-heading") ||
        target.tagName === "H1" ||
        target.closest(".magnify-hover");

      if (isInteractive) {
        cursor.classList.add("hovering-link");
      } else {
        cursor.classList.remove("hovering-link");
      }

      if (inDarkSection) {
        cursor.classList.add("hovering-dark");
        document.body.classList.add("dark-theme-active");
      } else {
        cursor.classList.remove("hovering-dark");
        document.body.classList.remove("dark-theme-active");
      }

      if (isLargeTitle) {
        cursor.classList.add("hovering-text");
      } else {
        cursor.classList.remove("hovering-text");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};
