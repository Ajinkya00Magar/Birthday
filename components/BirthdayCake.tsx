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

const CANDLES = [
  { id: 0, color: "#ff6b8b", friend: "Ajinkya", stripe: "#ffe3eb" },
  { id: 1, color: "#ffb347", friend: "Rutvik", stripe: "#fff2d9" },
  { id: 2, color: "#ff477e", friend: "Dipika", stripe: "#ffd6e0" },
  { id: 3, color: "#2ec4b6", friend: "Pranav", stripe: "#cbf3f0" },
  { id: 4, color: "#845ec2", friend: "Omkar", stripe: "#e8dcff" },
];

export default function BirthdayCake({
  recipientName = "Yogi",
  eyebrow = "A Birthday Tradition",
  title = "Make a Wish & Blow the Candles! 🎂",
  subtitle = "Close your eyes, make a silent wish from your heart, and tap each candle or hit the button below to blow them out.",
}: BirthdayCakeProps) {
  const [blown, setBlown] = useState<boolean[]>([false, false, false, false, false]);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const allBlown = blown.every(Boolean);

  const blowSingleCandle = (index: number) => {
    if (blown[index]) return;
    const next = [...blown];
    next[index] = true;
    setBlown(next);

    if (next.every(Boolean)) {
      playCandleBlow();
      setConfettiTrigger((prev) => prev + 1);
    }
  };

  const blowAllCandles = () => {
    setBlown([true, true, true, true, true]);
    playCandleBlow();
    setConfettiTrigger((prev) => prev + 1);
  };

  const relightCandles = () => {
    setBlown([false, false, false, false, false]);
  };

  return (
    <section className="section section--pink birthday-cake-section" id="birthday-cake" aria-label={title}>
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

      <div className="cake-stage mt-8 flex flex-col items-center">
        {/* The Cake Illustration */}
        <div className="cake-wrapper">
          {/* Candle cluster on top of cake */}
          <div className="candles-cluster flex items-end justify-center gap-4 sm:gap-6 mb-[-6px] z-10 relative">
            {CANDLES.map((candle, idx) => {
              const isExtinguished = blown[idx];
              return (
                <button
                  key={candle.id}
                  type="button"
                  className={`candle-unit flex flex-col items-center cursor-pointer transition-transform hover:scale-110 focus:outline-none ${
                    isExtinguished ? "is-blown" : "is-lit"
                  }`}
                  onClick={() => blowSingleCandle(idx)}
                  aria-label={`Candle from ${candle.friend} - ${isExtinguished ? "Blown out" : "Lit. Tap to blow."}`}
                  title={`${candle.friend}'s candle: ${isExtinguished ? "Blown out ✨" : "Tap to blow out!"}`}
                >
                  {/* Flame or smoke puff */}
                  <div className="flame-holder h-8 flex items-center justify-center">
                    {!isExtinguished ? (
                      <div className="candle-flame">
                        <div className="candle-flame-inner" />
                      </div>
                    ) : (
                      <span className="smoke-puff animate-fade-out" role="img" aria-hidden="true">
                        💨
                      </span>
                    )}
                  </div>

                  {/* Candle Wick */}
                  <div className="candle-wick w-[2px] h-[5px] bg-[#333]" />

                  {/* Candle Stick */}
                  <div
                    className="candle-stick w-3.5 sm:w-4 h-14 sm:h-16 rounded-t-sm shadow-sm border border-black/20"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${candle.color}, ${candle.color} 5px, ${candle.stripe} 5px, ${candle.stripe} 10px)`,
                    }}
                  />

                  {/* Friend Name Tag */}
                  <span className="candle-friend-tag text-[10px] font-bold text-ink mt-1 tracking-tight select-none">
                    {candle.friend}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tier 1 (Top Layer) */}
          <div className="cake-tier-top relative w-56 sm:w-72 h-20 sm:h-24 mx-auto rounded-t-2xl border-4 border-[var(--color-ink)] shadow-md overflow-hidden bg-gradient-to-b from-[#fff6e0] to-[#fde2b4]">
            {/* Frosting Drips */}
            <div className="frosting-drips-top absolute top-0 inset-x-0 h-7 flex justify-around">
              <span className="w-6 h-6 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-8 h-8 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-5 h-5 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-7 h-7 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-6 h-6 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-7 h-7 bg-[#ff6b8b] rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
            </div>

            {/* Decorative Stars / Sprinkles */}
            <div className="absolute inset-0 flex items-center justify-around px-4 pointer-events-none opacity-80">
              <span className="text-xs">⭐</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🍓</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">⭐</span>
            </div>

            {/* Inscription on Top Tier */}
            <div className="absolute bottom-2 inset-x-0 text-center font-display font-extrabold text-sm sm:text-base tracking-wider text-[var(--color-ink)] drop-shadow-sm select-none">
              HAPPY BIRTHDAY {recipientName.toUpperCase()}
            </div>
          </div>

          {/* Tier 2 (Bottom Layer) */}
          <div className="cake-tier-bottom relative w-72 sm:w-96 h-24 sm:h-28 mx-auto rounded-t-xl border-4 border-t-0 border-[var(--color-ink)] shadow-lg overflow-hidden bg-gradient-to-b from-[#ffd3b6] to-[#ffaaa5]">
            {/* White Cream Swags */}
            <div className="frosting-drips-bottom absolute top-0 inset-x-0 h-6 flex justify-around">
              <span className="w-10 h-7 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-8 h-5 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-12 h-8 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-9 h-6 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-11 h-7 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
              <span className="w-8 h-5 bg-white rounded-b-full border-b-2 border-x-2 border-[var(--color-ink)]" />
            </div>

            {/* Colorful Sprinkles on Bottom Tier */}
            <div className="cake-sprinkles absolute inset-0 flex items-center justify-around px-6 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#ff477e]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#2ec4b6] rotate-45" />
              <span className="w-2 h-2 rounded-full bg-[#ffb347]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#845ec2] -rotate-12" />
              <span className="w-2 h-2 rounded-full bg-[#3a86ff]" />
              <span className="w-3 h-1.5 rounded-sm bg-[#ff6b8b] rotate-30" />
              <span className="w-2 h-2 rounded-full bg-[#ffea00]" />
            </div>

            {/* Bottom tier accent heart */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center items-center gap-2 font-hand text-base font-bold text-ink/80 select-none">
              <span>❤️</span>
              <span>Our Favourite Human</span>
              <span>❤️</span>
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="cake-stand relative w-80 sm:w-[420px] h-6 sm:h-7 mx-auto bg-gradient-to-r from-[#e0e0e0] via-[#ffffff] to-[#e0e0e0] rounded-full border-4 border-[var(--color-ink)] shadow-sticker -mt-1" />
          <div className="cake-stand-pedestal w-28 sm:w-36 h-4 mx-auto bg-white border-4 border-t-0 border-[var(--color-ink)] rounded-b-xl shadow-sm" />
        </div>

        {/* Action Controls */}
        <Reveal as="div" variant="wiggle" delay={150} className="mt-8 flex flex-wrap justify-center gap-4">
          {!allBlown ? (
            <button
              type="button"
              className="btn btn--primary text-base font-bold px-6 py-3 shadow-sticker cursor-pointer"
              onClick={blowAllCandles}
            >
              <span className="text-xl">🌬️</span>
              <span>Blow Out All Candles</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--ghost text-base font-bold px-6 py-3 border-2 border-[var(--color-ink)] cursor-pointer"
              onClick={relightCandles}
            >
              <span>🕯️</span>
              <span>Relight the Candles</span>
            </button>
          )}
        </Reveal>

        {/* Wish Granted Celebration Card */}
        {allBlown ? (
          <Reveal as="div" variant="pop" className="wish-granted-card mt-8 max-w-lg mx-auto text-center p-6 rounded-2xl border-4 border-[var(--color-ink)] bg-[var(--color-paper)] shadow-sticker">
            <div className="text-3xl mb-2">🎉 🎂 ✨</div>
            <h3 className="font-display font-extrabold text-2xl text-[var(--color-ink)] mb-2">
              WISH GRANTED!
            </h3>
            <p className="font-sans text-base text-[var(--color-ink)] leading-relaxed mb-3">
              May every silent prayer, crazy dream, and wonderful adventure you wished for today find its way to you, Yogi. You deserve all the good things in the world.
            </p>
            <div className="flex items-center justify-center gap-1.5 font-hand font-bold text-lg text-[var(--color-coral-text)]">
              <SparkleIcon size={18} />
              <span>With all our love, Ajinkya, Rutvik, Dipika, Pranav & Omkar ❤️🫂</span>
            </div>
          </Reveal>
        ) : (
          <p className="cake-hint font-hand text-lg text-[var(--color-ink-soft)] mt-4 font-semibold text-center">
            {blown.some(Boolean)
              ? `You've blown ${blown.filter(Boolean).length} of 5 candles! Keep going 💨`
              : "Tap each candle or blow them all at once! 🕯️"}
          </p>
        )}
      </div>

      <Confetti trigger={confettiTrigger} big />
    </section>
  );
}
