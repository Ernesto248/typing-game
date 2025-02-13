import { CodeType } from "../../types/types.d";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

const MainMenu = ({ onStart }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-center items-center space-y-10 relative w-full max-w-3xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800"
    >
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded-lg shadow-md transition-all "
      >
        Start Typing
      </motion.button>
      <ul className="flex flex-row justify-center items-center gap-5">
        {Object.values(CodeType).map((value) => (
          <li key={value}>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MainMenu;
