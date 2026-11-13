"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import KineticText from "./KineticText";
import { MusicIcon, PlayIcon, PauseIcon } from "./icons";
import type { AlbumTrack } from "@/data/content";

type SoundtrackRailProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tracks: AlbumTrack[];
};

export default function SoundtrackRail({
  eyebrow = "Our Vibe & Soundtrack",
  title = "Yogi's Album Rail",
  subtitle = "A fan of album sleeves with vinyl tucked inside. Tap any sleeve to slide out the record and play.",
  tracks,
}: SoundtrackRailProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handlePauseRail = () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    };
    window.addEventListener("pause-rail-music", handlePauseRail);
    return () => window.removeEventListener("pause-rail-music", handlePauseRail);
  }, []);

  const handleSelectTrack = (index: number) => {
    const track = tracks[index];
    const audio = audioRef.current;
    if (!audio) return;

    const startSec = track.startTime ?? 20;

    const applyStartTime = () => {
      try {
        if (audio.currentTime < startSec) {
          audio.currentTime = startSec;
        }
      } catch {}
    };

    const playAudio = (source: string) => {
      audio.src = source;
      if (audio.readyState >= 1) {
        applyStartTime();
      } else {
        audio.addEventListener("loadedmetadata", applyStartTime, { once: true });
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          applyStartTime();
        })
        .catch(() => {
          const fallback = track.audioSrc.includes(".mpeg")
            ? encodeURI(track.audioSrc.replace(/\.mpeg$/i, ".mp3"))
            : track.audioSrc.includes("WhatsApp")
            ? `/songs/track${index + 1}.mp3`
            : null;
          if (fallback && fallback !== source) {
            playAudio(fallback);
          } else {
            setIsPlaying(false);
          }
        });
    };

    if (activeIndex === index) {
      // Toggle play/pause for the currently selected track
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (track.audioSrc) {
          window.dispatchEvent(new CustomEvent("pause-bg-music"));
          const targetSrc = encodeURI(track.audioSrc);
          if (!audio.src || !audio.src.includes(encodeURIComponent(track.audioSrc.replace(/^\//, "")))) {
            playAudio(targetSrc);
          } else {
            if (audio.currentTime === 0 || audio.currentTime < startSec) {
              applyStartTime();
            }
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => playAudio(targetSrc));
          }
        }
      }
      return;
    }

    // Switch to a new track and play immediately
    setActiveIndex(index);
    window.dispatchEvent(new CustomEvent("pause-bg-music"));
    audio.pause();
    setIsPlaying(false);

    if (track.audioSrc) {
      playAudio(encodeURI(track.audioSrc));
    }
  };

  const currentTrack = activeIndex !== null ? tracks[activeIndex] : null;

  return (
    <section className="section section--sun" id="album-rail" aria-label={title}>
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

      {/* Hidden audio element for vinyl playback */}
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
        }}
      />

      {/* Album Rail Container */}
      <div className="album-rail-container">
        <div className="album-rail">
          {tracks.map((track, index) => {
            const isActive = activeIndex === index;
            const offset = activeIndex !== null ? index - activeIndex : index;
            const rotation = offset * 5;
            const translationX = offset * 28;

            return (
              <div
                key={track.id}
                className={`album-sleeve-wrap ${isActive ? "is-active" : ""}`}
                style={{
                  transform: `translateX(${translationX}px) rotate(${rotation}deg)`,
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                }}
                onClick={() => handleSelectTrack(index)}
              >
                {/* Vinyl Record tucked inside the sleeve */}
                <div className={`album-vinyl ${isActive ? "is-ejected" : ""} ${isActive && isPlaying ? "is-spinning" : ""}`}>
                  <div className="album-vinyl-grooves" />
                  <div className="album-vinyl-label">
                    <span className="album-vinyl-center-dot" />
                    <span className="album-vinyl-label-text">YOGI</span>
                  </div>
                </div>

                {/* Album Sleeve (Cover) */}
                <div className="album-sleeve">
                  <div className="album-sleeve-art">
                    <Image
                      src={track.coverSrc}
                      alt={track.title}
                      fill
                      sizes="220px"
                      className="album-cover-img"
                    />
                    <div className="album-sleeve-sheen" />
                    <div className="album-sleeve-badge">
                      <MusicIcon size={14} />
                      <span>VOL. {index + 1}</span>
                    </div>
                  </div>

                  <div className="album-sleeve-meta">
                    <h3 className="album-sleeve-title">{track.title}</h3>
                    <p className="album-sleeve-artist">{track.artist}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Playback Controls & Status bar */}
      {currentTrack ? (
        <Reveal as="div" variant="pop" className="album-player-bar">
          <button
            type="button"
            className="btn btn--icon btn--primary album-player-toggle"
            onClick={() => handleSelectTrack(activeIndex ?? 0)}
            aria-label={isPlaying ? "Pause track" : "Play track"}
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <div className="album-player-info">
            <span className="album-player-now-playing">
              {isPlaying ? "NOW SPINNING 🎵" : "SELECT TO PLAY 💿"}
            </span>
            <span className="album-player-track-name">{currentTrack.title}</span>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
