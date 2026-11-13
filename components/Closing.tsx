import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import Sparkle from "./Sparkle";
import KineticText from "./KineticText";
import { ReplayIcon } from "./icons";
import type { Photo } from "@/data/content";

type ClosingProps = {
  title?: string;
  paragraph?: string;
  senders?: string[];
  footerText?: string;
  replayLabel?: string;
  photo: Photo;
  onReplay: () => void;
  onLock?: () => void;
  lockLabel?: string;
};

export default function Closing({
  title = "Happy Birthday, Our Yogi.",
  paragraph = "Thank you for being exactly who you are — the energy, the kindness, the logic, the humour, the hard work and the little things that make you Yogi. We hope this year gives back even a fraction of the happiness you bring to the people around you.",
  senders = ["Ajinkya", "Rutvik", "Dipika", "Pranav", "Omkar"],
  footerText = "Made with love, memories, and a suspicious amount of teamwork.",
  replayLabel = "Watch our little surprise again",
  photo,
  onReplay,
  onLock,
  lockLabel = "Lock / Switch View",
}: ClosingProps) {
  return (
    <section className="section closing" id="closing" aria-label="Closing">
      <div className="closing__title-wrap">
        <Sparkle className="closing__sparkle" />
        <h2 className="closing__title">
          <KineticText text={title} />
        </h2>
      </div>
      <Reveal as="p" delay={100} className="closing__thanks">
        {paragraph}
      </Reveal>

      <Reveal as="div" variant="pop" delay={200} className="closing__frame">
        <PhotoFrame photo={photo} showCaption={false} sizes="320px" />
      </Reveal>

      <Reveal as="div" delay={260} className="closing__signoff">
        <p className="closing__signoff-label">With a whole lot of love,</p>
        <p className="closing__signoff-names">{senders.join(" • ")}</p>
      </Reveal>

      <Reveal as="div" delay={320} className="closing__actions">
        <button type="button" className="btn btn--ghost closing__replay" onClick={onReplay}>
          <ReplayIcon />
          {replayLabel}
        </button>
        {onLock ? (
          <button type="button" className="btn btn--ghost closing__replay" onClick={onLock}>
            <span>🔒</span>
            <span>{lockLabel}</span>
          </button>
        ) : null}
      </Reveal>

      <footer className="footer">{footerText}</footer>
    </section>
  );
}
