"use client";

import { useState } from "react";
import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import KineticText from "./KineticText";
import type { Photo } from "@/data/content";

type GalleryProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  photos: Photo[];
};

export default function Gallery({
  eyebrow = "Evidence of our collective lack of normal behaviour",
  title = "The Yogi Archives",
  subtitle = "A few frames from all the chaos, smiles, and memories we are lucky to have.",
  photos,
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section section--turquoise" id="gallery" aria-label={title}>
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

      <div className="gallery__grid">
        {photos.map((photo, index) => (
          <Reveal as="div" variant="pop" key={index} delay={index * 80}>
            <button
              type="button"
              className="gallery__item"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open media: ${photo.caption || photo.alt || `Photo ${index + 1}`}`}
            >
              <PhotoFrame photo={photo} />
            </button>
          </Reveal>
        ))}
      </div>

      {activeIndex !== null ? (
        <Lightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </section>
  );
}
