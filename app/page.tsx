"use client";

import { useEffect, useRef, useState } from "react";
import { content, publicContent } from "@/data/content";
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
import SoundtrackRail from "@/components/SoundtrackRail";
import Wishes from "@/components/Wishes";
import BirthdayCake from "@/components/BirthdayCake";
import Surprise from "@/components/Surprise";
import Closing from "@/components/Closing";
import MusicPlayer from "@/components/MusicPlayer";

type Stage = "loading" | "locked" | "intro" | "main";
type AuthMode = "personal" | "public";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");
  const [authMode, setAuthMode] = useState<AuthMode>("personal");
  const [showMusicHint, setShowMusicHint] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  // Ensure the website starts fresh at the code input screen
  useEffect(() => {
    try {
      localStorage.removeItem("birthday_auth_mode");
    } catch {
      // localStorage may fail in restricted environments
    }
  }, []);

  const handleLoadingDone = () => {
    setStage("locked");
  };

  const handleUnlock = (mode: "personal" | "public") => {
    setAuthMode(mode);
    try {
      localStorage.setItem("birthday_auth_mode", mode);
    } catch {}
    setStage("intro");
  };

  const handleLock = () => {
    try {
      localStorage.removeItem("birthday_auth_mode");
    } catch {}
    setStage("locked");
    setShouldPlayMusic(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleOpenStart = () => {
    setShouldPlayMusic(true);
  };

  const handleOpened = () => {
    setStage("main");
    setShowMusicHint(true);
    setShouldPlayMusic(true);
  };

  const handleReplay = () => {
    setStage("intro");
    setShowMusicHint(false);
    setShouldPlayMusic(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const isPublic = authMode === "public";
  const activeContent = isPublic ? publicContent : content;

  return (
    <>
      {stage !== "main" ? (
        <StageTransition stageKey={stage}>
          {stage === "loading" ? (
            <LoadingScreen onDone={handleLoadingDone} />
          ) : null}

          {stage === "locked" ? (
            <PinScreen
              personalPin={content.personalPin || "14112007"}
              publicPin={content.publicPin || "02102005"}
              recipientName="Yogeshwari"
              hint={content.pinHint}
              securityQuestion={content.securityQuestion || "What do we call you?"}
              securityAnswer={content.securityAnswer || "yogi"}
              onUnlock={handleUnlock}
            />
          ) : null}

          {stage === "intro" ? (
            <IntroScreen
              title={activeContent.introTitle}
              subtitle={activeContent.introSubtitle}
              onOpened={handleOpened}
              onOpenStart={handleOpenStart}
            />
          ) : null}
        </StageTransition>
      ) : null}

      <main>
        {/* Hero Section */}
        <Hero
          displayName={activeContent.displayName}
          recipientName={activeContent.recipientName}
          age={activeContent.age}
          birthdayDate={activeContent.birthdayDate}
          eyebrow={activeContent.heroEyebrow}
          supportingLine={activeContent.heroSupportingLine}
          photo={activeContent.heroPhoto}
        />

        {/* Letters / Tributes Section */}
        {activeContent.letters.map((letter, idx) => {
          const colorClass =
            idx === 0
              ? "section--pink"
              : idx === 1
              ? "section--coral"
              : idx % 2 === 0
              ? "section--sun"
              : "section--turquoise";

          return (
            <LetterCard
              key={letter.author + idx}
              letter={letter}
              colorClass={colorClass}
            />
          );
        })}

        {/* Sections for Personal View only */}
        {!isPublic ? (
          <>
            {/* Reasons Why Section */}
            <ReasonsWhy
              eyebrow={activeContent.reasonsEyebrow}
              title={activeContent.reasonsTitle}
              lede={activeContent.reasonsLede}
              reasons={activeContent.reasonsWhy}
            />

            {/* Gallery Section */}
            <Gallery
              eyebrow={activeContent.galleryEyebrow}
              title={activeContent.galleryTitle}
              subtitle={activeContent.gallerySubtitle}
              photos={activeContent.galleryPhotos}
            />

            {/* Timeline / Milestones Section */}
            {activeContent.timeline && activeContent.timeline.length > 0 ? (
              <Timeline
                eyebrow={activeContent.timelineEyebrow}
                title={activeContent.timelineTitle}
                events={activeContent.timeline}
              />
            ) : null}

            {/* Appreciation Section */}
            <Appreciation
              eyebrow={activeContent.appreciationEyebrow}
              title={activeContent.appreciationTitle}
              paragraphs={activeContent.appreciationParagraphs}
            />

            {/* More Memories Section */}
            <MoreMemories
              eyebrow={activeContent.memoriesEyebrow}
              title={activeContent.memoriesTitle}
              subtitle={activeContent.memoriesSubtitle}
              items={activeContent.memoryItems}
            />

            {/* Vinyl Soundtrack Rail Section */}
            <SoundtrackRail
              eyebrow={activeContent.albumRailEyebrow}
              title={activeContent.albumRailTitle}
              subtitle={activeContent.albumRailSubtitle}
              tracks={activeContent.albumRailTracks}
            />

            {/* Wishes Section */}
            <Wishes
              eyebrow={activeContent.wishesEyebrow}
              title={activeContent.wishesTitle}
              intro={activeContent.wishesIntro}
              wishes={activeContent.wishes}
            />
          </>
        ) : null}

        {/* Interactive Birthday Cake (Present in both views) */}
        <BirthdayCake recipientName={activeContent.displayName} />

        {/* Surprise Section (Personal View only) */}
        {!isPublic ? (
          <Surprise
            eyebrow={activeContent.surpriseEyebrow}
            title={activeContent.surpriseTitle}
            lede={activeContent.surpriseLede}
            hugMessage={activeContent.hugMessage}
            secretButtonLabel={activeContent.secretButtonLabel}
            secretMessage={activeContent.secretMessage}
            sweetLines={activeContent.sweetLines}
          />
        ) : null}

        {/* Closing Section (Present in both views) */}
        <Closing
          title={activeContent.closingTitle}
          paragraph={activeContent.closingParagraph}
          senders={activeContent.senders}
          replayLabel={activeContent.replayLabel}
          photo={activeContent.closingPhoto}
          onReplay={handleReplay}
          onLock={handleLock}
          lockLabel="Lock / Switch Mode"
        />
      </main>

      <MusicPlayer
        songUrl={content.songUrl}
        songTitle={content.songTitle}
        showHint={showMusicHint}
        shouldPlay={shouldPlayMusic}
      />
    </>
  );
}
