"use client";

import { useEffect } from "react";
import { getLenis } from "./lenis-singleton";
import { content } from "@/data/content";

type LoadingScreenProps = {
  onDone: () => void;
  minDuration?: number;
};

export default function LoadingScreen({ onDone, minDuration = 1400 }: LoadingScreenProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(onDone, minDuration);
    return () => window.clearTimeout(timer);
  }, [minDuration, onDone]);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <span className="loading-screen__icon" aria-hidden="true">
        🎁
      </span>
      <div className="loading-screen__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="loading-screen__label">{content.loadingLabel}</p>
    </div>
  );
}
