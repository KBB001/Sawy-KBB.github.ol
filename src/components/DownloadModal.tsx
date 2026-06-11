import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Download, ShieldCheck, Smartphone, CheckCircle } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  version?: string;
  fileSize?: string;
}

export default function DownloadModal({ isOpen, onClose, version = "1.2.4", fileSize = "14.5 МБ" }: DownloadModalProps) {
  const [downloadStep, setDownloadStep] = useState<"idle" | "downloading" | "success">("idle");
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartDownload = () => {
    setDownloadStep("downloading");
    setProgress(0);
    
    // Simulate high-speed download process of the APK
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStep("success");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop blur layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Card Layout */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-slate-400 overflow-hidden"
      >
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-150 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-650 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-650/20">
              S
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm leading-tight">Загрузка Sway Browser</h4>
              <span className="text-[11px] text-indigo-600 font-bold font-mono">v{version} (Android Release)</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal content state engine */}
        <div className="relative z-10 space-y-5">
          {downloadStep === "idle" && (
            <>
              <div className="flex flex-col items-center text-center space-y-3 py-2">
                <Download className="w-12 h-12 text-indigo-600 animate-bounce" />
                <h3 className="text-lg font-extrabold text-slate-900">Скачать официальный APK-файл</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Размер файла: <span className="font-bold text-slate-800">{fileSize}</span>. Подходит для всех версий Android 8.0 и выше.
                </p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleStartDownload}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs shadow-lg shadow-indigo-600/10 transition duration-300 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Download className="w-4.5 h-4.5 stroke-[2.5px]" />
                Начать прямую загрузку APK
              </button>

              {/* QR Code and Desktop indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl items-center">
                <div className="flex flex-col items-center justify-center">
                  {/* Clean SVG Vector QR Code */}
                  <svg className="w-24 h-24 bg-white p-1 rounded-lg shadow-sm border border-slate-100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="5" y="5" width="25" height="25" fill="#4f46e5" />
                    <rect x="10" y="10" width="15" height="15" fill="white" />
                    <rect x="13" y="13" width="9" height="9" fill="#4f46e5" />
                    <rect x="70" y="5" width="25" height="25" fill="#4f46e5" />
                    <rect x="75" y="10" width="15" height="15" fill="white" />
                    <rect x="78" y="13" width="9" height="9" fill="#4f46e5" />
                    <rect x="5" y="70" width="25" height="25" fill="#4f46e5" />
                    <rect x="10" y="75" width="15" height="15" fill="white" />
                    <rect x="13" y="78" width="9" height="9" fill="#4f46e5" />
                    <rect x="42" y="8" width="4" height="4" fill="#4f46e5" />
                    <rect x="50" y="15" width="4" height="4" fill="#312e81" />
                    <rect x="58" y="5" width="4" height="4" fill="#4f46e5" />
                    <rect x="80" y="45" width="4" height="4" fill="#4f46e5" />
                    <rect x="88" y="48" width="4" height="4" fill="#4f46e5" />
                    <rect x="45" y="80" width="4" height="4" fill="#312e81" />
                    <rect x="40" y="40" width="6" height="6" fill="#6366f1" />
                    <rect x="56" y="56" width="6" height="6" fill="#4338ca" />
                    <rect x="52" y="40" width="4" height="4" fill="#312e81" />
                    <rect x="35" y="50" width="4" height="4" fill="#4f46e5" />
                    <rect x="60" y="75" width="8" height="8" fill="#4f46e5" />
                    <rect x="80" y="80" width="6" height="6" fill="#4f46e5" />
                  </svg>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">QR-КОД ДЛЯ ТЕЛЕФОНА</span>
                </div>
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <span>Скачайте прямо на телефон</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Наведите камеру смартфона на QR-код для моментального открытия ссылки и загрузки файла на Андроид.
                  </p>
                </div>
              </div>

              {/* Safety warning */}
              <div className="flex gap-2.5 bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl text-left">
                <ShieldCheck className="w-5 h-5 text-indigo-650 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-indigo-950 block">Проверено на безопасность</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Цифровая подпись совпадает. Файл чист от вредоносных кодов и рекламы. Подтверждено VirusTotal.
                  </span>
                </div>
              </div>
            </>
          )}

          {downloadStep === "downloading" && (
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Spinning loader backing */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-indigo-600/40 animate-spin"></div>
                <Download className="w-6 h-6 text-indigo-600 animate-pulse" />
              </div>
              <div className="space-y-1 w-full max-w-xs animate-pulse-slow">
                <h4 className="font-extrabold text-slate-900 text-sm">Скачивание файла...</h4>
                <span className="text-[11px] text-slate-500 font-mono block">Файл: sway-browser.v{version}.apk ({progress}%)</span>
                
                {/* Progress rendering bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {downloadStep === "success" && (
            <div className="space-y-5">
              <div className="pt-2 flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Файл успешно загружен!</h3>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Если загрузка не началась автоматически, <span className="text-indigo-600 cursor-pointer font-bold decoration-dotted underline" onClick={() => handleStartDownload()}>кликните сюда для повторной попытки</span>.
                </p>
              </div>

              {/* Instructions on installation */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 text-left">
                <span className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-2 block">
                  Как установить APK файл на вашем Android?
                </span>
                
                <div className="space-y-3 pt-1">
                  {/* Step 1 */}
                  <div className="flex gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700 flex-shrink-0">
                      1
                    </span>
                    <p className="text-slate-655 text-slate-600 pt-0.5 leading-relaxed">
                      Откройте скачанный файл <span className="font-mono text-[11px] text-slate-800">sway-browser.v{version}.apk</span> в шторке уведомлений или через файловый менеджер смартфона.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700 flex-shrink-0">
                      2
                    </span>
                    <p className="text-slate-600 pt-0.5 leading-relaxed">
                      Если система выдаст предупреждение о безопасности, нажмите <span className="font-bold text-slate-800">Настройки</span> и активируйте переключатель <span className="text-indigo-600 font-semibold">Разрешить установку из этого источника</span>.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700 flex-shrink-0">
                      3
                    </span>
                    <p className="text-slate-600 pt-0.5 leading-relaxed">
                      Вернитесь назад и нажмите <span className="font-bold text-slate-850 text-slate-800">Установить</span>. После установки вы сможете сразу запустить сверхбыстрый Sway!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setDownloadStep("idle")}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition cursor-pointer"
                >
                  Скачать заново
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 hover:shadow-lg transition cursor-pointer"
                >
                  Я установил приложение
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
