"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import KineticText from "./KineticText";
import Confetti from "./Confetti";
import { SparkleIcon } from "./icons";
import { playCandleBlow } from "./sound-effects";

type BirthdayCakeProps = {
  recipientName?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function BirthdayCake({
  recipientName = "Yogi",
  eyebrow = "A Birthday Tradition",
  title = "Make a Wish & Blow the Candle! 🎂",
  subtitle = "Close your eyes, make a silent wish from your heart, and tap the candle or press the button below to blow it out.",
}: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);

  const blowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    playCandleBlow();
    setConfettiTrigger((prev) => prev + 1);
  };

  const relightCandle = () => {
    setIsBlown(false);
  };

  return (
    <section
      className="birthday-cake-section"
      id="birthday-cake"
      aria-label={title}
    >
      <div className="birthday-cake-container">
        <Reveal as="p" className="section__eyebrow">
          {eyebrow}
        </Reveal>
        <h2 className="section__title">
          <KineticText text={title} />
        </h2>
        {subtitle ? (
          <Reveal as="p" className="section__lede">
            {subtitle}
          </Reveal>
        ) : null}

        <div className="cake-stage">
          {/* Cake Illustration Wrapper */}
          <div className="cake-wrapper">
            
            {/* Exactly ONE Big Center Candle */}
            <div className="center-candle-container">
              <button
                type="button"
                className={`big-candle-btn ${isBlown ? "is-blown" : "is-lit"}`}
                onClick={isBlown ? relightCandle : blowCandle}
                aria-label={
                  isBlown
                    ? "Candle is extinguished. Tap to relight."
                    : "Candle is burning bright. Tap to make a wish and blow out!"
                }
                title={
                  isBlown
                    ? "Tap to relight the candle! 🕯️"
                    : "Tap to blow out the candle! 🌬️"
                }
              >
                {/* Flame or Smoke */}
                <div className="flame-holder">
                  {!isBlown ? (
                    <div className="candle-flame">
                      <div className="candle-flame-inner" />
                    </div>
                  ) : (
                    <span className="smoke-puff" role="img" aria-hidden="true">
                      💨
                    </span>
                  )}
                </div>

                {/* Wick */}
                <div className="candle-wick" />

                {/* Candle Body */}
                <div className="big-candle-stick" />
              </button>
            </div>

            {/* Tier 1 (Top Layer) */}
            <div className="cake-tier-top">
              {/* White Cream Drips */}
              <div className="frosting-drips-top">
                <span className="drip drip--1" />
                <span className="drip drip--2" />
                <span className="drip drip--3" />
                <span className="drip drip--4" />
                <span className="drip drip--5" />
              </div>

              {/* Strawberries and sprinkles flanking candle */}
              <span className="strawberry strawberry--left">🍓</span>
              <div className="tier-sprinkles-center">
                <span className="dot dot--pink" />
                <span className="dot dot--yellow" />
                <span className="dot dot--teal" />
              </div>
              <span className="strawberry strawberry--right">🍓</span>
            </div>

            {/* Tier 2 (Bottom Layer) */}
            <div className="cake-tier-bottom">
              {/* White Frosting Swags */}
              <div className="frosting-drips-bottom">
                <span className="drip drip--b1" />
                <span className="drip drip--b2" />
                <span className="drip drip--b3" />
                <span className="drip drip--b4" />
                <span className="drip drip--b5" />
                <span className="drip drip--b6" />
              </div>

              {/* Sprinkles on Bottom Tier */}
              <div className="cake-sprinkles-wrap">
                <span className="dot dot--pink" />
                <span className="pill pill--teal" />
                <span className="dot dot--yellow" />
                <span className="pill pill--purple" />
                <span className="dot dot--blue" />
                <span className="pill pill--coral" />
              </div>

              {/* Bottom tier sticker banner */}
              <div className="cake-badge">
                ❤️ Happy Birthday {recipientName} ❤️
              </div>
            </div>

            {/* Cake Stand / Plate */}
            <div className="cake-stand" />
            <div className="cake-pedestal" />
          </div>

          {/* Action Controls */}
          <Reveal as="div" variant="wiggle" delay={150} className="cake-actions">
            {!isBlown ? (
              <button
                type="button"
                className="btn btn--primary cake-blow-btn"
                onClick={blowCandle}
              >
                <span className="btn-icon">🌬️</span>
                <span>Make a Wish & Blow the Candle</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--ghost cake-relight-btn"
                onClick={relightCandle}
              >
                <span className="btn-icon">🕯️</span>
                <span>Relight the Candle</span>
              </button>
            )}

            {!isBlown ? (
              <p className="cake-hint-text">
                Tap the candle directly or hit the button to blow it out! ✨
              </p>
            ) : null}
          </Reveal>

          {/* Wish Granted Celebration Card */}
          {isBlown ? (
            <Reveal as="div" variant="pop" className="wish-granted-card">
              <div className="wish-card-icons">🎉 🎂 ✨</div>
              <h3 className="wish-card-title">WISH GRANTED!</h3>
              <p className="wish-card-message">
                May every silent prayer, crazy dream, and sweet wish you made today come true, Yogi. You deserve all the joy, peace, and beautiful moments life has to offer.
              </p>
              <div className="wish-card-love">
                <SparkleIcon size={18} />
                <span>With all our love — Ajinkya, Rutvik, Dipika, Pranav & Omkar ❤️🫂</span>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>

      <Confetti trigger={confettiTrigger} big />
    </section>
  );
}
