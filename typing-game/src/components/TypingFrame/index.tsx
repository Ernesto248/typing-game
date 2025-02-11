import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTyping } from "../../hooks/useTyping";
import TypingText from "../TypingText";
import ResultModal from "../ResultModal";

interface Props {
  text: string;
  description: string;
  onNextText: () => void;
}

const TypingFrame = ({ text, onNextText, description }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userInput, currentIndex, errors, shake, isCompleted, wpm, reset } =
    useTyping(text, isModalOpen);

  useEffect(() => {
    if (isCompleted) {
      setIsModalOpen(true);
    }
  }, [isCompleted]);

  const handleNextText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    reset();
    onNextText();
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
    reset();
    onNextText();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-3xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800"
    >
      {/* Descripción */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Description:</h2>
        <p className="text-gray-400">{description}</p>
      </motion.div>

      {/* Texto para escribir */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative bg-gray-800 p-4 rounded-lg shadow-lg"
      >
        <TypingText
          text={text}
          userInput={userInput}
          currentIndex={currentIndex}
          shake={shake}
        />
      </motion.div>

      {/* Progreso y estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 flex justify-between items-center"
      >
        <div className="space-y-2">
          <p className="text-gray-400 text-lg">
            Progress:{" "}
            <span className="text-blue-400 font-semibold">
              {Math.round((currentIndex / text.length) * 100)}%
            </span>
          </p>
          <p className="text-gray-400 text-lg">
            Speed: <span className="text-green-400 font-semibold">{wpm} WPM</span>
          </p>
          <p className="text-gray-400 text-lg">
            Errors: <span className="text-red-400 font-semibold">{errors}</span>
          </p>
        </div>

        {/* Botón Next Code */}
        <motion.button
          onClick={handleNextText}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Next Code
        </motion.button>
      </motion.div>

      {/* Modal de resultados */}
      <ResultModal
        errors={errors}
        wpm={wpm}
        onClose={handleOnClose}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </motion.div>
  );
};

export default TypingFrame;
