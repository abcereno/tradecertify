import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const scrollYRef = useRef(0);

  // ✅ Robust body scroll lock (works on iOS)
  useEffect(() => {
    if (!isOpen) return;
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;

    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      // restore
      Object.assign(body.style, prev);
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-3 sm:p-6 overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
      onClick={onClose} // backdrop click closes
    >
      <div
        className="
          relative w-full max-w-lg rounded-lg bg-white shadow-lg
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-base font-semibold truncate">{title}</h2>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* ✅ Scrollable content area */}
          {children}
        </div>
      </div>
  );

  // Portal avoids z-index/stacking issues
  const root = typeof document !== "undefined" ? document.body : null;
  return root ? createPortal(modal, root) : modal;
};

export default Modal;
