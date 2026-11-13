"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BackspaceIcon, LockIcon } from "./icons";
import { getLenis } from "./lenis-singleton";
import Confetti from "./Confetti";
import { playKeyTap, playPinSuccess, playPinWrong } from "./sound-effects";

type PinScreenProps = {
  personalPin?: string;
  publicPin?: string;
  recipientName: string;
  hint?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  onUnlock: (mode: "personal" | "public") => void;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

export default function PinScreen({
  personalPin = "14112007",
  publicPin = "02102005",
  recipientName,
  hint,
  securityQuestion = "What do we call you?",
  securityAnswer = "yogi",
  onUnlock,
}: PinScreenProps) {
  const [step, setStep] = useState<"pin" | "security">("pin");
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Security question state
  const [answerInput, setAnswerInput] = useState("");
  const [answerError, setAnswerError] = useState(false);

  const dotsRef = useRef<HTMLDivElement>(null);
  const securityCardRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const length = 8; // Both 14112007 and 02102005 are 8 digits
  const showHint = Boolean(hint) && wrongAttempts >= 2;

  // Handle PIN entry completion (8 digits)
  useEffect(() => {
    if (step !== "pin" || digits.length !== length || busyRef.current) return;
    busyRef.current = true;

    const entered = digits.join("");

    if (entered === publicPin) {
      // Public code: unlock immediately without extra security question
      playPinSuccess();
      setSuccess(true);
      setConfettiTrigger((value) => value + 1);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (dotsRef.current && !prefersReduced) {
        gsap.fromTo(
          dotsRef.current,
          { scale: 0.85 },
          { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.45)" }
        );
      }
      window.setTimeout(() => onUnlock("public"), 1100);
    } else if (entered === personalPin) {
      // Personal code: transition to the secret security question
      playKeyTap();
      setDigits([]);
      busyRef.current = false;
      setStep("security");
    } else {
      // Incorrect PIN
      playPinWrong();
      setError(true);
      setErrorMessage("That's not quite it, try again.");
      setWrongAttempts((count) => count + 1);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (dotsRef.current && !prefersReduced) {
        gsap.fromTo(
          dotsRef.current,
          { x: -10 },
          { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }
        );
      }
      window.setTimeout(() => {
        setDigits([]);
        setError(false);
        busyRef.current = false;
      }, 650);
    }
  }, [digits, length, onUnlock, personalPin, publicPin, step]);

  const pressKey = (key: string) => {
    if (busyRef.current || success || step !== "pin") return;
    playKeyTap();
    if (key === "back") {
      setDigits((current) => current.slice(0, -1));
      return;
    }
    if (key === "") return;
    setDigits((current) => (current.length < length ? [...current, key] : current));
  };

  const pressKeyRef = useRef(pressKey);
  pressKeyRef.current = pressKey;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (step !== "pin") return;
      if (event.key >= "0" && event.key <= "9") {
        pressKeyRef.current(event.key);
      } else if (event.key === "Backspace") {
        pressKeyRef.current("back");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  // Handle Security Question submission for Personal View
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busyRef.current) return;

    const normalizedEntered = answerInput.trim().toLowerCase();
    const normalizedExpected = securityAnswer.trim().toLowerCase();

    if (normalizedEntered === normalizedExpected) {
      busyRef.current = true;
      playPinSuccess();
      setSuccess(true);
      setConfettiTrigger((value) => value + 1);
      window.setTimeout(() => onUnlock("personal"), 1100);
    } else {
      playPinWrong();
      setAnswerError(true);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (securityCardRef.current && !prefersReduced) {
        gsap.fromTo(
          securityCardRef.current,
          { x: -12 },
          { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }
        );
      }
    }
  };

  return (
    <div className="pin-screen" role="dialog" aria-modal="true" aria-label="Enter code to unlock">
      {step === "pin" ? (
        <>
          <LockIcon size={30} className="pin-screen__lock" />
          <h1 className="pin-screen__title">A little something for {recipientName}</h1>
          <p className="pin-screen__subtitle">Enter the code to unlock it 💛</p>
          {showHint ? <p className="pin-screen__hint">{hint}</p> : null}

          <div
            className={`pin-screen__dots ${error ? "pin-screen__dots--error" : ""} ${
              success ? "pin-screen__dots--success" : ""
            }`}
            ref={dotsRef}
            aria-live="polite"
          >
            {Array.from({ length }).map((_, index) => (
              <span key={index} className={index < digits.length ? "is-filled" : ""} />
            ))}
          </div>

          <p className="pin-screen__error" role="status">
            {error ? errorMessage : success ? "Unlocked! 🎉" : "\u00A0"}
          </p>

          <div className="pin-screen__keypad">
            {KEYS.map((key, index) =>
              key === "" ? (
                <span key={index} aria-hidden="true" />
              ) : (
                <button
                  key={index}
                  type="button"
                  className="pin-screen__key"
                  onClick={() => pressKey(key)}
                  aria-label={key === "back" ? "Delete last digit" : `Digit ${key}`}
                >
                  {key === "back" ? <BackspaceIcon /> : key}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        /* Extra Security Question for Personal Mode */
        <div className="security-card" ref={securityCardRef}>
          <div className="security-card__icon">🤫 🔑</div>
          <h2 className="security-card__title">One Secret Check</h2>
          <p className="security-card__question">{securityQuestion}</p>
          <form onSubmit={handleSecuritySubmit}>
            <input
              type="text"
              autoFocus
              className="security-card__input"
              value={answerInput}
              onChange={(e) => {
                setAnswerInput(e.target.value);
                setAnswerError(false);
              }}
              placeholder="Your answer..."
              aria-label="Security answer"
            />
            <p className="security-card__error" role="status">
              {answerError
                ? "Oops! That's not the secret nickname, try again ❤️"
                : success
                ? "Welcome home, Yogi! 🎉"
                : "\u00A0"}
            </p>
            <div className="security-card__actions">
              <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
                <span>Enter Secret World ✨</span>
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                style={{ width: "100%", fontSize: "0.95rem" }}
                onClick={() => {
                  setStep("pin");
                  setDigits([]);
                  setAnswerInput("");
                  setAnswerError(false);
                  busyRef.current = false;
                }}
              >
                <span>← Back to Code</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <Confetti trigger={confettiTrigger} big />
    </div>
  );
}
