import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  UploadCloud, 
  RefreshCw, 
  EyeOff, 
  Info, 
  CheckCircle, 
  Plus, 
  FileText, 
  Settings, 
  Terminal, 
  Sparkles,
  Layers,
  ChevronDown,
  X,
  AlertTriangle
} from "lucide-react";

interface AdminPanelProps {
  currentVersion: string;
  currentSize: string;
  onUpdateApp: (newVersion: string, newSize: string) => void;
  onHidePanel: () => void;
}

export default function AdminPanel({ currentVersion, currentSize, onUpdateApp, onHidePanel }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Input states for dynamic update publishing
  const [nextVersion, setNextVersion] = useState(currentVersion);
  const [nextSize, setNextSize] = useState(currentSize);
  const [customFeature, setCustomFeature] = useState("");
  const [releaseNotes, setReleaseNotes] = useState<string[]>([
    "Добавлено аппаратное ускорение рендеринга WebGL",
    "Ядро Sway Core оптимизировано для сетей 3G/2G",
    "Новинка: блокировка canvas-fingerprinting на уровне ядра"
  ]);

  // APK file upload simulation states
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  // System status logs emulation
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Движок Sway Core v1.2.4 инициализирован.",
    "[SECURE] Набор SSL сертификатов успешно верифицирован.",
    "[ROUTING] Ингресс-трафик перенаправлен на порт 3000."
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 5)]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "sway") {
      setIsAuthenticated(true);
      setErrorMessage("");
      addLog("Администратор успешно вошел в систему.");
    } else {
      setErrorMessage("Неверные имя пользователя или пароль! Попробуйте admin / sway");
    }
  };

  // Drag and drop events for uploader
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const simulateUpload = (file: File) => {
    if (!file.name.endsWith(".apk")) {
      setErrorMessage("Вы можете загружать только файлы с расширением .apk!");
      addLog("Ошибка: Попытка загрузки файла неверного формата (" + file.name + ")");
      return;
    }

    setErrorMessage("");
    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile(null);
    addLog(`Начало загрузки файла приложения: ${file.name}`);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + " МБ";
          setUploadedFile({ name: file.name, size: formattedSize });
          setNextSize(formattedSize);
          
          // Auto-suggest next version number increment
          try {
            const parts = currentVersion.split(".");
            if (parts.length === 3) {
              const last = parseInt(parts[2]) + 1;
              setNextVersion(`${parts[0]}.${parts[1]}.${last}`);
            }
          } catch (err) {}

          addLog(`Файл ${file.name} успешно загружен на сервер и верифицирован.`);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  const handleAddFeature = () => {
    if (customFeature.trim()) {
      setReleaseNotes(prev => [...prev, customFeature.trim()]);
      addLog(`Добавлен пункт примечания: "${customFeature.trim()}"`);
      setCustomFeature("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    const item = releaseNotes[idx];
    setReleaseNotes(prev => prev.filter((_, i) => i !== idx));
    addLog(`Удален пункт примечания: "${item}"`);
  };

  const publishRelease = () => {
    onUpdateApp(nextVersion, nextSize);
    addLog(`Опубликован релиз версии ${nextVersion} размером ${nextSize}.`);
    setSuccessToast(`Сборка Sway v${nextVersion} (${nextSize}) успешно опубликована! Веб-сайт мгновенно обновил все ссылки.`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  return (
    <div className="w-full bg-[#0d0f17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative text-left">
      {/* Decorative circuitry background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-501 bg-indigo-950 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm tracking-wide">SWAY CORE // ПАНЕЛЬ АДМИНИСТРАТОРА</h3>
            <span className="text-[10px] text-slate-500 font-mono">Панель управления сборками приложения</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <span className="hidden sm:inline-flex items-center bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded text-[10px] font-mono border border-emerald-900">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              СЕССИЯ АКТИВНА
            </span>
          )}
          <button
            onClick={onHidePanel}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl text-xs transition duration-200 cursor-pointer border border-slate-800"
            title="Скрыть панель управления"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Скрыть</span>
          </button>
        </div>
      </div>

      {!isAuthenticated ? (
        /* Login Screen with helpful instructions text on how to enter */
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-indigo-950/30 border border-indigo-900/40 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-indigo-200 font-extrabold text-xs uppercase tracking-wider">Инструкции для входа</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Для входа в панель администратора Sway Browser используйте демонстрационные реквизиты ниже. Эта панель предназначена для симуляции загрузки сборок (.apk), выпуска обновлений и динамического управления версиями.
              </p>
              <div className="flex flex-wrap gap-4 pt-1.5 text-[11px] font-mono">
                <span className="text-slate-300">Логин: <strong className="text-indigo-400">admin</strong></span>
                <span className="text-slate-300">Пароль: <strong className="text-indigo-400">sway</strong></span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="max-w-md mx-auto bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <div className="flex flex-col items-center justify-center space-y-1 pb-2">
              <Lock className="w-8 h-8 text-indigo-500 mb-1" />
              <h4 className="font-extrabold text-white text-sm">Авторизация в Sway Engine</h4>
              <p className="text-[10px] text-slate-500">Доступ только для уполномоченных архитекторов</p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-950/50 border border-rose-900/60 rounded-xl flex items-center gap-2.5 text-xs text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">Пользователь:</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Имя пользователя"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition font-mono"
                required
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">Пароль авторизации:</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition font-mono"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-750 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition cursor-pointer"
            >
              Подключить сессию
            </button>
          </form>

          <div className="text-center text-[10px] text-slate-550 border-t border-slate-900 pt-4 font-mono">
            Авторизация предоставляет полный доступ к конфигурационным файлам сборки.
          </div>
        </div>
      ) : (
        /* Authenticated Admin Control Area */
        <div className="p-6 space-y-6">
          <AnimatePresence>
            {successToast && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl flex items-center gap-3 text-xs w-full block"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="flex-grow font-medium text-left">{successToast}</div>
                <button 
                  onClick={() => setSuccessToast(null)} 
                  className="text-emerald-400 hover:text-white transition ml-auto cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column A: APK Upload & Building (1/2 width or 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-indigo-400" />
                Загрузка официального APK-файла
              </h4>
              <p className="text-slate-450 text-[11px] leading-relaxed font-light">
                Перетащите новую мобильную сборку APK-файла браузера Sway или кликните по форме для симуляции проверки цифровой подписи и укомплектования дистрибутива.
              </p>
            </div>

            {/* Custom drag & drop area */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition duration-300 relative ${
                dragActive 
                  ? "border-indigo-500 bg-indigo-950/20" 
                  : "border-slate-800 bg-slate-950/30 hover:border-slate-700 hover:bg-slate-950/40"
              }`}
            >
              <input
                id="file-upload-input"
                type="file"
                accept=".apk"
                onChange={handleFileChange}
                className="hidden"
              />

              {isUploading ? (
                <div className="space-y-3 py-4 flex flex-col items-center">
                  <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                  <div className="space-y-1.5 w-full max-w-xs">
                    <span className="text-xs font-mono font-bold text-slate-350 block">Загрузка APK на сервер... {uploadProgress}%</span>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-3 py-2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-emerald-400 font-mono text-xs font-bold block">{uploadedFile.name}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">Размер определен: {uploadedFile.size} // Целостность подтверждена</span>
                  </div>
                  <label 
                    htmlFor="file-upload-input" 
                    className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-semibold hover:bg-slate-800 cursor-pointer mt-2"
                  >
                    Заменить файл сборки
                  </label>
                </div>
              ) : (
                <label htmlFor="file-upload-input" className="cursor-pointer space-y-3 block py-4 select-none">
                  <UploadCloud className="w-10 h-10 text-slate-550 mx-auto group-hover:text-indigo-400 transition" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-200 block">Перетащите APK или выберите на диске</span>
                    <span className="text-[10px] text-slate-500 block">Максимальный размер дистрибутива: 100 МБ. Формат: .apk</span>
                  </div>
                </label>
              )}
            </div>

            {/* System Status logs monitor console container */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Консоль отчетов (Sway Engine Output):</span>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 font-mono text-[9px] text-slate-400 space-y-2 h-[120px] overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-1.5">
                    <span className="text-indigo-500 flex-shrink-0">&gt;&gt;</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Release Notes & Version Updates (6 cols) */}
          <div className="lg:col-span-6 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-900 lg:pl-6">
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-indigo-405 text-indigo-400" />
                Параметры выпуска программного обновления
              </h4>
              <p className="text-slate-450 text-[11px] leading-relaxed font-light">
                При ручной публикации данного обновления, новая информация о сборке (номер новой версии, объем APK файла) немедленно отобразится во всех виджетах скачивания на мобильном сайте.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-bold block">Версия релиза (v):</label>
                <input
                  type="text"
                  value={nextVersion}
                  onChange={e => setNextVersion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="Например, 1.3.0"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-bold block">Размер дистрибутива:</label>
                <input
                  type="text"
                  value={nextSize}
                  onChange={e => setNextSize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="Например, 14.8 MB"
                />
              </div>
            </div>

            {/* Simulated release notes management block */}
            <div className="space-y-2.5">
              <label className="text-slate-400 text-xs font-bold block">Что нового в этой версии (Release Notes):</label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeature}
                  onChange={e => setCustomFeature(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="Добавить улучшение..."
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAddFeature(); } }}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2.5 text-xs transition cursor-pointer flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* List of features added */}
              <div className="space-y-1.5 max-h-[110px] overflow-y-auto">
                {releaseNotes.map((note, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950/80 p-2 rounded-lg border border-slate-900 text-[10px] text-slate-300">
                    <span className="truncate pr-2">• {note}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(i)}
                      className="text-slate-500 hover:text-rose-500 p-0.5 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={publishRelease}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-550 hover:from-indigo-700 hover:to-indigo-650 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-650/10 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              Опубликовать сборку и обновить веб-сайт
            </button>
          </div>

        </div>
        </div>
      )}
    </div>
  );
}
