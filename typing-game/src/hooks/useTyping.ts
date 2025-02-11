import { useEffect, useState } from "react";

// const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout | null;
//   return (...args: any[]) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// };

export const useTyping = (text: string, isModalOpen: boolean) => {
  const [userInput, setUserInput] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);

  const reset = () => {
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
    setIsCompleted(false);
    setStartTime(null);
    setWpm(0);
  };

  // Efecto para manejar las pulsaciones del teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isCompleted || isModalOpen) return;
      if (!startTime) setStartTime(Date.now());

      const expectedChar = text[currentIndex];

      if (event.key === "Enter" && expectedChar === "\n") {
        setUserInput((prev) => prev + "\n");
        setCurrentIndex((prev) => prev + 1);
      } else if (event.key === " " && expectedChar === " ") {
        setUserInput((prev) => prev + " ");
        setCurrentIndex((prev) => prev + 1);
      } else if (
        event.key.length === 1 &&
        !["Shift", "Control", "Alt", "Meta"].includes(event.key)
      ) {
        if (event.key === expectedChar) {
          setUserInput((prev) => prev + event.key);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setErrors((prev) => prev + 1);
          setShake(true);
          setTimeout(() => setShake(false), 100);
        }
      } else if (event.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }

      // Si se llega al último caracter, marcar como completado
      if (currentIndex + 1 === text.length) {
        setIsCompleted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, currentIndex, startTime, isCompleted, isModalOpen]);

  // Efecto para actualizar el WPM cada segundo
  useEffect(() => {
    if (!startTime || isCompleted || isModalOpen) return;

    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 60000; // Tiempo en minutos
      // Se asume que cada 5 caracteres equivale a una palabra
      const wordsTyped = userInput.length / 5;
      if (elapsedTime > 0) {
        setWpm(Math.round(wordsTyped / elapsedTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, userInput, isCompleted, isModalOpen]);

  return { userInput, currentIndex, errors, shake, isCompleted, wpm, reset };
};
