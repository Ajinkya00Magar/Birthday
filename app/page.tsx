"use client";

import { useEffect, useRef, useState } from "react";
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
import SoundtrackRail from "@/components/SoundtrackRail";
import Wishes from "@/components/Wishes";
import BirthdayCake from "@/components/BirthdayCake";
import Surprise from "@/components/Surprise";
import Closing from "@/components/Closing";
import MusicPlayer from "@/components/MusicPlayer";

type Stage = "loading" | "locked" | "intro" | "main";
type AuthMode = "personal" | "public";

// Photos specifically requested to be excluded from the public view
const PRIVATE_PHOTO_SRCS = new Set([
  "/photos/gallery-warm-duo.jpeg",
  "/photos/gallery-lab-duo.jpeg",
  "/photos/gallery-red-wall.jpeg",
  "/photos/gallery-chandelier-duo.jpeg",
  "/photos/gallery-certificates-squad.jpeg",
  "/photos/gallery-call-screenshot.jpeg",
  "/photos/memory-video-3.mp4",
]);

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");
  const [authMode, setAuthMode] = useState<AuthMode>("personal");
  const [showMusicHint, setShowMusicHint] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  // Restore authenticated view on page reload directly to home page (main)
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("birthday_auth_mode") as AuthMode | null;
      if (savedAuth === "personal" || savedAuth === "public") {
        setAuthMode(savedAuth);
        setStage("main");
      }
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

  // Dynamic content mappings based on Personal vs Public view
  const displayName = isPublic ? "Yogeshwari" : content.displayName;
  const recipientName = isPublic ? "Yogeshwari Thombare" : content.recipientName;
  const introTitle = isPublic ? "Yogeshwari, this one's for you." : content.introTitle;
  const heroEyebrow = isPublic
    ? "A little celebration for our favourite person"
    : content.heroEyebrow;

  // Letters: completely omitted in public view
  const ajinkyaLetter = !isPublic ? content.letters.find((l) => l.author === "Ajinkya") : null;
  const rutvikLetter = !isPublic ? content.letters.find((l) => l.author === "Rutvik") : null;
  const dipikaLetter = !isPublic ? content.letters.find((l) => l.author === "Dipika") : null;

  // Reasons Why
  const reasonsEyebrow = isPublic ? "Why Yogeshwari is so special" : content.reasonsEyebrow;
  const reasons = isPublic
    ? content.reasonsWhy.map((r) => r.replaceAll("Yogi", "Yogeshwari"))
    : content.reasonsWhy;

  // Gallery: filter out private photos and replace "Yogi" with "Yogeshwari"
  const galleryTitle = isPublic ? "The Yogeshwari Archives" : content.galleryTitle;
  const galleryPhotos = isPublic
    ? content.galleryPhotos
        .filter((photo) => !PRIVATE_PHOTO_SRCS.has(photo.src))
        .map((photo) => ({
          ...photo,
          caption: photo.caption ? photo.caption.replaceAll("Yogi", "Yogeshwari") : "",
        }))
    : content.galleryPhotos;

  // Appreciation
  const appreciationParagraphs = isPublic
    ? content.appreciationParagraphs.map((p) => p.replaceAll("Yogi", "Yogeshwari"))
    : content.appreciationParagraphs;

  // Memories
  const memoryItems = isPublic
    ? content.memoryItems.map((m) => m.replaceAll("Yogi", "Yogeshwari"))
    : content.memoryItems;

  // Album Rail
  const albumRailTitle = isPublic ? "Yogeshwari's Album Rail" : content.albumRailTitle;

  // Wishes
  const wishesEyebrow = isPublic ? "For you, Yogeshwari" : content.wishesEyebrow;
  const wishes = isPublic
    ? content.wishes.map((w) => w.replaceAll("Yogi", "Yogeshwari"))
    : content.wishes;

  // Surprise
  const surpriseTitle = isPublic
    ? "A Tiny Dose of Yogeshwari Appreciation"
    : content.surpriseTitle;
  const hugMessage = isPublic
    ? "Giant hugs are on the way to Yogeshwari. 🤗"
    : content.hugMessage;
  const secretMessage = isPublic
    ? content.secretMessage.replaceAll("Yogi", "Yogeshwari")
    : content.secretMessage;
  const sweetLines = isPublic
    ? content.sweetLines.map((s) => s.replaceAll("Yogi", "Yogeshwari"))
    : content.sweetLines;

  // Closing
  const closingTitle = isPublic ? "Happy Birthday, Yogeshwari." : content.closingTitle;
  const closingParagraph = isPublic
    ? content.closingParagraph.replaceAll("Yogi", "Yogeshwari")
    : content.closingParagraph;

  return (
    <>
      {stage !== "main" ? (
        <StageTransition stageKey={stage}>
          {stage === "loading" ? <LoadingScreen onDone={handleLoadingDone} /> : null}

          {stage === "locked" ? (
            <PinScreen
              personalPin={content.personalPin || "14112007"}
              publicPin={content.publicPin || "02102005"}
              recipientName={displayName}
              hint={content.pinHint}
              securityQuestion={content.securityQuestion || "What do we call you?"}
              securityAnswer={content.securityAnswer || "yogi"}
              onUnlock={handleUnlock}
            />
          ) : null}

          {stage === "intro" ? (
            <IntroScreen
              title={introTitle}
              onOpened={handleOpened}
              onOpenStart={handleOpenStart}
            />
          ) : null}
        </StageTransition>
      ) : null}

      <main>
        <Hero
          displayName={displayName}
          recipientName={recipientName}
          age={content.age}
          birthdayDate={content.birthdayDate}
          eyebrow={heroEyebrow}
          supportingLine={content.heroSupportingLine}
          photo={content.heroPhoto}
        />

        {/* 1) Personal letters: strictly rendered ONLY in personal view */}
        {!isPublic && ajinkyaLetter ? (
          <LetterCard letter={ajinkyaLetter} colorClass="section--pink" />
        ) : null}

        <ReasonsWhy
          eyebrow={reasonsEyebrow}
          title={content.reasonsTitle}
          lede={content.reasonsLede}
          reasons={reasons}
        />

        {!isPublic && rutvikLetter ? (
          <LetterCard letter={rutvikLetter} colorClass="section--coral" />
        ) : null}

        {!isPublic && dipikaLetter ? (
          <LetterCard letter={dipikaLetter} colorClass="section--sun" />
        ) : null}

        {/* 2) Gallery with private photos filtered out in public view */}
        <Gallery
          eyebrow={content.galleryEyebrow}
          title={galleryTitle}
          subtitle={content.gallerySubtitle}
          photos={galleryPhotos}
        />

        {/* 3) "From One SIH Meeting to So Many Memories": strictly removed in public view */}
        {!isPublic ? (
          <Timeline
            eyebrow={content.timelineEyebrow}
            title={content.timelineTitle}
            events={content.timeline}
          />
        ) : null}

        <Appreciation
          eyebrow={content.appreciationEyebrow}
          title={content.appreciationTitle}
          paragraphs={appreciationParagraphs}
        />

        <MoreMemories
          eyebrow={content.memoriesEyebrow}
          title={content.memoriesTitle}
          subtitle={content.memoriesSubtitle}
          items={memoryItems}
        />

        <SoundtrackRail
          eyebrow={content.albumRailEyebrow}
          title={albumRailTitle}
          subtitle={content.albumRailSubtitle}
          tracks={content.albumRailTracks}
        />

        <Wishes
          eyebrow={wishesEyebrow}
          title={content.wishesTitle}
          intro={content.wishesIntro}
          wishes={wishes}
        />

        <BirthdayCake recipientName={displayName} />

        <Surprise
          eyebrow={content.surpriseEyebrow}
          title={surpriseTitle}
          lede={content.surpriseLede}
          hugMessage={hugMessage}
          secretButtonLabel={content.secretButtonLabel}
          secretMessage={secretMessage}
          sweetLines={sweetLines}
        />

        <Closing
          title={closingTitle}
          paragraph={closingParagraph}
          senders={content.senders}
          replayLabel={content.replayLabel}
          photo={content.closingPhoto}
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
