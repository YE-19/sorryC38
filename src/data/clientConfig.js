/**
 * clientConfig.js
 * ------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for the entire greeting card experience.
 *
 * To spin up a new client site: duplicate this file's VALUES only.
 * Do not rename top-level keys — every component maps over this
 * exact shape. Image paths can point to /src/assets/<client>/...
 * or to any hosted URL.
 * ------------------------------------------------------------------
 */

// --- استدعاء الصور هنا في بداية الملف ---
import img1 from '../assets/placeholder-1.jpg';
import img2 from '../assets/placeholder-2.jpg';
import pr1 from '../assets/pr1.jpg';
import pr2 from '../assets/pr2.jpg';
import sryImg from '../assets/sry.jpg';

// صور شبكة القلب (1 إلى 12)
import heart1 from '../assets/1.jpg';
import heart2 from '../assets/2.jpg';
import heart3 from '../assets/3.jpg';
import heart4 from '../assets/4.jpg';
import heart5 from '../assets/5.jpg';
import heart6 from '../assets/6.jpg';
import heart7 from '../assets/7.jpg';
import heart8 from '../assets/8.jpg';
import heart9 from '../assets/9.jpg';
import heart10 from '../assets/10.jpg';
import heart11 from '../assets/11.jpg';
import heart12 from '../assets/12.jpg';

const clientConfig = {
  // ---------------------------------------------------------------
  // 1. THEME — colors referenced via CSS custom properties in index.css
  //    (also mirrored in tailwind.config.js for utility classes)
  // ---------------------------------------------------------------
  theme: {
    background: '#fdfbf7', // cream
    primary: '#1b2a4a', // navy — headings, envelope, borders
    accent: '#c98a4b', // wax seal / gold accents
    balloon: '#a9bcd8', // balloon + watercolor flower tint
  },

  // ---------------------------------------------------------------
  // 2. RECIPIENT / META
  // ---------------------------------------------------------------
  meta: {
    recipientName: 'Love',
    senderName: 'Zozo',
    pageTitle: 'For You, My Love',
  },

  // ---------------------------------------------------------------
  // 3. SCREEN 0 — PASSWORD LOCK
  // ---------------------------------------------------------------
  passwordGate: {
    enabled: true,
    targetPassword: '17/2',
    eyebrow: 'Special Delivery',
    heading: "I'm sorry , my Love",
    subtext: 'Enter the secret date to unlock',
    placeholder: 'DD / MM',
    buttonText: 'Unlock With Love',
    hintText: 'Hint: 17/2',
    errorMessage: 'Incorrect date, try again ❤️',
  },

  // ---------------------------------------------------------------
  // 4. SCREEN 0.5 — FORGIVE ME
  // ---------------------------------------------------------------
  forgive: {
    heading: 'Will you forgive me ,my love ? 🥺',
    image: sryImg,
    yesText: 'Yes, I forgive you ❤️',
    acceptedMessage: 'I knew you would say yes! ❤️✨',
    acceptedSubtext: 'Opening your special letter...',
  },

  // ---------------------------------------------------------------
  // 5. SCREEN 1 — COVER (closed envelope)
  // ---------------------------------------------------------------
  cover: {
    eyebrow: 'For you',
    subtext: 'tap on the letter to open',
  },

  // ---------------------------------------------------------------
  // 4. SCREEN 2 — ENVELOPE OPEN (card pop-up + balloons)
  // ---------------------------------------------------------------
  envelopeOpen: {
    heading: 'Will you forgive me ,\nmy love ? 🥺',
    subtext: 'tap on the letter for more',
    balloonCount: 6,
  },

  // ---------------------------------------------------------------
  // 5. SCREEN 3 — LETTER PAGE
  // ---------------------------------------------------------------
  letter: {
    heading: 'My Love,',
    salutation: '',
    paragraphs: [
      'I’m writing this because I want to give you some space, but I also need to clear the air about what happened between us. Looking back at our misunderstanding, I realize that my words/actions didn’t reflect how I truly feel about you, and I am so sorry for my part in it.',
      'I hate the feeling of there being a wall between us. It was never my intention to hurt or upset you, but I know that intentions don’t change how things landed. Your feelings are completely valid, and it pains me to know that I caused you any stress or doubt.',
      'Our relationship means the world to me, and I don’t want a miscommunication to overshadow the love and respect we’ve built. I just want you to listen to me and truly understand how I feel whenever you’re ready to talk.',
      'Please take all the time and space you need. Just know that I am here, I love you, and I hope you can forgive me.',
      'With all my love,\nI promise that this won’t happen again.',
    ],
    signOff: 'Your lover,\nZozo🥹💞',
    images: [
      { src: img1, alt: 'A warm shared memory, close together and smiling' },
      { src: img2, alt: 'A playful candid selfie' },
    ],
    nextLabel: 'Next',
  },

  // ---------------------------------------------------------------
  // 6. SCREEN 4 — VIDEO PAGE
  // ---------------------------------------------------------------
  video: {
    heading: 'Song For You',
    // Accepts a full YouTube watch/share/shorts URL OR a bare 11-char video ID.
    youtubeId: 'https://youtube.com/shorts/-yz1tYzU38g?si=c9zWXwcSbKI_Ey3_',
    caption: 'love you — our song',
    nextLabel: 'Next',
  },

  // ---------------------------------------------------------------
  // 7. SCREEN 5 — PHOTO COLLAGE (heart-shaped grid)
  // ---------------------------------------------------------------
  collage: {
    heading: null, // optional heading above the collage, leave null to omit
    // Order matters: this array is mapped directly, in order, onto the
    // 12 named grid areas (a–l) defined in PhotoCollage.jsx's heart layout.
    photos: [
      { src: heart1, alt: 'Memory 1' }, // a
      { src: heart2, alt: 'Memory 2' }, // b
      { src: heart3, alt: 'Memory 3' }, // c
      { src: heart4, alt: 'Memory 4' }, // d
      { src: heart5, alt: 'Memory 5' }, // e
      { src: heart6, alt: 'Memory 6' }, // f
      { src: heart7, alt: 'Memory 7' }, // g
      { src: heart8, alt: 'Memory 8' }, // h
      { src: heart9, alt: 'Memory 9' }, // i
      { src: heart10, alt: 'Memory 10' }, // j
      { src: heart11, alt: 'Memory 11' }, // k
      { src: heart12, alt: 'Memory 12' }, // l
    ],
    nextLabel: 'Next',
  },

  // ---------------------------------------------------------------
  // 8. SCREEN 6 — FINAL PAGE
  // ---------------------------------------------------------------
  finale: {
    images: [
      { src: pr1, alt: 'Special moment 1' },
      { src: pr2, alt: 'Special moment 2' },
    ],
    heading: 'Always &',
    headingScript: 'Forever',
    message: 'I’m sorry, I love you, and I never meant to hurt you. 💞',
    restartLabel: 'Read again',
  },
};

export default clientConfig;