import { CodeType } from "../../types/types.d";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
  onSelectedOption: (option: CodeType) => void;
  selectedOption: CodeType;
}

const MainMenu = ({ onStart, onSelectedOption, selectedOption }: Props) => {
  const handleOnButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as CodeType;
    if (!Object.values(CodeType).includes(value)) {
      console.log("mal mi pana");
      return;
    }
    console.log(value);
    onSelectedOption(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-center items-center space-y-5 relative w-full max-w-3xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800"
    >
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded-lg shadow-md transition-all "
      >
        Start Typing
      </motion.button>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-lg font-semibold"
      >
        Select Type of Code :
      </motion.h2>
      <ul className="flex flex-row justify-center items-center gap-5">
        {Object.values(CodeType).map((lang) => (
          <li key={lang}>
            <motion.button
              onClick={handleOnButtonClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              value={lang}
              className={`active:scale-95 text-white py-2 px-4 md:py-3 md:px-5 rounded-lg transition-all duration-300 shadow-md text-xl ${
                selectedOption === lang
                  ? "bg-blue-600 hover:bg-blue-700 font-bold"
                  : "bg-gray-700 hover:bg-gray-600 font-semibold"
              }`}
            >
              {lang}
            </motion.button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MainMenu;
