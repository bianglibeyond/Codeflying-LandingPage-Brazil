"use client";

import { type ReactNode, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { ModalProvider } from "@/lib/modal-context";
import { Modal, useModalAria } from "@/components/modals/Modal";
import { PixelsLoader } from "@/components/PixelsLoader";
import { track } from "@/lib/analytics";

/**
 * Client-only providers wrapping the LP shell.
 * - ModalProvider: shared state for pay/email modals
 * - Renders the Modal component once (it conditionally shows based on state)
 * - Fires view_landing analytics event on mount
 * - Loads Vercel Analytics (always, essential) + consent-gated marketing pixels
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <PageViewTracker />
      <ModalShell />
      {children}
      <Analytics />
      <PixelsLoader />
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
