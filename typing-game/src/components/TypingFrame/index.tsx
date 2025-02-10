import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  onNextText: () => void;
}

const TypingFrame = ({ text, onNextText }: Props) => {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [shake, setShake] = useState(false); // Estado para efecto de vibración

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        if (event.key === text[currentIndex]) {
          setUserInput((prev) => prev + event.key);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setErrors((prev) => prev + 1);
          setShake(true); // Activar vibración al cometer un error
          setTimeout(() => setShake(false), 100); // Detener vibración después de 100ms
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
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Fade-in al cargar
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl text-center"
    >
      <h2 className="text-xl font-semibold mb-4">Type this function:</h2>
      <motion.p
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }} // Efecto de vibración si hay error
        transition={{ duration: 0.2 }}
        className="text-lg font-mono bg-gray-700 p-3 rounded-md text-left leading-relaxed"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: index < userInput.length ? [5, 0] : 0 }} // Animación de entrada suave
            transition={{ duration: 0.1, delay: index * 0.02 }}
            className={`transition-colors duration-200 ${
              index < userInput.length
                ? userInput[index] === text[index]
                  ? "text-green-400" // Correcto
                  : "text-red-500" // Incorrecto
                : index === currentIndex
                ? "text-yellow-400 scale-125" // Letra actual resaltada
                : "text-gray-400" // Aún no escrito
            }`}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
      <p className="mt-4 text-red-400 font-semibold">Errors: {errors}</p>
      <motion.button
        onClick={onNextText}
        whileHover={{ scale: 1.1 }} // Efecto de rebote al pasar el mouse
        whileTap={{ scale: 0.9 }} // Pequeño efecto al hacer clic
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
      >
        Next Code
      </motion.button>
    </motion.div>
  );
};

export default TypingFrame;
