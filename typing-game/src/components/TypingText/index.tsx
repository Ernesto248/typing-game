import React from "react";
import { motion } from "framer-motion";
import { CornerDownLeft, Space } from "lucide-react";

interface TypingTextProps {
  text: string;
  userInput: string;
  currentIndex: number;
  shake: boolean;
}

function TypingText({ text, userInput, currentIndex, shake }: TypingTextProps) {
  const lines = text.split("\n");

  // Función auxiliar para calcular el índice global
  const computeGlobalIndex = (lineIndex: number, charIndex: number): number =>
    lines.slice(0, lineIndex).reduce((acc, cur) => acc + cur.length + 1, 0) +
    charIndex;

  return (
    <motion.p
      className="text-lg font-mono bg-gray-700 p-3 rounded-md text-left leading-relaxed whitespace-pre-wrap"
      animate={shake ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }} // Animación de shake
      transition={{ duration: 0.2 }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            const globalIndex = computeGlobalIndex(lineIndex, charIndex);
            let displayChar: string | React.JSX.Element = char;

            if (char === " ") {
              displayChar = (
                <motion.span
                  animate={
                    globalIndex === currentIndex
                      ? { scale: 1.2, rotate: 5, color: "#1D4ED8" }
                      : { scale: 1, rotate: 0, color: "#60A5FA" }
                  }
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  <Space className="w-5 h-5" />
                </motion.span>
              );
            }

            return (
              <motion.span
                key={globalIndex}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: globalIndex < userInput.length ? [5, 0] : 0,
                }}
                transition={{ duration: 0.1, delay: globalIndex * 0.02 }}
                className={`transition-colors duration-200 ${
                  globalIndex < userInput.length
                    ? userInput[globalIndex] === text[globalIndex]
                      ? "text-green-400"
                      : "text-red-500"
                    : globalIndex === currentIndex
                    ? "text-yellow-400 scale-125"
                    : "text-gray-400"
                }`}
              >
                {displayChar}
              </motion.span>
            );
          })}
          {lineIndex < lines.length - 1 && (
            <motion.span
              animate={
                text[currentIndex] === "\n"
                  ? { scale: 1.2, rotate: 15, color: "#D97706" }
                  : { scale: 1, rotate: 0, color: "#FACC15" }
              }
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <CornerDownLeft className="w-5 h-5" />
            </motion.span>
          )}
        </span>
      ))}
    </motion.p>
  );
}

export default TypingText;
