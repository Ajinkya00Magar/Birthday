import PhotoFrame from "./PhotoFrame";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";
import KineticText from "./KineticText";
import type { Photo } from "@/data/content";

type HeroProps = {
  displayName: string;
  recipientName: string;
  age?: string;
  birthdayDate?: string;
  eyebrow: string;
  supportingLine: string;
  photo: Photo;
};

export default function Hero({
  displayName,
  recipientName,
  age,
  birthdayDate,
  eyebrow,
  supportingLine,
  photo,
}: HeroProps) {
  return (
    <section className="hero" id="hero" aria-label="Birthday welcome">
      <Reveal as="div" variant="pop" className="hero__frame">
        <PhotoFrame
          photo={photo}
          priority
          sizes="(min-width: 640px) 320px, 80vw"
          showCaption={false}
        />
      </Reveal>

      <div className="hero__name-wrap">
        <Sparkle className="hero__sparkle" />
        <Reveal as="p" delay={80} className="hero__eyebrow">
          {eyebrow}
        </Reveal>
        <h1 className="hero__name">
          <KineticText text={`Our ${displayName}.`} delay={200} />
        </h1>
      </div>

      {(age || birthdayDate) ? (
        <Reveal delay={220} variant="wiggle" className="hero__meta" as="div">
          {age ? <span>🎂 {age} years old</span> : null}
          {birthdayDate ? <span>📅 {birthdayDate}</span> : null}
        </Reveal>
      ) : null}

      <Reveal delay={320}>
        <p className="hero__message">{supportingLine}</p>
      </Reveal>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
        <span>Scroll to continue the story</span>
      </div>
    </section>
  );
}
