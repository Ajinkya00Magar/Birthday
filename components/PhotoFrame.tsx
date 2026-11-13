"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CameraIcon } from "./icons";
import type { Photo } from "@/data/content";

type PhotoFrameProps = {
  photo: Photo;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
  sizes?: string;
};

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".ogg",
  ".ogv",
  ".mov",
  ".m4v",
  ".mkv",
  ".avi",
  ".3gp",
  ".wmv",
  ".flv",
];

const CANDIDATE_EXTENSIONS = [
  ".png",
  ".jpeg",
  ".jpg",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
  ".bmp",
  ".ico",
  ".mp4",
  ".mov",
  ".webm",
  ".m4v",
];

function isVideoSrc(src: string) {
  const clean = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}

export default function PhotoFrame({
  photo,
  className = "",
  priority = false,
  showCaption = true,
  sizes = "(min-width: 640px) 33vw, 45vw",
}: PhotoFrameProps) {
  const [currentSrc, setCurrentSrc] = useState(photo.src);
  const [errored, setErrored] = useState(!photo.src);
  const fallbackIndexRef = useRef(-1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync state whenever photo.src prop changes (e.g. lightbox navigation)
  useEffect(() => {
    setCurrentSrc(photo.src);
    setErrored(!photo.src);
    fallbackIndexRef.current = -1;
  }, [photo.src]);

  const hasPhoto = Boolean(currentSrc) && !errored;
  const isVideo = hasPhoto && isVideoSrc(currentSrc);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      videoRef.current.pause();
    }
  }, [isVideo, currentSrc]);

  const handleError = () => {
    if (
      !photo.src ||
      photo.src.startsWith("http://") ||
      photo.src.startsWith("https://") ||
      photo.src.startsWith("data:")
    ) {
      setErrored(true);
      return;
    }

    const rawClean = photo.src.split("?")[0];
    const dotIndex = rawClean.lastIndexOf(".");
    const slashIndex = rawClean.lastIndexOf("/");
    const basePath = dotIndex > slashIndex ? rawClean.slice(0, dotIndex) : rawClean;
    const currentExt = dotIndex > slashIndex ? rawClean.slice(dotIndex).toLowerCase() : "";

    const candidates = CANDIDATE_EXTENSIONS.filter((ext) => ext !== currentExt);
    const nextIdx = fallbackIndexRef.current + 1;

    if (nextIdx < candidates.length) {
      fallbackIndexRef.current = nextIdx;
      setCurrentSrc(`${basePath}${candidates[nextIdx]}`);
    } else {
      setErrored(true);
    }
  };

  return (
    <div className={`frame ${hasPhoto ? "" : "frame--empty"} ${className}`}>
      <span className="frame__tape" aria-hidden="true" />
      <div className="frame__window">
        {hasPhoto ? (
          isVideo ? (
            <video
              ref={videoRef}
              className="frame__video"
              src={currentSrc}
              aria-label={photo.alt}
              autoPlay
              loop
              muted
              playsInline
              onError={handleError}
            />
          ) : (
            <Image
              src={currentSrc}
              alt={photo.alt}
              fill
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="frame__img"
              onError={handleError}
            />
          )
        ) : (
          <>
            <CameraIcon className="frame__empty-icon" />
            <p>No photo yet, add one to public/photos</p>
          </>
        )}
      </div>
      {showCaption && photo.caption ? <p className="frame__caption">{photo.caption}</p> : null}
    </div>
  );
}
