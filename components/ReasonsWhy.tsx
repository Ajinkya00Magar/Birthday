"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import KineticText from "./KineticText";
import { SparkleIcon } from "./icons";
import { playCardFlip } from "./sound-effects";

type ReasonsWhyProps = {
  eyebrow: string;
  title: string;
  lede: string;
  reasons: string[];
};

export default function ReasonsWhy({ eyebrow, title, lede, reasons }: ReasonsWhyProps) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    playCardFlip();
    setFlipped((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="section section--coral" id="reasons" aria-label={title}>
      <Reveal as="p" className="section__eyebrow">
        {eyebrow}
      </Reveal>
      <h2 className="section__title">
        <KineticText text={title} />
      </h2>
      <Reveal as="p" className="section__lede">
        {lede}
      </Reveal>

      <ul className="reasons__grid">
        {reasons.map((reason, index) => (
          <Reveal as="li" variant="pop" key={index} delay={index * 80} className="reasons__slot">
            <button
              type="button"
              className={`reasons__card${flipped.has(index) ? " reasons__card--flipped" : ""}`}
              onClick={() => toggle(index)}
              aria-pressed={flipped.has(index)}
              aria-label={flipped.has(index) ? `Card ${index + 1}: ${reason}` : `Reveal card ${index + 1}`}
            >
              <span className="reasons__card-inner">
                <span className="reasons__card-face reasons__card-face--front">
                  <SparkleIcon size={26} />
                  <span className="reasons__card-number">#{index + 1}</span>
                </span>
                <span className="reasons__card-face reasons__card-face--back">{reason}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
