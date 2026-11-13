import Reveal from "./Reveal";
import KineticText from "./KineticText";

type WishesProps = {
  eyebrow?: string;
  title?: string;
  intro: string;
  wishes: string[];
};

export default function Wishes({
  eyebrow = "For you, Yogi",
  title = "All the Good Things, Always.",
  intro,
  wishes,
}: WishesProps) {
  return (
    <section className="section section--coral" id="wishes" aria-label={title}>
      <Reveal as="p" className="section__eyebrow">
        {eyebrow}
      </Reveal>
      <h2 className="section__title">
        <KineticText text={title} />
      </h2>
      <Reveal as="p" className="wishes__intro">
        {intro}
      </Reveal>

      <ul className="wishes__grid">
        {wishes.map((wish, index) => (
          <Reveal as="li" variant="wiggle" key={index} delay={index * 90} className="wishes__card">
            {wish}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
