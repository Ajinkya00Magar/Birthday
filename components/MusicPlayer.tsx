"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MusicIcon, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

type MusicPlayerProps = {
  songUrl: string;
  songTitle: string;
  /** Set true right when the gift opens, to prompt the visitor to hit play. */
  showHint?: boolean;
  /** Triggered right after visitor clicks "Open your surprise" */
  shouldPlay?: boolean;
};

export default function MusicPlayer({
  songUrl,
  songTitle,
  showHint = false,
  shouldPlay = false,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const userManuallyPausedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [hintVisible, setHintVisible] = useState<boolean>(false);
  const hasSong = Boolean(songUrl);

  // Stop background music whenever any vinyl track starts playing
  useEffect(() => {
    const handleVinylPlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("vinyl-audio-playing", handleVinylPlay);
    return () => window.removeEventListener("vinyl-audio-playing", handleVinylPlay);
  }, [isPlaying]);

  // Start music right after the user clicks "Open your surprise"
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasSong) return;

    if (shouldPlay) {
      if (!userManuallyPausedRef.current) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            window.dispatchEvent(new CustomEvent("bgm-audio-playing"));
          })
          .catch((err) => {
            console.warn("Autoplay deferred or blocked:", err);
          });
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      userManuallyPausedRef.current = false;
    }
  }, [shouldPlay, hasSong]);

  useEffect(() => {
    const handlePauseBg = () => {
      setIsPlaying(false);
      userManuallyPausedRef.current = true;
    };
    window.addEventListener("pause-bg-music", handlePauseBg);
    return () => window.removeEventListener("pause-bg-music", handlePauseBg);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().then(() => {
        window.dispatchEvent(new CustomEvent("bgm-audio-playing"));
      }).catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    setLoadError(false);
  }, [songUrl]);

  useEffect(() => {
    if (!showHint || !hasSong || isPlaying) return;
    setHintVisible(true);
    const timer = window.setTimeout(() => setHintVisible(false), 6000);
    return () => window.clearTimeout(timer);
  }, [showHint, hasSong, isPlaying]);

  useEffect(() => {
    if (!hintVisible || !hintRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.fromTo(
      hintRef.current,
      { opacity: 0, y: 10, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" }
    );
  }, [hintVisible]);

  const dismissHint = () => setHintVisible(false);

  if (!hasSong) {
    return (
      <div className="music-player" aria-label="Music player">
        <span className="music-player__btn btn btn--icon" aria-hidden="true">
          <MusicIcon size={16} />
        </span>
        <span className="music-player__label">No song added yet</span>
      </div>
    );
  }

  return (
    <div className="music-player" aria-label="Background music player">
      {hintVisible && !isPlaying ? (
        <div className="music-player__hint" ref={hintRef} role="status">
          <span className="music-player__hint-text">🎵 Tap to play your birthday song!</span>
        </div>
      ) : null}

      <audio
        ref={audioRef}
        src={songUrl}
        loop
        preload="auto"
        onError={() => {
          setIsPlaying(false);
          setLoadError(true);
        }}
      />

      <button
        type="button"
        className="btn btn--icon music-player__btn"
        onClick={() => {
          if (isPlaying) {
            userManuallyPausedRef.current = true;
            setIsPlaying(false);
          } else {
            window.dispatchEvent(new CustomEvent("pause-rail-music"));
            userManuallyPausedRef.current = false;
            setIsPlaying(true);
          }
          dismissHint();
        }}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        data-tooltip={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        type="button"
        className="btn btn--icon music-player__btn"
        onClick={() => {
          setIsMuted((value) => !value);
          dismissHint();
        }}
        aria-pressed={isMuted}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        data-tooltip={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </button>

      {loadError ? (
        <span className="music-player__label music-player__label--error">
          Can't play this audio file. Please check that the file is available in public/songs.
        </span>
      ) : (
        <span className="music-player__label">{songTitle}</span>
      )}
    </div>
  );
}
