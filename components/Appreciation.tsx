import Reveal from "./Reveal";
import KineticText from "./KineticText";

type AppreciationProps = {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
};

export default function Appreciation({
  eyebrow = "What you bring into a room",
  title = "A Little More About You",
  paragraphs,
}: AppreciationProps) {
  return (
    <section className="section section--pink" id="appreciation" aria-label={title}>
      <Reveal as="p" className="section__eyebrow">
        {eyebrow}
      </Reveal>
      <h2 className="section__title">
        <KineticText text={title} />
      </h2>

      <div className="distance">
        {paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 120} className="distance__paragraph">
            {paragraph}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
