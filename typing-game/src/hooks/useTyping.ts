import { useEffect, useState } from "react";

export const useTyping = (text: string) => {
  const [userInput, setUserInput] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);

  const reset = () => {
    setUserInput("");
    setCurrentIndex(0);
    setErrors(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, currentIndex]);

  return { userInput, currentIndex, errors, shake, reset };
};
