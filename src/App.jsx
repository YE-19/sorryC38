import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import clientConfig from './data/clientConfig.js';
import PasswordGate from './components/PasswordGate.jsx';
import ForgivePage from './components/ForgivePage.jsx';
import EnvelopeCover from './components/EnvelopeCover.jsx';
import EnvelopeOpen from './components/EnvelopeOpen.jsx';
import LetterPage from './components/LetterPage.jsx';
import VideoPage from './components/VideoPage.jsx';
import PhotoCollage from './components/PhotoCollage.jsx';
import FinalPage from './components/FinalPage.jsx';

// Ordered list of steps
const STEPS = ['password', 'cover', 'envelopeOpen', 'forgive', 'letter', 'video', 'collage', 'finale'];

function App() {
  const [stepIndex, setStepIndex] = useState(0);

  // دوال التنقل بين الصفحات
  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goToEnvelope = () => {
    const coverIdx = STEPS.indexOf('cover');
    setStepIndex(coverIdx >= 0 ? coverIdx : 0);
  };

  const currentStep = STEPS[stepIndex];

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'password' && (
          <PasswordGate key="password" config={clientConfig} onUnlock={goNext} />
        )}

        {currentStep === 'cover' && (
          <EnvelopeCover key="cover" config={clientConfig} onOpen={goNext} />
        )}
        
        {currentStep === 'envelopeOpen' && (
          <EnvelopeOpen key="envelopeOpen" config={clientConfig} onContinue={goNext} />
        )}

        {currentStep === 'forgive' && (
          <ForgivePage key="forgive" config={clientConfig} onForgive={goNext} />
        )}
        
        {/* تمرير دالة onBack للرسالة */}
        {currentStep === 'letter' && (
          <LetterPage key="letter" config={clientConfig} onNext={goNext} onBack={goBack} />
        )}
        
        {/* تمرير دالة onBack للفيديو */}
        {currentStep === 'video' && (
          <VideoPage key="video" config={clientConfig} onNext={goNext} onBack={goBack} />
        )}
        
        {/* تمرير دالة onBack للألبوم (القلب) */}
        {currentStep === 'collage' && (
          <PhotoCollage key="collage" config={clientConfig} onNext={goNext} onBack={goBack} />
        )}
        
        {currentStep === 'finale' && (
          <FinalPage key="finale" config={clientConfig} onRestart={goToEnvelope} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;