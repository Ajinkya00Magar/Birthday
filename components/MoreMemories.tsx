import Reveal from "./Reveal";
import KineticText from "./KineticText";

type MoreMemoriesProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: string[];
};

export default function MoreMemories({
  eyebrow = "The plan from here",
  title = "More Memories, Please.",
  subtitle = "A few things we are absolutely not done doing together.",
  items,
}: MoreMemoriesProps) {
  return (
    <section className="section section--turquoise" id="memories-plan" aria-label={title}>
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

      <ol className="reunion__list">
        {items.map((item, index) => (
          <Reveal as="li" variant="bounce" key={index} delay={index * 80} className="reunion__item">
            <span className="reunion__index" aria-hidden="true">
              {index + 1}
            </span>
            {item}
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
