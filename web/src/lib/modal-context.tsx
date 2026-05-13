"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ModalKind = "pay" | "email" | null;

interface ModalContextValue {
  open: ModalKind;
  prefillPrompt: string;
  openPay: (prefillPrompt?: string) => void;
  openEmail: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ModalKind>(null);
  const [prefillPrompt, setPrefillPrompt] = useState("");

  const openPay = useCallback((prefill?: string) => {
    setPrefillPrompt(prefill ?? "");
    setOpen("pay");
  }, []);

  const openEmail = useCallback(() => {
    setPrefillPrompt("");
    setOpen("email");
  }, []);

  const close = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ open, prefillPrompt, openPay, openEmail, close }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
}
