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
      className="section section--pink birthday-cake-section"
      id="birthday-cake"
      aria-label={title}
    >
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

      <div className="cake-stage max-w-lg mx-auto mt-8 flex flex-col items-center">
        {/* The Birthday Cake Stage */}
        <div className="cake-wrapper relative flex flex-col items-center select-none pt-4">
          
          {/* Exactly ONE Big Candle in the Center */}
          <div className="center-candle-container flex flex-col items-center mb-[-4px] z-20 relative">
            <button
              type="button"
              className={`big-candle-btn group flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none ${
                isBlown ? "is-blown" : "is-lit"
              }`}
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
              {/* Flame or Smoke Puff */}
              <div className="flame-holder h-10 flex items-center justify-center relative">
                {!isBlown ? (
                  <div className="candle-flame">
                    <div className="candle-flame-inner" />
                  </div>
                ) : (
                  <span
                    className="smoke-puff text-2xl animate-fade-out"
                    role="img"
                    aria-hidden="true"
                  >
                    💨
                  </span>
                )}
              </div>

              {/* Wick */}
              <div className="w-[3px] h-[10px] bg-[var(--color-ink)] rounded-full -mt-1 z-10" />

              {/* Candle Body */}
              <div className="big-candle-stick" />
            </button>
          </div>

          {/* Tier 1 (Top Layer) */}
          <div className="cake-tier-top relative w-[210px] sm:w-[260px] h-20 sm:h-24 mx-auto rounded-t-2xl border-4 border-[var(--color-ink)] bg-gradient-to-b from-[#ffe5ec] to-[#ffb3c1] shadow-md overflow-hidden z-10">
            {/* White Cream Drips */}
            <div className="frosting-drips-top absolute top-0 inset-x-0 h-6 flex justify-around pointer-events-none">
              <span className="w-8 h-6 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-7 h-4 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-9 h-7 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-7 h-5 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-8 h-6 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
            </div>

            {/* Top Tier Strawberries & Sprinkles */}
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
              <span className="text-xl sm:text-2xl transform -rotate-12 select-none">🍓</span>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff477e]" />
                <span className="w-2 h-2 rounded-full bg-[#ffb347]" />
              </div>
              <span className="text-xl sm:text-2xl transform rotate-12 select-none">🍓</span>
            </div>
          </div>

          {/* Tier 2 (Bottom Layer) */}
          <div className="cake-tier-bottom relative w-[280px] sm:w-[350px] h-24 sm:h-28 mx-auto rounded-t-2xl border-4 border-t-0 border-[var(--color-ink)] bg-gradient-to-b from-[#ffd3b6] to-[#ffaaa5] shadow-lg overflow-hidden z-0">
            {/* White Frosting Swags */}
            <div className="frosting-drips-bottom absolute top-0 inset-x-0 h-7 flex justify-around pointer-events-none">
              <span className="w-9 h-7 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-8 h-5 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-11 h-8 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-8 h-5 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-10 h-7 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
              <span className="w-7 h-4 bg-white rounded-b-full border-b-[3px] border-x-[3px] border-[var(--color-ink)]" />
            </div>

            {/* Sprinkles on Bottom Tier */}
            <div className="cake-sprinkles absolute inset-0 flex items-center justify-around px-5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#ff477e]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#2ec4b6] rotate-45" />
              <span className="w-2 h-2 rounded-full bg-[#ffb347]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#845ec2] -rotate-12" />
              <span className="w-2 h-2 rounded-full bg-[#3a86ff]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#ff6b8b] rotate-30" />
            </div>

            {/* Bottom tier sticker banner */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center items-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 border-2 border-[var(--color-ink)] rounded-full text-xs sm:text-sm font-hand font-bold text-[var(--color-ink)] shadow-sm select-none">
                ❤️ Happy Birthday {recipientName} ❤️
              </span>
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="cake-stand relative w-[310px] sm:w-[390px] h-6 mx-auto bg-gradient-to-r from-[#f0f0f0] via-[#ffffff] to-[#f0f0f0] rounded-full border-4 border-[var(--color-ink)] shadow-sticker -mt-1 z-10" />
          <div className="cake-stand-pedestal w-28 sm:w-36 h-4 mx-auto bg-white border-4 border-t-0 border-[var(--color-ink)] rounded-b-xl shadow-sm" />
        </div>

        {/* Action Controls */}
        <Reveal as="div" variant="wiggle" delay={150} className="mt-8 flex flex-col items-center gap-3">
          {!isBlown ? (
            <button
              type="button"
              className="btn btn--primary text-base sm:text-lg font-bold px-7 py-3.5 shadow-sticker cursor-pointer inline-flex items-center gap-2"
              onClick={blowCandle}
            >
              <span className="text-xl">🌬️</span>
              <span>Make a Wish & Blow the Candle</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--ghost text-base sm:text-lg font-bold px-7 py-3.5 border-2 border-[var(--color-ink)] bg-white cursor-pointer inline-flex items-center gap-2 shadow-sticker"
              onClick={relightCandle}
            >
              <span className="text-xl">🕯️</span>
              <span>Relight the Candle</span>
            </button>
          )}

          {!isBlown ? (
            <p className="font-hand text-base sm:text-lg text-[var(--color-ink-soft)] font-semibold text-center mt-1">
              Tap the candle directly or hit the button to blow it out! ✨
            </p>
          ) : null}
        </Reveal>

        {/* Wish Granted Celebration Card */}
        {isBlown ? (
          <Reveal
            as="div"
            variant="pop"
            className="wish-granted-card mt-8 max-w-lg w-full mx-auto text-center p-6 sm:p-8 rounded-2xl border-4 border-[var(--color-ink)] bg-[var(--color-paper)] shadow-sticker"
          >
            <div className="text-4xl mb-3">🎉 🎂 ✨</div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--color-ink)] mb-2">
              WISH GRANTED!
            </h3>
            <p className="font-sans text-base text-[var(--color-ink)] leading-relaxed mb-4">
              May every silent prayer, crazy dream, and sweet wish you made today come true, Yogi. You deserve all the joy, peace, and beautiful moments life has to offer.
            </p>
            <div className="flex items-center justify-center gap-2 font-hand font-bold text-lg text-[var(--color-coral-text)]">
              <SparkleIcon size={18} />
              <span>With all our love — Ajinkya, Rutvik, Dipika, Pranav & Omkar ❤️🫂</span>
            </div>
          </Reveal>
        ) : null}
      </div>

      <Confetti trigger={confettiTrigger} big />
    </section>
  );
}
