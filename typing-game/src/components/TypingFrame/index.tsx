// TypingFrame.tsx
import React from "react";
import { motion } from "framer-motion";
import { useTyping } from "../../hooks/useTyping";
import TypingText from "../TypingText";

interface Props {
  text: string;
  description: string;
  onNextText: () => void;
}

const TypingFrame = ({ text, onNextText, description }: Props) => {
  const { userInput, currentIndex, errors, shake, reset } = useTyping(text);

  const handleNextText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    reset();
    onNextText();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }} // Inicialmente fuera de vista (opaco y desplazado)
        animate={{ opacity: 1, y: 0 }} // Después, se muestra completamente (opaco y centrado)
        transition={{ duration: 0.5 }} // Duración de la animación
        className="text-xl font-semibold mb-4"
      >
        Type this function:
      </motion.h2>
      <TypingText
        text={text}
        userInput={userInput}
        currentIndex={currentIndex}
        shake={shake}
      />
      <p className="mt-4 text-red-400 font-semibold">Errors: {errors}</p>
      <motion.p>{description}</motion.p>
      <motion.button
        onClick={handleNextText}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
      >
        Next Code
      </motion.button>
    </motion.div>
  );
};

export default TypingFrame;
