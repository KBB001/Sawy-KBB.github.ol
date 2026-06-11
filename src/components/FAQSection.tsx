import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "../data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-8">
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-600">
          <HelpCircle className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold uppercase tracking-wider">Ответы на вопросы</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Часто задаваемые вопросы
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Все, что вы хотели знать об установке, безопасности и возможностях Sway Browser на мобильных устройствах Android.
        </p>
      </div>

      {/* Accordion list */}
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen 
                  ? "bg-white border-indigo-200 shadow-xl shadow-indigo-100/30" 
                  : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/30"
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 font-semibold text-slate-800 cursor-pointer group"
              >
                <span className={`transition-colors duration-300 ${isOpen ? "text-indigo-600 font-extrabold" : "group-hover:text-indigo-650"}`}>
                  {faq.question}
                </span>
                <span className={`p-1.5 rounded-lg transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-indigo-100 text-indigo-700" : "bg-slate-200/50 text-slate-400 group-hover:text-slate-600"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
