"use client";

import { type ReactNode, useEffect } from "react";
import { ModalProvider } from "@/lib/modal-context";
import { Modal, useModalAria } from "@/components/modals/Modal";
import { track } from "@/lib/analytics";

/**
 * Client-only providers wrapping the LP shell.
 * - ModalProvider: shared state for pay/email modals
 * - Renders the Modal component once (it conditionally shows based on state)
 * - Fires view_landing analytics event on mount
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <PageViewTracker />
      <ModalShell />
      {children}
    </ModalProvider>
  );
}

function ModalShell() {
  useModalAria();
  return <Modal />;
}

function PageViewTracker() {
  useEffect(() => {
    track("view_landing");
  }, []);
  return null;
}
