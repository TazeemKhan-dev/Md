"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalShortcuts() {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!e.altKey) return;

      // Alt + 1 → Home
      if (e.key === "1") {
        e.preventDefault();
        router.push("/");
      }

      // Alt + 2 → Journal
      if (e.key === "2") {
        e.preventDefault();
        router.push("/journal");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
