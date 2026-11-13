import Reveal from "./Reveal";

type LoveLetterProps = {
  recipientName: string;
  senderName: string;
  paragraphs: string[];
};

export default function LoveLetter({ recipientName, senderName, paragraphs }: LoveLetterProps) {
  return (
    <section className="section section--pink" id="letter" aria-label={`Letter for ${recipientName}`}>
      <Reveal as="p" className="section__eyebrow">
        A little letter
      </Reveal>

      <Reveal as="div" className="letter">
        <p className="letter__to">To {recipientName},</p>

        {paragraphs.map((paragraph, index) => (
          <Reveal as="p" key={index} delay={index * 120} className="letter__paragraph">
            {paragraph}
          </Reveal>
        ))}

        <p className="letter__signature">With lots of love, {senderName}</p>
      </Reveal>
    </section>
  );
}
