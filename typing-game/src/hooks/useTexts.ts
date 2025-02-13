import { useEffect, useState } from "react";
import { CodeFunctionText } from "../types/types.d";

// Función para mezclar un array (algoritmo Fisher-Yates)
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const useTexts = () => {
  const [texts, setTexts] = useState<Array<CodeFunctionText>>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [shuffledTextsOrder, setShuffledTextsOrder] = useState<number[]>([]);

  const fetchTexts = async () => {
    try {
      const response = await fetch("json/js.json");
      if (!response.ok) throw new Error("Failed to fetch texts");

      const data: Array<CodeFunctionText> = await response.json();
      // Mezclar los textos antes de guardarlos en el estado
      const shuffledTexts = shuffleArray(data);
      const order = Array.from(Array(shuffledTexts.length).keys());
      setShuffledTextsOrder(shuffleArray(order));
      setTexts(shuffledTexts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const nextText = () => {
    setCurrentTextIndex(
      (prevIndex) => (prevIndex + 1) % shuffledTextsOrder.length
    );
  };

  const previousText = () => {
    setCurrentTextIndex(
      (prevIndex) =>
        (prevIndex - 1 + shuffledTextsOrder.length) % shuffledTextsOrder.length
    );
  };

  const currentText = texts[shuffledTextsOrder[currentTextIndex]];

  return {
    texts,
    currentText,
    nextText,
    previousText,
    shuffledTextsOrder,
  };
};

export default useTexts;
