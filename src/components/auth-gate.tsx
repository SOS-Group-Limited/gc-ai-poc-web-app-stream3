"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_STORAGE_KEY } from "@/lib/auth";

type AuthGateProps = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthed =
    typeof window !== "undefined" && localStorage.getItem(AUTH_STORAGE_KEY) === "true";

  useEffect(() => {
    if (!isAuthed) {
      router.replace("/login");
    }
  }, [isAuthed, pathname, router]);

  if (!isAuthed) {
    return null;
  }

  return <>{children}</>;
}
