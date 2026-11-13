// =============================================================
// ALL TEXT, DATES, PHOTOS, MUSIC AND LETTERS ARE CONFIGURED FROM THIS FILE.
// See README.md for a guide.
// =============================================================

export type Photo = {
  /** Path to a photo/video file inside /public, e.g. "/photos/yogi-hero-portrait.png". Leave "" for no photo yet. */
  src: string;
  alt: string;
  caption: string;
};

export type TimelineEvent = {
  date: string;
  description: string;
};

export type Letter = {
  /** Name of the person writing this letter */
  author: string;
  /** Short eyebrow label above the letter */
  eyebrow: string;
  /** Heading for the letter card */
  heading: string;
  /** Paragraphs of the letter — each string is one paragraph */
  paragraphs: string[];
  /** Closing line, e.g. "With lots of love," */
  closing: string;
  /** Optional companion photo for the letter */
  photo?: Photo;
};

export type AlbumTrack = {
  id: string;
  title: string;
  artist: string;
  coverSrc: string;
  audioSrc: string;
};

export const content = {
  // --- Identity ---
  recipientName: "Yogeshwari Thombare",
  /** Short display name used in headings */
  displayName: "Yogi",
  /**
   * Optional: age and birthday date.
   * Leave either as "" to hide that field entirely on the Hero section.
   */
  age: "" as string,
  birthdayDate: "" as string,

  // --- Group senders ---
  senders: ["Ajinkya", "Rutvik", "Dipika", "Pranav", "Omkar"] as string[],

  // --- PIN lock: 14112007 ---
  accessPin: "14112007" as string,
  pinHint: "Hint: 14112007" as string,

  // --- Loading screen ---
  loadingLabel: "Putting together a little birthday chaos for Yogi…",

  // --- Gift-opening intro screen ---
  introTitle: "Yogiiii, this one's for you.",
  introSubtitle:
    "Five friends. A ridiculous number of memories. One very special human. We made you a little something.",
  introButtonLabel: "Open your surprise",

  // --- Hero section ---
  heroEyebrow: "A little celebration for our favourite human",
  heroSupportingLine:
    "Some people become part of a team. Some people make it feel like a family. You somehow managed to do both.",

  // --- Letters: Ajinkya, Rutvik, Dipika ---
  letters: [
    {
      author: "Ajinkya",
      eyebrow: "From the Umiya meeting to becoming one of my favourite people",
      heading: "A Note From Ajinkya",
      paragraphs: [
        "Yogi,",
        "I still remember the first time we met at Umiya, during that SIH meeting. It was such a natural, happy meeting that I don't think I even realised then how close we would all become.",
        "You were already part of the group with everyone else. Most of you had known each other since Sem 1, and I was the newer person joining in Sem 3. I could have easily felt like the extra person walking into a group that already had its own stories and comfort zone. But you never made me feel paraya. Not even once. You made things feel easy and natural, and that is something I genuinely appreciate.",
        "I don't know exactly when it happened, but somewhere along the way you became one of those people I can talk to forever. The conversations never really need a reason. You have this energetic, cute, happy kind of presence that makes ordinary moments feel lighter.",
        "And it isn't just the fun side. I genuinely admire the way you handle difficult situations. Even when things get messy or chaotic, you somehow manage to deal with them with grace. You care, you think things through, you bring logic when it is needed, and then out of nowhere you say something so random that everyone starts laughing.",
        "Also, please stop saying you haven't done much. We see how much you contribute. We see the effort, the hard work and all the things you quietly take care of. You don't have to announce it for it to matter.",
        "I could write a lot more, but even that probably wouldn't fully explain how grateful I am that we met and became friends. You are genuinely one of the best people to have around, and I'm really glad that the SIH meeting at Umiya turned into all these memories and conversations.",
        "And before you start saying that everyone in the group is equally good — yes, obviously, everyone is amazing. But today is your day, so please let us appreciate you without changing the topic. 😂",
        "Happy birthday, Yogi. Keep smiling, keep being your wonderfully random self, and never underestimate how much you mean to the people around you.",
      ],
      closing: "With lots of love and respect, Ajinkya",
      photo: {
        src: "/photos/letter-ajinkya-duo.jpeg",
        alt: "Ajinkya and Yogi laughing under warm lights with double peace signs",
        caption: "From that first Umiya meeting to all these laughs.",
      },
    },
    {
      author: "Rutvik",
      eyebrow: "In Alandi, the one and only girl I genuinely call my person",
      heading: "A Letter From Rutvik",
      paragraphs: [
        "Happy Birthday, Yogi! ❤️🫂",
        "Yogi, Yogi, Yogi… sirf meri Yogi!",
        "Honestly, tujhe words mein express karna mere liye bahut difficult hai. I don't know how to explain what you mean to me, but the truth is, I make very few people mine. For me, friendship is a very general term, but my people are something entirely different. They are the people I can call at any hour, talk to without thinking twice, be completely stupid around, and still feel comfortable. And you are one of those very few people.",
        "In Alandi, you're the one and only girl I genuinely call my person. I don't know how, but there's a different kind of comfort I feel around you. Your maturity, your understanding, your little stubbornness, your innocence and the way you care about the smallest things… everything about you feels so special.",
        "You know what? I genuinely feel that God has blessed you with a beautiful heart. The way you consult me, the way you try to understand things, and the way you stand by me even in my weirdest moments means more than you probably realise.",
        "There are days when I overthink, when my mind is full of unnecessary thoughts, and when I don't even know how to explain what's going on inside me. But somehow, talking to you gives me peace. You have this beautiful ability to make things feel lighter without even trying.",
        "And Yogi, when you say something like, \"I want this, I need that,\" with that little stubbornness of yours, it genuinely makes me smile. I don't know why, but seeing you happy gives me a different kind of satisfaction. I might act rude, tease you, irritate you or behave like the weirdest person sometimes, but trust me, your happiness matters to me a lot.",
        "I know I'm not the easiest person to understand. Sometimes I overthink, sometimes I act weird, sometimes I intentionally become difficult, and sometimes I don't express what I'm actually feeling. But I hope you always remember that none of this changes how special you are to me.",
        "You are my comfort zone, my favourite human in this little Alandi world, and someone I genuinely feel proud of. I have faith in you, in your abilities, and in the person you're becoming.",
        "I wish you never lose that spark in you. Keep that little stubbornness, that maturity, that beautiful smile and that childlike happiness alive. Keep growing, keep achieving, and never settle for anything less than what you deserve.",
        "And one thing, Yogi… You don't have to do anything extraordinary to remain special. Just being YOU is enough.",
        "I don't call you mine casually. It's just that some people feel like home, and you're one of them.",
        "May this year bring you endless happiness, beautiful opportunities, peaceful nights, crazy adventures and everything your heart silently wishes for.",
        "Happy Birthday once again, Yogi! Stay blessed, stay happy, and please never change that beautiful little version of yourself. You're special, Yogi. More than words can explain. ❤️",
      ],
      closing: "And haan… Yogi is Yogi. No replacement, no comparison. Just my Yogi. 🫂❤️ — Rutvik",
      photo: {
        src: "/photos/letter-rutvik-duo.jpeg",
        alt: "Rutvik and Yogi smiling together at night",
        caption: "Some people just feel like home.",
      },
    },
    {
      author: "Dipika",
      eyebrow: "The things she had to say (and she had A LOT to say)",
      heading: "A Letter From Dipika",
      paragraphs: [
        "Brohh, I love you! Like seriously, yesterday you were being so genuinely cute, I was literally thinking ki how the hell can someone be this exhausted and yet look this pretty?! Touchwood, konachich najar nahi lago, but seriously you are way too adorable! Straight up, if I was a guy, I would have fallen in love with you by now 100%. But alas, I'm straight, so you just have to deal with me loving you as your bestie!",
        "Now where do I even start with your appreciation? I honestly don't know, because it's not like there's just one good thing about you — there are literally so many. Everything about you is so spot on, and we are so insanely blessed to have an absolute gem like you in our team.",
        "I know I don't say it out loud often, but Ajinkya and Rutvik continuously praise you behind your back and pudhe pan for being the most hardworking girl in our team — and they are not even wrong, they are 200% correct! What do I even call you, man? You are our team's ultimate all-rounder! From handling the PPT to working on the prototype, you just do everything so effortlessly. And the most hilarious part about you? After doing literally everything, you still act like \"Aree, I didn't even do that much!\" Like Sister, please! How are you so grounded and humble? If anyone else was in your place, they would have boasted 1000 times by now about what they did, but you're just so sweet and grounded.",
        "You're not just great professionally, but as a human being, you are so deeply caring. You know exactly how to keep things calm when everything around us is chaotic. Your mindset, your values, your logic... I swear, people like you are so rare nowadays. Plus, you are so randomly funny! Every single time, you make us laugh with your humour and just light up the room.",
        "I honestly don't get your magic — like how do you balance being so mature and being a total teasing comedian at the same time? Having that level of maturity and a humorous side blended so well... wow, how do you even pull that off man?",
        "Also, a big sorry from my side! Now don't ask why or for what, just take it quietly! Knowingly or unknowingly, I've made things a little difficult during some team moments, and if I ever hurt you or made the team suffer — je ki mi kela ahe ig — I'm genuinely sorry. I never intended to and never will.",
        "You are that core part of our team that only you can be, nobody else could ever replace you. So big cheers to our Yogeshwari! We are super proud of you, we believe in you, and we love youuu so much! I pray that you always stay like this — the genuine, sweet core you. Of course, growth and success are guaranteed, I don't have even 0.1% doubt about that, because you deserve every single thing you dream of. I really hope you keep smiling always, because that's the Yogeshwari we love the most. May negativity never touch you. Always stay healthy, super wealthy, and may your parents, family and friends always be as proud of you as we are today!",
      ],
      closing: "With lots of love, Dipika 💝",
      photo: {
        src: "/photos/letter-dipika-duo.jpeg",
        alt: "Dipika hugging Yogi holding little toys together",
        caption: "Bestie energy, straight up.",
      },
    },
  ] as Letter[],

  // --- Reasons / flip-card section ---
  reasonsEyebrow: "Things we probably don't tell you enough",
  reasonsTitle: "The Yogi Effect",
  reasonsLede: "Flip a card. We have receipts.",
  reasonsWhy: [
    "You make people feel included. Even when a group already has its own history, you know how to make someone feel like they belong.",
    "You are the all-rounder. From PPTs to prototype work, you somehow end up handling more than you admit.",
    "You stay grounded. You can do ten things and still say, \"Arey, I didn't even do that much!\" Sister, please.",
    "You bring calm into chaos. You have a way of handling difficult situations with maturity and grace.",
    "You are mature AND unserious. The logic is solid, but the random humour is equally powerful.",
    "You are easy to talk to. Serious discussions, random stories, pointless jokes — we could keep going for hours.",
    "You care deeply. You notice people and situations, and you show up in ways that matter.",
    "You are irreplaceably Yogi. Nobody else can bring exactly what you bring to this group.",
  ] as string[],

  // --- Hero photo ---
  heroPhoto: {
    src: "/photos/yogi-hero-portrait.png",
    alt: "Yogi smiling under warm hanging lights",
    caption: "The birthday star herself",
  } as Photo,

  // --- Gallery section: 16 unique photos & videos ---
  galleryEyebrow: "Evidence of our collective lack of normal behaviour",
  galleryTitle: "The Yogi Archives",
  gallerySubtitle: "A few frames from all the chaos, smiles, and memories we are lucky to have.",
  galleryPhotos: [
    {
      src: "/photos/gallery-warm-duo.jpeg",
      alt: "Yogi and friend under hanging lights making rock sign",
      caption: "Golden lights, rock signs, and that signature Yogi grin.",
    },
    {
      src: "/photos/gallery-solo-trophy.jpeg",
      alt: "Yogi in formal clothes standing by certificates and trophy",
      caption: "Certificates, trophy, water bottles — the all-rounder who still says 'Maine kuch nahi kiya'.",
    },
    {
      src: "/photos/gallery-lab-duo.jpeg",
      alt: "Yogi waving both hands next to friend in lab",
      caption: "Waving away the stress in the lab.",
    },
    {
      src: "/photos/gallery-napkin-peek.jpeg",
      alt: "Yogi holding napkin over eyes playfully",
      caption: "Peak peekaboo moment at the table.",
    },
    {
      src: "/photos/gallery-red-wall.jpeg",
      alt: "Friends posing dynamically in front of glowing red wall",
      caption: "Showing up in full dramatic mode in front of the neon red wall.",
    },
    {
      src: "/photos/gallery-mall-trio.jpeg",
      alt: "Mall selfie of three friends with finger points",
      caption: "One mall walk, multiple finger points, and completely non-serious posing.",
    },
    {
      src: "/photos/gallery-playful-trio.jpeg",
      alt: "Playful trio selfie sticking tongues out",
      caption: "Trio pose: 10% posing, 90% laughing and sticking tongues out.",
    },
    {
      src: "/photos/gallery-chandelier-duo.jpeg",
      alt: "Two friends smiling under warm bulb chandelier",
      caption: "Chandelier lights and warm conversations.",
    },
    {
      src: "/photos/gallery-trophy-selfie.jpeg",
      alt: "Selfie with trophy, Dipika and Yogi in purple",
      caption: "The trophy smiles — Dipika, Yogi, Ajinkya, and teammate.",
    },
    {
      src: "/photos/gallery-certificates-squad.jpeg",
      alt: "Team holding certificates in front of banner",
      caption: "Proudly holding certificates after all the late-night work.",
    },
    {
      src: "/photos/gallery-call-screenshot.jpeg",
      alt: "Late-night group video call screenshot",
      caption: "Late-night group video calls when we all have too much to say.",
    },
    {
      src: "/photos/gallery-circle-down.jpeg",
      alt: "Six friends in circle looking down into camera",
      caption: "The circle selfie from below — 6 heads, endless memories.",
    },
    {
      src: "/photos/gallery-store-squad.jpeg",
      alt: "Six friends taking a mirror selfie in a clothing store",
      caption: "The Studio West mirror selfie that took 10 minutes to line up.",
    },
    {
      src: "/photos/gallery-golden-squad.jpeg",
      alt: "Five friends posing beneath warm light bulbs",
      caption: "Surrounded by warm bulbs and the best crew.",
    },
    {
      src: "/photos/gallery-lights-group.jpeg",
      alt: "Four friends smiling under warm bulb setup",
      caption: "One more frame from the evening under the warm bulbs.",
    },
    {
      src: "/photos/memory-video-3.mp4",
      alt: "Short video memory with the crew",
      caption: "A day out with the people who make the memories.",
    },
  ] as Photo[],

  // --- Closing section photo: grand squad outside illuminated entrance ---
  closingPhoto: {
    src: "/photos/closing-grand-squad.jpeg",
    alt: "All friends together smiling in front of the illuminated golden building",
    caption: "",
  } as Photo,

  // --- Friendship Timeline ---
  timelineEyebrow: "How this little story happened",
  timelineTitle: "From One SIH Meeting to So Many Memories",
  timeline: [
    {
      date: "The Umiya Meeting",
      description:
        "An SIH meeting, a natural first conversation, and the start of knowing someone who would become a very important part of the group.",
    },
    {
      date: "The Sem 3 Addition",
      description:
        "Ajinkya joined a group that already had stories going back to Sem 1. Yogi made sure it never felt like walking into a room full of strangers.",
    },
    {
      date: "Somewhere Along the Way",
      description:
        "The meetings, the work, the jokes, the discussions, and the little moments that quietly turned into friendship.",
    },
    {
      date: "The Project Chaos Era",
      description:
        "PPTs, prototypes, deadlines, ideas and everything happening at once. Somehow, Yogi kept showing up across all of it.",
    },
    {
      date: "The Conversations That Keep Going",
      description:
        "From serious talks to completely random topics, there is always something more to discuss.",
    },
    {
      date: "Still Collecting Memories",
      description:
        "This is not the end of the story. There are plenty more pictures, laughs and adventures waiting for this group.",
    },
  ] as TimelineEvent[],

  // --- Appreciation section ---
  appreciationEyebrow: "What you bring into a room",
  appreciationTitle: "A Little More About You",
  appreciationParagraphs: [
    "There are people who make a group functional, and then there are people who make it feel good to be part of that group. You somehow do both.",
    "When things get chaotic, you bring a kind of calm that people notice. When things get too serious, your random humour appears at exactly the right moment. And in between all of that, you keep working, helping, thinking and caring — often without making a big deal out of it.",
    "We hope you know that the little things count too. The way you include people, the way you listen, the way you contribute, the way you make conversations feel easy — these things stay with people. You might think they are ordinary, but they are a big part of why we are so happy to have you around.",
  ] as string[],

  // --- More Memories list ---
  memoriesEyebrow: "The plan from here",
  memoriesTitle: "More Memories, Please.",
  memoriesSubtitle: "A few things we are absolutely not done doing together.",
  memoryItems: [
    "More spontaneous plans that somehow become full-day memories.",
    "More group pictures where nobody knows where to look.",
    "More long conversations that begin with one topic and end somewhere completely unrelated.",
    "More project wins — and celebrations that are at least twice as loud.",
    "More random jokes, teasing and laughter in the middle of stressful days.",
    "More moments where we remind you how much you mean to us, even when you try to dismiss the compliment.",
    "More years of friendship, growth and stories that we will keep bringing up forever.",
  ] as string[],

  // --- Birthday wishes ---
  wishesEyebrow: "For you, Yogi",
  wishesTitle: "All the Good Things, Always.",
  wishesIntro: "A few wishes from five people who are really glad to have you in their lives.",
  wishes: [
    "May you always have good health, genuine happiness and the peace you deserve.",
    "May every dream you are quietly working towards find its way to you.",
    "May your hard work be recognised, your efforts rewarded and your confidence grow with every new challenge.",
    "May you always be surrounded by people who value you as much as you value them.",
    "May your family always have reasons to be proud of you, and may you always have reasons to be proud of yourself.",
    "May life keep giving you beautiful reasons to smile — and may negativity never get to dim that smile.",
    "May you never lose your kindness, your humour, your grounded nature or that wonderfully energetic Yogi personality.",
    "And selfishly, may we get many more years of your friendship, your random conversations and your very necessary presence in our chaos.",
  ] as string[],

  // --- Album Rail / Soundtrack (React Bits Pro component) ---
  albumRailEyebrow: "Our Vibe & Soundtrack",
  albumRailTitle: "Yogi's Album Rail",
  albumRailSubtitle:
    "A fan of record sleeves with vinyl tucked inside. Tap or hover an album to slide the vinyl out and play the track.",
  albumRailTracks: [
    {
      id: "track-1",
      title: "Kho Gaye Hum Kahan",
      artist: "Special Dedication For Yogi",
      coverSrc: "/photos/track-yogi-cafe.jpeg",
      audioSrc: "/songs/track1.mp3",
    },
    {
      id: "track-2",
      title: "Ilahi",
      artist: "Birthday Vibes",
      coverSrc: "/photos/track-trio-fists.jpeg",
      audioSrc: "/songs/track2.mp3",
    },
    {
      id: "track-3",
      title: "Happy Birthday Yogi",
      artist: "Theme Stars",
      coverSrc: "/photos/track-trio-lights.jpeg",
      audioSrc: "/songs/Theme Stars - Happy Birthday to You (Whistle Snap).mp3",
    },
    {
      id: "track-4",
      title: "Special Memory Track 1",
      artist: "Ajinkya, Rutvik & Yogi",
      coverSrc: "/photos/track-gdg-trophy.jpeg",
      audioSrc: "/songs/track1.mp3",
    },
    {
      id: "track-5",
      title: "Special Memory Track 2",
      artist: "The Whole Gang",
      coverSrc: "/photos/track-night-squad.jpeg",
      audioSrc: "/songs/track2.mp3",
    },
  ] as AlbumTrack[],

  // --- Surprise section ---
  surpriseEyebrow: "One last thing (okay, maybe three)",
  surpriseTitle: "A Tiny Dose of Yogi Appreciation",
  surpriseLede: "Because apparently one page of compliments was not enough.",
  hugMessage: "Five giant hugs are on the way. No declining, no excuses. 🤗",
  secretButtonLabel: "One more thing…",
  secretMessage:
    "You are not just part of this group. You are one of the reasons it feels like ours. We are proud of you, grateful for you, and ridiculously lucky to call you our friend. Happy birthday, Yogi. We love youuu! 💛",
  sweetLines: [
    "If \"I didn't even do that much\" were an Olympic sport, you'd still somehow win gold.",
    "PPT? Prototype? Team chaos? Yogi has probably handled all three.",
    "Maturity in serious moments. Comedy in random moments. Range.",
    "You make people feel included without making a big announcement about it.",
    "Official reminder: your efforts are noticed, even when you pretend they aren't.",
    "The group chat would be significantly less entertaining without you.",
    "You are proof that a person can be both the sensible one and the reason everyone is laughing.",
    "Yogi, please accept the compliment. The committee has already approved it.",
    "You are one of our favourite reasons to keep making memories together.",
  ] as string[],

  // --- Closing section ---
  closingTitle: "Happy Birthday, Our Yogi.",
  closingParagraph:
    "Thank you for being exactly who you are — the energy, the kindness, the logic, the humour, the hard work and the little things that make you Yogi. We hope this year gives back even a fraction of the happiness you bring to the people around you.",
  replayLabel: "Watch our little surprise again",

  // --- Background music ---
  songUrl: "/songs/Theme Stars - Happy Birthday to You (Whistle Snap).mp3" as string,
  songTitle: "Happy Birthday to You (Whistle Snap)" as string,
};

export type Content = typeof content;
