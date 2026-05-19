"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useModal } from "@/lib/modal-context";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Nav() {
  const { openPay } = useModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-substrate/95 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label={copy.footer.navAriaLabel}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center gap-2" aria-label={copy.brand.name}>
          <Image
            src="/codeflying-logo.svg"
            alt={copy.brand.name}
            width={156}
            height={32}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              track("click_cta_pay", { source: "nav" });
              openPay();
            }}
          >
            {copy.nav.ctaPrimary}
          </Button>
        </div>
      </nav>
    </header>
  );
}
