import { useEffect, useState } from "react";
import { CodeFunctionText } from "../types/types.d";

const useTexts = () => {
  const [texts, setTexts] = useState<Array<CodeFunctionText>>([]);

  const fetchTexts = async () => {
    try {
      const response = await fetch("json/texts.json");
      if (!response.ok) throw new Error("Failed to fetch texts");

      const data: Array<CodeFunctionText> = await response.json();
      setTexts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  return { texts };
};

export default useTexts;
