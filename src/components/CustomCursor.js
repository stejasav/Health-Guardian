import React, { useState, useEffect, useRef, useMemo } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = useRef(null);

  const interactiveElements = useMemo(() => [
    "A", "BUTTON", "INPUT", "TEXTAREA", "LABEL"
  ], []);

  // 🎯 Mouse move
  useEffect(() => {
    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && interactiveElements.includes(el.tagName)) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [interactiveElements]);

  // 🌊 Smooth trailing effect
  useEffect(() => {
    const follow = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const id = setInterval(follow, 16);
    return () => clearInterval(id);
  }, [position]);

  // 🎨 MAIN CURSOR STYLE
  const mainCursor = {
    position: "fixed",
    left: 0,
    top: 0,
    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
    width: isHovering ? "60px" : "20px",
    height: isHovering ? "60px" : "20px",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    opacity: isVisible ? 1 : 0,

    background: isHovering
      ? "radial-gradient(circle, rgba(74,222,128,0.25), rgba(29,158,117,0.1))"
      : "linear-gradient(135deg, #4ade80, #1d9e75)",

    boxShadow: isHovering
      ? "0 0 40px rgba(74,222,128,0.5)"
      : "0 0 12px rgba(29,158,117,0.6)",

    backdropFilter: "blur(6px)",
    transition:
      "width 0.2s ease, height 0.2s ease, transform 0.08s ease-out",
  };

  // 🌿 TRAIL CURSOR (soft glow follower)
  const trailCursor = {
    position: "fixed",
    left: 0,
    top: 0,
    transform: `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`,
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9998,
    opacity: isVisible ? 0.25 : 0,

    background:
      "radial-gradient(circle, rgba(29,158,117,0.3), transparent 70%)",

    filter: "blur(20px)",
    transition: "opacity 0.3s ease",
  };

  return (
    <>
      <div style={trailCursor} />
      <div ref={cursorRef} style={mainCursor} />
    </>
  );
}