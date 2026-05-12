"use client";

import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useEffect, useRef, useState, useCallback } from "react";

const LIGHT_COLORS = ["#111111", "#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
const DARK_COLORS = [
  "#f8fafc", // off-white (not pure white)
  "#fb7185", // muted red
  "#60a5fa", // soft blue
  "#4ade80", // soft green
  "#facc15", // warm yellow
];


type Props = {
  active: boolean;
  onExit: () => void;
  theme: "light" | "dark";
};

export default function DrawOverlay({ active, onExit, theme }: Props) {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const isDark = theme === "dark";
  const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;

  const [colorIndex, setColorIndex] = useState(0);
  const color = COLORS[colorIndex];

  const [width, setWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(20);
  const [eraser, setEraser] = useState(false);
  const [isScrollMode, setIsScrollMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  /* ---------- Draggable Logic ---------- */
  const [panelPos, setPanelPos] = useState({ x: 16, y: 80 });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const MIN_BRUSH = 1;
  const MAX_BRUSH = 40;
  const MIN_ERASER = 5;
  const MAX_ERASER = 100;
  const SIZE_STEP = 2;

  const toggleEraser = useCallback((val: boolean) => {
    setEraser(val);
    if (!val) {
      setTimeout(() => {
        canvasRef.current?.eraseMode(false);
      }, 20);
    } else {
      canvasRef.current?.eraseMode(true);
    }
    setIsScrollMode(false);
  }, []);

useEffect(() => {
  // keep same semantic index, just new palette
  setColorIndex((i) => i);
}, [isDark]);



  /* ---------- Keyboard Shortcuts ---------- */
useEffect(() => {
  if (!active) return;

  let cHeld = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!active) return;
    const key = e.key.toLowerCase();

    /* ---------- MODIFIER SHORTCUTS ---------- */

    // Alt + C → Clear (ONLY destructive shortcut)
    if (e.altKey && key === "c") {
      e.preventDefault();
      canvasRef.current?.clearCanvas();
      return;
    }

    // Alt + + → Increase size
    if (e.altKey && (key === "+" || key === "=")) {
      e.preventDefault();
      if (eraser) {
        setEraserWidth((w) => Math.min(w + SIZE_STEP, MAX_ERASER));
      } else {
        setWidth((w) => Math.min(w + SIZE_STEP, MAX_BRUSH));
      }
      return;
    }

    /* ---------- C MODE (CONFIG MODE) ---------- */

    if (key === "c" && !e.altKey && !e.ctrlKey && !e.metaKey) {
      cHeld = true;
    }

    if (cHeld && key === "arrowright") {
      e.preventDefault();
      toggleEraser(false);
      const next = (colorIndex + 1) % COLORS.length;
      setColorIndex(next);

      return;
    }

    if (cHeld && key === "arrowleft") {
      e.preventDefault();
      toggleEraser(false);
      const prev = (colorIndex - 1 + COLORS.length) % COLORS.length;
      setColorIndex(prev);

      return;
    }

    if (cHeld && (key === "+" || key === "=")) {
      e.preventDefault();
      if (eraser) {
        setEraserWidth((w) => Math.min(w + SIZE_STEP, MAX_ERASER));
      } else {
        setWidth((w) => Math.min(w + SIZE_STEP, MAX_BRUSH));
      }
      return;
    }

    if (cHeld && key === "-") {
      e.preventDefault();
      if (eraser) {
        setEraserWidth((w) => Math.max(w - SIZE_STEP, MIN_ERASER));
      } else {
        setWidth((w) => Math.max(w - SIZE_STEP, MIN_BRUSH));
      }
      return;
    }

    /* ---------- NORMAL SHORTCUTS (ALWAYS WORK) ---------- */

    if (key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      canvasRef.current?.undo();
    }

    if (
      ((key === "z" && e.shiftKey) || key === "y") &&
      (e.ctrlKey || e.metaKey)
    ) {
      e.preventDefault();
      canvasRef.current?.redo();
    }

    if (key === "s" && !e.ctrlKey && !e.metaKey)
      setIsScrollMode((prev) => !prev);

    if (key === "e" && !e.ctrlKey && !e.metaKey) toggleEraser(!eraser);

    if (key === "h" && !e.ctrlKey && !e.metaKey) setCollapsed((prev) => !prev);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "c") {
      cHeld = false;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [active, eraser, colorIndex, COLORS, toggleEraser]);


  if (!active) return null;

  /* ---------- Drag Handlers ---------- */
  const startDrag = (x: number, y: number) => {
    dragging.current = true;
    dragOffset.current = { x: x - panelPos.x, y: y - panelPos.y };
  };

  const onMove = (x: number, y: number) => {
    if (!dragging.current) return;
    setPanelPos({
      x: Math.max(
        0,
        Math.min(x - dragOffset.current.x, window.innerWidth - 100),
      ),
      y: Math.max(
        0,
        Math.min(y - dragOffset.current.y, window.innerHeight - 60),
      ),
    });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) =>
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [panelPos]);

  const cursorColor = isDark ? "white" : "black";
  const penCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${cursorColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>') 0 24, crosshair`;
  const eraserSize = Math.max(eraserWidth, 12);
  const eraserCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${eraserSize}" height="${eraserSize}" viewBox="0 0 ${eraserSize} ${eraserSize}"><rect x="1" y="1" width="${
    eraserSize - 2
  }" height="${
    eraserSize - 2
  }" rx="2" fill="none" stroke="${cursorColor}" stroke-width="2" stroke-dasharray="4"/></svg>') ${
    eraserSize / 2
  } ${eraserSize / 2}, auto`;

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[124] transition-opacity duration-500"
        style={{
          border: isDark
            ? "4px solid rgba(59, 130, 246, 0.4)"
            : "4px solid rgba(37, 99, 235, 0.25)",
          boxShadow: isDark
            ? "inset 0 0 60px rgba(59, 130, 246, 0.2)"
            : "inset 0 0 60px rgba(37, 99, 235, 0.15)",
          opacity: active ? 1 : 0,
        }}
      />

      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed z-[130] right-6 top-24 rounded-full p-4 shadow-2xl transition-transform hover:scale-110"
          style={{
            backgroundColor: "var(--ui-bg)",
            border: "2px solid var(--ui-border)",
            color: "var(--ui-text)",
          }}
          title="Show Toolbar (H)"
        >
          ✏️
        </button>
      ) : (
        <div
          className="fixed z-[130] flex flex-wrap items-center gap-y-3 gap-x-2 p-2 rounded-xl shadow-2xl select-none max-w-[95vw]"
          style={{
            left: panelPos.x,
            top: panelPos.y,
            backgroundColor: "var(--ui-bg)",
            border: "2px solid var(--ui-border)",
            color: "var(--ui-text)",
          }}
        >
          {/* DRAG HANDLE */}
          <div
            className="flex flex-col gap-0.5 px-1 cursor-move opacity-40 hover:opacity-100 touch-none"
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onTouchStart={(e) =>
              startDrag(e.touches[0].clientX, e.touches[0].clientY)
            }
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
            ))}
          </div>

          {/* MODE TOGGLE */}
          <div className="flex flex-col items-center">
            <div className="relative flex p-1 rounded-lg bg-[var(--ui-bg-soft)] border border-[var(--ui-border)] w-28 h-8">
              <button
                onClick={() => setIsScrollMode(false)}
                className={`relative z-10 flex-1 text-[9px] font-bold ${
                  !isScrollMode ? "text-white" : "opacity-50"
                }`}
                title="Draw Mode (S)"
              >
                DRAW
              </button>
              <button
                onClick={() => setIsScrollMode(true)}
                className={`relative z-10 flex-1 text-[9px] font-bold ${
                  isScrollMode ? "text-white" : "opacity-50"
                }`}
                title="Scroll Mode (S)"
              >
                SCROLL
              </button>
              <div
                className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-blue-600 rounded-md transition-all duration-200"
                style={{
                  transform: isScrollMode
                    ? "translateX(100%)"
                    : "translateX(0%)",
                }}
              />
            </div>
            <span className="text-[7px] font-bold opacity-40 mt-1 uppercase tracking-tighter">
              {isScrollMode ? "Navigation Mode" : "Sketch Mode"}
            </span>
          </div>

          {/* COLORS */}
          <div className="flex gap-1.5 border-l border-[var(--ui-border)] pl-2 h-8 items-center">
            {COLORS.map((c, i) => (
              <button
                key={c}
                onClick={() => {
                  setColorIndex(i);
                  toggleEraser(false);
                }}
                className="h-5 w-5 rounded-full border border-black/10 transition-transform active:scale-90"
                style={{
                  backgroundColor: c,
                  border: color === c && !eraser ? "2px solid #2563eb" : "none",
                }}
              />
            ))}
          </div>

          {/* SLIDER & PREVIEW */}
          <div className="flex items-center gap-2 border-l border-[var(--ui-border)] pl-2 h-8">
            <input
              type="range"
              min="1"
              max={eraser ? "100" : "40"}
              value={eraser ? eraserWidth : width}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                eraser ? setEraserWidth(val) : setWidth(val);
              }}
              className="w-16 sm:w-24 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              title={eraser ? "Eraser Size" : "Brush Size"}
            />
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-soft)]">
              <div
                style={{
                  width: `${Math.min(eraser ? eraserWidth / 2 : width, 24)}px`,
                  height: `${Math.min(eraser ? eraserWidth / 2 : width, 24)}px`,
                  backgroundColor: eraser ? "transparent" : color,
                  borderRadius: eraser ? "2px" : "50%",
                  border: eraser ? `2px dashed ${cursorColor}` : "none",
                }}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1 border-l border-[var(--ui-border)] pl-2">
            <button
              onClick={() => canvasRef.current?.undo()}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-500/10 rounded-lg border border-[var(--ui-border)]"
              title="Undo (Ctrl+Z)"
            >
              ↩
            </button>
            <button
              onClick={() => canvasRef.current?.redo()}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-500/10 rounded-lg border border-[var(--ui-border)]"
              title="Redo (Ctrl+Y)"
            >
              ↪
            </button>

            <button
              onClick={() => toggleEraser(!eraser)}
              className={`px-2 h-8 text-[9px] font-bold uppercase rounded-lg border transition-all ${
                eraser
                  ? "bg-red-500 text-white border-red-500"
                  : "border-[var(--ui-border)] opacity-80"
              }`}
              title="Eraser (E)"
            >
              {eraser ? "🧽" : "Eraser"}
            </button>
            <button
              onClick={() => canvasRef.current?.clearCanvas()}
              className="px-2 h-8 text-[9px] font-bold uppercase rounded-lg border border-[var(--ui-border)] hover:bg-red-500/10"
              title="Clear Canvas"
            >
              Clear
            </button>
          </div>

          {/* MINIMIZE & EXIT */}
          <div className="flex items-center gap-1 border-l border-[var(--ui-border)] pl-2 h-8">
            <button
              onClick={() => setCollapsed(true)}
              className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 hover:text-blue-500 transition-colors"
              title="Minimize (H)"
            >
              <span className="text-lg font-bold">—</span>
            </button>
            <button
              onClick={onExit}
              className="w-8 h-8 flex items-center justify-center text-red-500 opacity-60 hover:opacity-100 transition-colors"
              title="Exit Tool"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* CANVAS */}
      <div
        className={`fixed inset-0 z-[125] ${
          isScrollMode ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{
          cursor: isScrollMode ? "default" : eraser ? eraserCursor : penCursor,
        }}
      >
        <ReactSketchCanvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ background: "transparent" }}
          strokeWidth={width}
          eraserWidth={eraserWidth}
          strokeColor={color}
          canvasColor="transparent"
        />
      </div>
    </>
  );
}
