"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/lib/modal-context";
import { copy } from "@/lib/copy";

/**
 * Stripe cancel redirect (Tier 2 signal — user clicked pay but didn't complete).
 * The Stripe Customer remains with status='intent_pending' (no action needed here).
 * We just show a friendly retry path.
 */
export default function CanceladoPage() {
  const { openPay } = useModal();
  return (
    <div className="bg-substrate min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-6">
      <div className="max-w-md text-center flex flex-col gap-4">
        <h1 className="text-h2 text-ink">{copy.cancelado.title}</h1>
        <p className="text-body text-body">{copy.cancelado.body}</p>
        <div className="flex flex-col items-center gap-3 mt-4">
          <Button variant="primary" size="lg" onClick={() => openPay()}>
            {copy.cancelado.retry}
          </Button>
          <Link href="/" className="text-body-sm text-muted underline">
            {copy.cancelado.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
