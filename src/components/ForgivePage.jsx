import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparkleStar, DoodleHeart } from './decorations/HandDrawnMarks.jsx';

const NO_PHRASES = [
  'No',
  'Are you sure? 🥺',
  'Really? 💔',
  'Think again! 🥺',
  'Please? 😭',
  'Last chance! 💔',
  'You have no choice 🤍',
];

const ForgivePage = ({ config, onForgive }) => {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);

  const forgiveConfig = config?.forgive || {
    heading: 'Will you forgive me ,my love ? 🥺',
    image: null,
    yesText: 'Yes, I forgive you ❤️',
    acceptedMessage: 'I knew you would say yes! ❤️✨',
    acceptedSubtext: 'Opening your special letter...',
  };

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onForgive();
    }, 2000);
  };

  // No button shrinks progressively until it disappears after 6 clicks
  const maxNoClicks = NO_PHRASES.length;
  const isNoVisible = noCount < maxNoClicks;
  const noScale = Math.max(0, 1 - noCount * 0.17);
  // Yes button grows gently to invite the user
  const yesScale = 1 + Math.min(noCount * 0.12, 0.6);

  const currentNoPhrase = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];

  return (
    <motion.section
      key="forgive-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 text-center bg-[#fbfaf7] overflow-hidden select-none"
    >
      {/* Decorative Floating Sparkles */}
      <SparkleStar
        className="absolute top-10 left-8 sm:left-20 w-6 h-6 text-[#c98a4b] opacity-40 animate-pulse"
        color="#c98a4b"
      />
      <SparkleStar
        className="absolute bottom-12 right-8 sm:right-20 w-7 h-7 text-[#1b2a4a] opacity-35 animate-pulse"
        color="#1b2a4a"
      />
      <DoodleHeart
        className="absolute top-16 right-10 sm:right-24 w-12 h-8 text-[#c98a4b] opacity-25"
        color="#c98a4b"
      />
      <DoodleHeart
        className="absolute bottom-20 left-10 sm:left-24 w-14 h-9 text-[#1b2a4a] opacity-20"
        color="#1b2a4a"
      />

      <div className="w-full max-w-lg mx-auto relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl text-[#111a30] leading-tight mb-6 px-2"
        >
          {forgiveConfig.heading || 'Will you forgive me ,my love ? 🥺'}
        </motion.h1>

        {/* Circular Sorry Image with Floating Effect and Gold Halo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
          transition={{
            scale: { duration: 0.6, delay: 0.2 },
            opacity: { duration: 0.6, delay: 0.2 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative my-2 sm:my-4"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#c98a4b]/40 to-[#ffd700]/30 blur-md" />

          {/* Circular Frame */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-br from-[#e4bb79] via-[#cf9f53] to-[#a37229] shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white/80 flex items-center justify-center p-3">
              {forgiveConfig.image ? (
                <img
                  src={forgiveConfig.image}
                  alt="Sorry"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rose-50 text-4xl">
                  🥺
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons (Yes & No) */}
        {!isAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 mt-8 min-h-[85px] px-4"
          >
            {/* Yes Button */}
            <motion.button
              type="button"
              onClick={handleYesClick}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.05 }}
              whileTap={{ scale: yesScale * 0.95 }}
              className="px-6 sm:px-8 py-3.5 rounded-full font-serif font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-[#1b2a4a] via-[#243a67] to-[#1b2a4a] shadow-lg shadow-navy/30 hover:shadow-xl hover:from-[#15223c] hover:to-[#15223c] border border-amber-300/30 transition-shadow duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>{forgiveConfig.yesText || 'Yes, I forgive you ❤️'}</span>
              <span className="text-xl">❤️</span>
            </motion.button>

            {/* No Button (Shrinks with every click until it disappears) */}
            <AnimatePresence>
              {isNoVisible && (
                <motion.button
                  type="button"
                  onClick={handleNoClick}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ scale: noScale, opacity: Math.max(0.2, noScale) }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: noScale * 0.98 }}
                  whileTap={{ scale: noScale * 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="px-5 sm:px-6 py-3 rounded-full font-serif font-medium text-sm sm:text-base text-rose-700 bg-white/95 border-2 border-rose-300 shadow-md hover:bg-rose-50/80 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  {currentNoPhrase}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Success Modal / Toast after clicking YES */}
        <AnimatePresence>
          {isAccepted && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="mt-6 p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-[#c98a4b] shadow-2xl max-w-sm mx-auto backdrop-blur-md relative overflow-hidden"
            >
              {/* Floating Hearts Background Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -60, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="absolute left-6 text-2xl"
                >
                  💖
                </motion.span>
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -70, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
                  className="absolute right-6 text-2xl"
                >
                  ✨
                </motion.span>
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -80, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                  className="absolute top-8 text-2xl"
                >
                  🥰
                </motion.span>
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-4xl mb-3"
              >
                🥰
              </motion.div>

              <h2 className="font-script text-3xl sm:text-4xl text-[#111a30] mb-2 font-bold">
                {forgiveConfig.acceptedMessage || 'I knew you would say yes! ❤️'}
              </h2>

              <p className="font-serif italic text-sm text-[#111a30]/70">
                {forgiveConfig.acceptedSubtext || 'Opening your special letter...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ForgivePage;
