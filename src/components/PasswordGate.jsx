import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparkleStar } from './decorations/HandDrawnMarks.jsx';

/**
 * Normalizes user input and compares with the expected password.
 * Handles separators (/, -, ., spaces) and Arabic numerals.
 */
function normalizeInput(str) {
  if (!str) return '';
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let s = str.toString().trim();
  for (let i = 0; i < 10; i++) {
    s = s.replaceAll(arabicDigits[i], i.toString());
  }
  s = s.replace(/[\s\-.,\\/_]+/g, '/').toLowerCase();

  const parts = s.split('/');
  if (parts.length >= 2) {
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (!isNaN(d) && !isNaN(m)) {
      return `${d}/${m}`;
    }
  }

  // Handle compact date inputs like 1702 or 172
  if (/^\d{3,4}$/.test(s)) {
    const d = parseInt(s.slice(0, 2), 10);
    const m = parseInt(s.slice(2), 10);
    if (!isNaN(d) && !isNaN(m)) {
      return `${d}/${m}`;
    }
  }

  return s;
}

const PasswordGate = ({ config, onUnlock }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const screenConfig = config?.passwordGate || {
    eyebrow: 'Special Delivery',
    heading: "I'm sorry , my Love",
    subtext: 'Enter the secret date to open your letter',
    placeholder: 'DD / MM',
    buttonText: 'Unlock',
    hintText: 'Hint: Our special anniversary / date (17/2)',
    errorMessage: 'Incorrect date, try again with love ❤️',
    targetPassword: '17/2',
  };

  const targetPassword = screenConfig.targetPassword || '17/2';

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isSuccess) return;

    const normalizedInput = normalizeInput(passwordInput);
    const normalizedTarget = normalizeInput(targetPassword);

    if (normalizedInput === normalizedTarget || passwordInput.trim() === targetPassword.trim()) {
      setIsError(false);
      setIsSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1100);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 2500);
    }
  };

  return (
    <motion.section
      key="password-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-6 text-center bg-[#fbfaf7] overflow-hidden"
    >
      {/* Sparkles in the background */}
      <SparkleStar
        className="absolute top-12 left-10 sm:left-24 w-5 h-5 text-[#c98a4b] opacity-40 animate-pulse"
        color="#c98a4b"
      />
      <SparkleStar
        className="absolute bottom-16 right-8 sm:right-28 w-6 h-6 text-[#1b2a4a] opacity-30 animate-pulse"
        color="#1b2a4a"
      />
      <SparkleStar
        className="absolute top-1/4 right-12 w-4 h-4 text-[#c98a4b] opacity-30"
        color="#c98a4b"
      />
      <SparkleStar
        className="absolute bottom-1/3 left-8 w-4 h-4 text-[#1b2a4a] opacity-25"
        color="#1b2a4a"
      />

      {/* Main Lock Card Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        {/* Decorative Top Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#c98a4b] text-xs sm:text-sm uppercase font-semibold tracking-[0.25em] mb-2"
        >
          {screenConfig.eyebrow}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-script text-5xl sm:text-6xl text-[#111a30] mb-3"
        >
          {screenConfig.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-serif italic text-sm sm:text-base text-[#111a30]/75 max-w-xs mx-auto mb-8"
        >
          {screenConfig.subtext}
        </motion.p>

        {/* Floating Wax Seal / Lock Icon */}
        <motion.div
          animate={
            isSuccess
              ? { scale: [1, 1.25, 1.1], rotate: [0, -10, 10, 0] }
              : { y: [0, -6, 0] }
          }
          transition={
            isSuccess
              ? { duration: 0.8 }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative inline-block mb-8"
        >
          {/* Glowing Aura */}
          <div
            className={`absolute -inset-3 rounded-full blur-lg transition-opacity duration-500 ${isSuccess
              ? 'bg-gradient-to-r from-[#ffd700] to-[#c98a4b] opacity-80 animate-pulse'
              : 'bg-[#c98a4b]/20 opacity-50'
              }`}
          />

          {/* Seal Base */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-gradient-to-br from-[#e4bb79] via-[#cf9f53] to-[#a37229] shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            style={{ borderRadius: '48% 52% 47% 53% / 54% 45% 55% 46%' }}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-[2px] border-[#a87832]/60"
              style={{ borderRadius: '52% 48% 55% 45% / 46% 54% 48% 52%' }}
            >
              {isSuccess ? (
                // Unlocked Heart Icon
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 sm:w-11 sm:h-11 text-[#ffffff] drop-shadow-md"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
              ) : (
                // Lock Icon
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5c3e12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 sm:w-10 sm:h-10 opacity-80"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
            </div>
          </div>
        </motion.div>

        {/* Input Form with Shake Animation on Error */}
        <motion.form
          onSubmit={handleSubmit}
          animate={
            isError
              ? { x: [-10, 10, -8, 8, -4, 4, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
        >
          <div className="relative w-full">
            <input
              type="text"
              id="password-input"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder={screenConfig.placeholder}
              disabled={isSuccess}
              autoFocus
              className={`w-full py-3.5 px-4 text-center text-lg sm:text-xl font-medium tracking-widest text-[#111a30] bg-white/90 border-2 rounded-full shadow-inner focus:outline-none transition-all duration-300 placeholder:text-gray-400/80 ${isError
                ? 'border-rose-400 ring-2 ring-rose-300/50 bg-rose-50/50'
                : isSuccess
                  ? 'border-emerald-400 ring-2 ring-emerald-300/50 bg-emerald-50/50'
                  : 'border-[#c98a4b]/50 focus:border-[#c98a4b] focus:ring-4 focus:ring-[#c98a4b]/20 shadow-sm'
                }`}
            />

            {/* Key Icon inside input */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c98a4b]/60 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </span>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSuccess}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`w-full py-3 px-6 rounded-full text-white font-medium tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSuccess
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/30'
              : 'bg-gradient-to-r from-[#1b2a4a] via-[#22365e] to-[#1b2a4a] hover:from-[#15223c] hover:to-[#15223c] shadow-navy/20'
              }`}
          >
            {isSuccess ? (
              <span className="flex items-center gap-2">
                <span>Unlocked! Opening</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ✨
                </motion.span>
              </span>
            ) : (
              <span>{screenConfig.buttonText}</span>
            )}
          </motion.button>
        </motion.form>

        {/* Error Feedback */}
        <AnimatePresence>
          {isError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-rose-600 text-sm font-medium mt-3"
            >
              {screenConfig.errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Hint toggle */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-[#1b2a4a]/60 hover:text-[#1b2a4a] underline transition-colors cursor-pointer"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-[#c98a4b] font-medium mt-1 tracking-wide"
              >
                {screenConfig.hintText}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PasswordGate;
