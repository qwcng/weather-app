import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";

export function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-10 w-[90vw] left-0 right-0 mx-auto z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white min-w-[280px]"        >
            {toast.type === "loading" ? (
                <Loader2 className="w-5 h-5 text-sky-400 animate-spin shrink-0" />
            ) : toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}

            <span className="text-sm font-medium tracking-wide flex-1">
                {toast.message}
            </span>

            <button
                onClick={onClose}
                className="p-1 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
            </motion.div>
      )}
    </AnimatePresence>
  );
}