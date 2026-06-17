"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_STORAGE_KEY, DEMO_PASSWORD } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(AUTH_STORAGE_KEY) === "true") {
      router.replace("/dashboard");
      return;
    }
    inputRef.current?.focus();
  }, [router]);

  const attemptLogin = () => {
    if (password === DEMO_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      router.push("/dashboard");
      return;
    }
    setShowError(true);
    setPassword("");
    inputRef.current?.focus();
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    attemptLogin();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      attemptLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo-area">
          <div className="logo-shield">G</div>
          <div className="logo-text">Gaw Capital</div>
          <div className="logo-subtitle">Asset Intelligence Platform</div>
        </div>
        <div className="divider" />
        <form onSubmit={onSubmit}>
          <div className="field-label">Enter access code</div>
          <input
            ref={inputRef}
            className="password-input"
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Access code"
            type="password"
            value={password}
          />
          <button className="login-btn" type="submit">
            Access Platform
          </button>
        </form>
        <div className="login-error" style={{ display: showError ? "block" : "none" }}>
          Invalid access code. Please try again.
        </div>
        <div className="footer-text">Gaw Capital Partners - Hackathon 2026</div>
      </div>
    </div>
  );
}
