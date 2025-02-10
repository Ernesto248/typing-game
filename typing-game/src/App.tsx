import { useState } from "react";
import useTexts from "./hooks/useTexts";
import TypingFrame from "./components/TypingFrame";

const App = () => {
  const { texts } = useTexts();
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  const handleNextText = () => {
    if (currentTextIndex >= texts.length - 1) return;
    setCurrentTextIndex((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Typing Game</h1>
      {texts.length > 0 && (
        <TypingFrame
          text={texts[currentTextIndex].codeString}
          description={texts[currentTextIndex].description}
          onNextText={handleNextText}
        />
      )}
    </main>
  );
};

export default App;
