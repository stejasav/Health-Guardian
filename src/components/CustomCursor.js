import React, { useState, useEffect, useRef, useMemo } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const cursorRef = useRef(null);

  const textElements = useMemo(() => [
    "P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI", 
    "TD", "TH", "EM", "STRONG", "LABEL", "A", "BUTTON", "IMG", "iframe"
  ], []);

  useEffect(() => {
    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && textElements.includes(element.tagName)) {
        setIsHoveringText(true);

        // Apply color change to text under cursor
        // if (element.style) {
        //   element.style.transition = "color 0.3s ease";

        //   // Add event listener to restore color when cursor leaves
        //   const restoreColor = () => {
        //     element.removeEventListener("mouseleave", restoreColor);
        //   };

        //   element.addEventListener("mouseleave", restoreColor);
        // }
      } else {
        setIsHoveringText(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [textElements]);

  const cursorStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    transform: isClicking
      ? `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(0.8)`
      : `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(1)`,
    width: isHoveringText ? "70px" : "25px",
    height: isHoveringText ? "70px" : "25px",
    backgroundColor: "#00e5ff",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    opacity: isVisible ? (isHoveringText ? 0.8 : 1) : 0,
    transition: "width 0.2s ease, height 0.2s ease, transform 0.05s linear",
    mixBlendMode: "difference",
    boxShadow: isClicking ? "0 0 15px #00e5ff" : "0 0 10px #00e5ff",
    filter: isHoveringText ? "brightness(1.5)" : "none",
  };

  return <div ref={cursorRef} style={cursorStyle}></div>;
}