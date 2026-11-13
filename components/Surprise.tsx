"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import FloatingHearts from "./FloatingHearts";
import Confetti from "./Confetti";
import KineticText from "./KineticText";
import { HeartIcon, ShuffleIcon, SparkleIcon } from "./icons";

type SurpriseProps = {
  eyebrow?: string;
  title?: string;
  lede?: string;
  hugButtonLabel?: string;
  hugMessage: string;
  secretButtonLabel: string;
  secretMessage: string;
  complimentButtonLabel?: string;
  sweetLines: string[];
};

export default function Surprise({
  eyebrow = "One last thing (okay, maybe three)",
  title = "A Tiny Dose of Yogi Appreciation",
  lede = "Because apparently one page of compliments was not enough.",
  hugButtonLabel = "Send Yogi a group hug",
  hugMessage,
  secretButtonLabel,
  secretMessage,
  complimentButtonLabel = "Need another compliment?",
  sweetLines,
}: SurpriseProps) {
  const [hugTrigger, setHugTrigger] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [secretOpen, setSecretOpen] = useState(false);
  const [sweetLine, setSweetLine] = useState("");

  const handleHug = () => {
    setHugTrigger((value) => value + 1);
    setFeedback(hugMessage);
  };

  const handleSecret = () => {
    setSecretOpen(true);
    setConfettiTrigger((value) => value + 1);
  };

  const handleSweetLine = () => {
    if (sweetLines.length === 0) return;
    let next = sweetLines[Math.floor(Math.random() * sweetLines.length)];
    if (sweetLines.length > 1) {
      while (next === sweetLine) {
        next = sweetLines[Math.floor(Math.random() * sweetLines.length)];
      }
    }
    setSweetLine(next);
  };

  return (
    <section className="section section--pink" id="surprise" aria-label={title}>
      <Reveal as="p" className="section__eyebrow">
        {eyebrow}
      </Reveal>
      <h2 className="section__title">
        <KineticText text={title} />
      </h2>
      {lede ? (
        <Reveal as="p" className="section__lede">
          {lede}
        </Reveal>
      ) : null}

      <Reveal as="div" variant="wiggle" delay={100} className="surprise__actions">
        <button type="button" className="btn btn--primary" onClick={handleHug}>
          <HeartIcon size={18} className="icon-heartbeat" />
          {hugButtonLabel}
        </button>

        {!secretOpen ? (
          <button type="button" className="btn btn--ghost" onClick={handleSecret}>
            <SparkleIcon size={18} />
            {secretButtonLabel}
          </button>
        ) : null}

        {sweetLines.length > 0 ? (
          <button type="button" className="btn btn--ghost" onClick={handleSweetLine}>
            <ShuffleIcon size={18} />
            {sweetLine ? "One more" : complimentButtonLabel}
          </button>
        ) : null}
      </Reveal>

      <p className="surprise__feedback" role="status" aria-live="polite">
        {feedback}
      </p>

      {secretOpen ? (
        <Reveal as="div" className="secret" role="status" aria-live="polite">
          {secretMessage}
        </Reveal>
      ) : null}

      {sweetLine ? (
        <Reveal as="div" key={sweetLine} variant="pop" className="secret secret--sweet" role="status" aria-live="polite">
          {sweetLine}
        </Reveal>
      ) : null}

      <FloatingHearts trigger={hugTrigger} />
      <Confetti trigger={confettiTrigger} />
    </section>
  );
}
