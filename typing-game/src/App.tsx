import { useState, useEffect } from "react";
import useTexts from "./hooks/useTexts";
import TypingFrame from "./components/TypingFrame";
import MainMenu from "./components/MainMenu";
import { CodeType } from "./types/types.d";

const App = () => {
  const [selectedOption, setSelectedOption] = useState<CodeType>(CodeType.JS);
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const { texts } = useTexts(selectedOption);

  const handleSelectedOption = (option: CodeType) => {
    setSelectedOption(option);
    setCurrentTextIndex(0); // Reset the text index when changing option
  };

  // Reset typing state when changing option
  useEffect(() => {
    setIsTypingStarted(false);
  }, [selectedOption]);

  const handleNextText = () => {
    if (currentTextIndex >= texts.length - 1) return;
    setCurrentTextIndex((prev) => prev + 1);
  };

  const handlePreviousText = () => {
    if (currentTextIndex <= 0) return;
    setCurrentTextIndex((prev) => prev - 1);
  };

  const handleIsTypingStarted = () => setIsTypingStarted(true);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="flex items-center text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 p-5 rounded-lg bg-black/80 shadow-2xl">
        {/* Logo */}
        <img src="/logo.svg" alt="DevType Logo" className="w-12 h-12 mr-4" />
        Dev Type
      </h1>
      {!isTypingStarted ? (
        <MainMenu
          onStart={handleIsTypingStarted}
          onSelectedOption={handleSelectedOption}
          selectedOption={selectedOption}
        />
      ) : (
        texts.length > 0 && (
          <TypingFrame
            text={texts[currentTextIndex].codeString}
            description={texts[currentTextIndex].description}
            onNextText={handleNextText}
            onPreviousText={handlePreviousText}
          />
        )
      )}
    </main>
  );
};

export default App;
