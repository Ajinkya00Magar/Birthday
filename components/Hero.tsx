"use client";

import { useState } from "react";
import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";
import KineticText from "./KineticText";
import type { Photo } from "@/data/content";

type HeroProps = {
  displayName: string;
  recipientName: string;
  age?: string;
  birthdayDate?: string;
  eyebrow: string;
  supportingLine: string;
  photo: Photo;
  extraPhotos?: Photo[];
};

export default function Hero({
  displayName,
  recipientName,
  age,
  birthdayDate,
  eyebrow,
  supportingLine,
  photo,
  extraPhotos = [],
}: HeroProps) {
  const allPhotos = [photo, ...extraPhotos];
  const [activeIndex, setActiveIndex] = useState(0);
  const currentPhoto = allPhotos[activeIndex] || photo;

  return (
    <section className="hero" id="hero" aria-label="Birthday welcome">
      <div className="hero__frame-container flex flex-col items-center">
        <Reveal as="div" variant="pop" className="hero__frame">
          <PhotoFrame
            photo={currentPhoto}
            priority
            sizes="(min-width: 640px) 320px, 80vw"
            showCaption={Boolean(currentPhoto.caption)}
          />
        </Reveal>

        {allPhotos.length > 1 ? (
          <Reveal delay={120} as="div">
            <div
              className="hero__photo-tabs mt-3 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Featured solo and duo photos"
            >
              {allPhotos.map((p, idx) => {
                const label =
                  idx === 0
                    ? "✨ Solo Portrait"
                    : idx === 1
                    ? "✌️ Duo Moments"
                    : "🌸 Pure Joy";
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    className={`hero__photo-tab rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      idx === activeIndex
                        ? "bg-[var(--color-ink)] text-[var(--color-paper)] shadow-md scale-105"
                        : "bg-[var(--color-paper)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] hover:bg-[var(--color-sun)]/30"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}
      </div>

      <div className="hero__name-wrap">
        <Sparkle className="hero__sparkle" />
        <Reveal as="p" delay={80} className="hero__eyebrow">
          {eyebrow}
        </Reveal>
        <h1 className="hero__name">
          <KineticText text={`Our ${displayName}.`} delay={200} />
        </h1>
      </div>

      {(age || birthdayDate) ? (
        <Reveal delay={220} variant="wiggle" className="hero__meta" as="div">
          {age ? <span>🎂 {age} years old</span> : null}
          {birthdayDate ? <span>📅 {birthdayDate}</span> : null}
        </Reveal>
      ) : null}

      <Reveal delay={320}>
        <p className="hero__message">{supportingLine}</p>
      </Reveal>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
        <span>Scroll to continue the story</span>
      </div>
    </section>
  );
}
