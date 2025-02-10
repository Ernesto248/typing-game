import { useEffect, useState } from "react";

interface Props {
  text: string;
  onNextText: () => void;
}

const TypingFrame = ({ text, onNextText }: Props) => {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === text[currentIndex]) {
          setUserInput((prev) => prev + event.key);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setErrors((prev) => prev + 1);
        }
      }

      if (event.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
      <h2 className="text-xl font-semibold mb-4">Type this function:</h2>
      <p className="text-lg font-mono bg-gray-700 p-3 rounded-md text-left">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`${
              index < userInput.length
                ? userInput[index] === text[index]
                  ? "text-green-400" // Correcto
                  : "text-red-500" // Incorrecto
                : "text-gray-400" // Aún no escrito
            }`}
          >
            {char}
          </span>
        ))}
      </p>
      <p className="mt-4 text-red-400 font-semibold">Errors: {errors}</p>
      <button
        onClick={onNextText}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
      >
        Next Code
      </button>
    </div>
  );
};

export default TypingFrame;
