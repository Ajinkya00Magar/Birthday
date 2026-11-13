import Reveal from "./Reveal";
import type { Letter } from "@/data/content";

type LetterCardProps = {
  letter: Letter;
  colorClass?: string;
};

export default function LetterCard({ letter, colorClass = "section--pink" }: LetterCardProps) {
  return (
    <section
      className={`section ${colorClass}`}
      id={`letter-${letter.author.toLowerCase()}`}
      aria-label={`Letter from ${letter.author}`}
    >
      <Reveal as="p" className="section__eyebrow">
        {letter.eyebrow}
      </Reveal>

      <Reveal as="div" className="letter">
        <h2 className="letter__heading">{letter.heading}</h2>

        {letter.paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 100} className="letter__paragraph">
            {paragraph}
          </Reveal>
        ))}

        <p className="letter__signature">{letter.closing}</p>
      </Reveal>
    </section>
  );
}

