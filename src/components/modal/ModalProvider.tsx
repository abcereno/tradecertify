// src/components/modal/ModalProvider.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import Modal from "../Modals";

type OpenFn = (content: React.ReactNode) => void;

const ModalCtx = createContext<{ open: OpenFn } | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("useModal must be used within <ModalProvider>");
  return ctx;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const open = useCallback<OpenFn>((node) => {
    setContent(node);
    setIsOpen(true);
  }, []);

  return (
    <ModalCtx.Provider value={{ open }}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {content}
      </Modal>
    </ModalCtx.Provider>
  );
};
