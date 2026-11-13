"use client";

import { useRef, useState } from "react";
import { content } from "@/data/content";
import { getLenis } from "@/components/lenis-singleton";
import StageTransition from "@/components/StageTransition";
import LoadingScreen from "@/components/LoadingScreen";
import PinScreen from "@/components/PinScreen";
import IntroScreen from "@/components/IntroScreen";
import Hero from "@/components/Hero";
import LetterCard from "@/components/LetterCard";
import ReasonsWhy from "@/components/ReasonsWhy";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Appreciation from "@/components/Appreciation";
import MoreMemories from "@/components/MoreMemories";
import Wishes from "@/components/Wishes";
import Surprise from "@/components/Surprise";
import Closing from "@/components/Closing";
import MusicPlayer from "@/components/MusicPlayer";

type Stage = "loading" | "locked" | "intro" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");
  const [showMusicHint, setShowMusicHint] = useState(false);
  const nextAfterLoading = useRef<"locked" | "intro">(content.accessPin ? "locked" : "intro");

  const handleLoadingDone = () => setStage(nextAfterLoading.current);

  const handleUnlock = () => {
    setStage("intro");
  };

  const handleOpened = () => {
    setStage("main");
    setShowMusicHint(true);
  };

  const handleReplay = () => {
    setStage("intro");
    setShowMusicHint(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const ajinkyaLetter = content.letters.find((l) => l.author === "Ajinkya") || content.letters[0];
  const dipikaLetter = content.letters.find((l) => l.author === "Dipika") || content.letters[1];
  const extraLetters = content.letters.filter((l) => l !== ajinkyaLetter && l !== dipikaLetter);

  return (
    <>
      {stage !== "main" ? (
        <StageTransition stageKey={stage}>
          {stage === "loading" ? <LoadingScreen onDone={handleLoadingDone} /> : null}

          {stage === "locked" ? (
            <PinScreen
              pin={content.accessPin}
              recipientName={content.displayName || content.recipientName}
              hint={content.pinHint}
              onUnlock={handleUnlock}
            />
          ) : null}

          {stage === "intro" ? <IntroScreen onOpened={handleOpened} /> : null}
        </StageTransition>
      ) : null}

      <main>
        <Hero
          displayName={content.displayName}
          recipientName={content.recipientName}
          age={content.age}
          birthdayDate={content.birthdayDate}
          eyebrow={content.heroEyebrow}
          supportingLine={content.heroSupportingLine}
          photo={content.heroPhoto}
        />

        {ajinkyaLetter ? <LetterCard letter={ajinkyaLetter} colorClass="section--pink" /> : null}

        <ReasonsWhy
          eyebrow={content.reasonsEyebrow}
          title={content.reasonsTitle}
          lede={content.reasonsLede}
          reasons={content.reasonsWhy}
        />

        {dipikaLetter ? <LetterCard letter={dipikaLetter} colorClass="section--sun" /> : null}

        {extraLetters.map((letter) => (
          <LetterCard key={letter.author} letter={letter} colorClass="section--coral" />
        ))}

        <Gallery
          eyebrow={content.galleryEyebrow}
          title={content.galleryTitle}
          subtitle={content.gallerySubtitle}
          photos={content.galleryPhotos}
        />

        <Timeline
          eyebrow={content.timelineEyebrow}
          title={content.timelineTitle}
          events={content.timeline}
        />

        <Appreciation
          eyebrow={content.appreciationEyebrow}
          title={content.appreciationTitle}
          paragraphs={content.appreciationParagraphs}
        />

        <MoreMemories
          eyebrow={content.memoriesEyebrow}
          title={content.memoriesTitle}
          subtitle={content.memoriesSubtitle}
          items={content.memoryItems}
        />

        <Wishes
          eyebrow={content.wishesEyebrow}
          title={content.wishesTitle}
          intro={content.wishesIntro}
          wishes={content.wishes}
        />

        <Surprise
          eyebrow={content.surpriseEyebrow}
          title={content.surpriseTitle}
          lede={content.surpriseLede}
          hugMessage={content.hugMessage}
          secretButtonLabel={content.secretButtonLabel}
          secretMessage={content.secretMessage}
          sweetLines={content.sweetLines}
        />

        <Closing
          title={content.closingTitle}
          paragraph={content.closingParagraph}
          senders={content.senders}
          replayLabel={content.replayLabel}
          photo={content.closingPhoto}
          onReplay={handleReplay}
        />
      </main>

      <MusicPlayer songUrl={content.songUrl} songTitle={content.songTitle} showHint={showMusicHint} />
    </>
  );
}
