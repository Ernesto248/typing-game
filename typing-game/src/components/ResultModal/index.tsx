import { motion, AnimatePresence } from "framer-motion";

interface ResultModalProps {
  wpm: number;
  errors: number;
  onClose: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ResultModal = ({ wpm, errors, onClose, isOpen, setIsOpen }: ResultModalProps) => {
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50"
        >
          {/* Modal container */}
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-center border border-gray-700"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Your Results</h2>
            <p className="text-lg text-green-400 font-medium">Speed: <span className="text-white">{wpm} WPM</span></p>
            <p className="text-lg text-red-400 font-medium">Errors: <span className="text-white">{errors}</span></p>

            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Next Code
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
