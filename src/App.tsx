import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  ShieldAlert, 
  Fingerprint, 
  Cookie, 
  BatteryCharging, 
  EyeOff,
  Shield,
  Download,
  Award,
  Sparkles,
  Lock,
  Compass,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Info,
  Menu,
  X,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { FEATURES } from "./data";
import PhoneMockup from "./components/PhoneMockup";
import ComparisonTable from "./components/ComparisonTable";
import FAQSection from "./components/FAQSection";
import DownloadModal from "./components/DownloadModal";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core administrative states synced with local storage persistence
  const [appVersion, setAppVersion] = useState(() => {
    return localStorage.getItem("sway_app_version") || "1.2.4";
  });
  const [appSize, setAppSize] = useState(() => {
    return localStorage.getItem("sway_app_size") || "14.5 МБ";
  });
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return localStorage.getItem("sway_admin_open") === "true";
  });
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    localStorage.setItem("sway_admin_open", isAdminOpen ? "true" : "false");
  }, [isAdminOpen]);

  // Hook up state-level updates to reflect immediate compilation on the site
  const handleUpdateApp = (newVersion: string, newSize: string) => {
    setAppVersion(newVersion);
    setAppSize(newSize);
    localStorage.setItem("sway_app_version", newVersion);
    localStorage.setItem("sway_app_size", newSize);
  };

  // Easter egg handler for entering the administration panel secretly
  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 5) {
      setLogoClicks(0);
      setIsAdminOpen(true);
      setTimeout(() => {
        document.getElementById("admin-portal-anchor")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  // Universal hotkey detection [Ctrl + Shift + A] to toggle panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
        setTimeout(() => {
          document.getElementById("admin-portal-anchor")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Map icon strings to active Lucide vector elements
  function renderFeatureIcon(iconName: string) {
    switch (iconName) {
      case "Zap":
        return (
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200/60">
            <Zap className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "ShieldAlert":
        return (
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-200/60">
            <ShieldAlert className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "Fingerprint":
        return (
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200/60">
            <Fingerprint className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "Cookie":
        return (
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/60">
            <Cookie className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "BatteryCharging":
        return (
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200/60">
            <BatteryCharging className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "EyeOff":
        return (
          <div className="p-3 bg-violet-50 text-violet-650 text-violet-600 rounded-2xl border border-violet-200/60">
            <EyeOff className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case "Compass":
        return (
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl border border-teal-200/60">
            <Compass className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      default:
        return (
          <div className="p-3 bg-slate-50 text-slate-600 rounded-2xl border border-slate-200/60">
            <Shield className="w-6 h-6 stroke-[2px]" />
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] gradient-bg selection:bg-indigo-100 selection:text-indigo-900 antialiased font-sans relative">
      
      {/* Absolute Ambient Background Lights to capture a premium, elite feel */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-300/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "4s" }}></div>

      {/* Modern Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F9FAFB]/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo with indigo sparkler fonting */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group cursor-pointer select-none"
            title="Sway Browser (Кликните 5 раз для входа в панель администратора)"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-605/10 group-hover:scale-105 transition-transform duration-300">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-905 text-slate-900 tracking-tight text-lg leading-none">Sway Browser</span>
              <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Android Edition</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="text-slate-600 hover:text-indigo-600 transition duration-200">Преимущества</a>
            <a href="#simulator" className="text-slate-600 hover:text-indigo-600 transition duration-200">Демо-симулятор</a>
            <a href="#comparison" className="text-slate-600 hover:text-indigo-600 transition duration-200">Сравнение</a>
            <a href="#faq" className="text-slate-600 hover:text-indigo-600 transition duration-200">FAQ</a>
          </nav>

          {/* Download button Header */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-xs text-slate-400 font-mono">v{appVersion} (APK)</span>
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition duration-300 shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-97 cursor-pointer"
            >
              Скачать Бесплатно
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-indigo-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile slide-down drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-205/85 bg-white px-6 py-4 space-y-4 shadow-lg"
            >
              <nav className="flex flex-col space-y-3.5 text-sm font-medium text-slate-600">
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-indigo-600"
                >
                  Преимущества
                </a>
                <a 
                  href="#simulator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-indigo-605 hover:text-indigo-600"
                >
                  Демо-симулятор
                </a>
                <a 
                  href="#comparison" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-indigo-600"
                >
                  Сравнение
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-indigo-600"
                >
                  FAQ
                </a>
              </nav>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Версия для Android OS 8.0+</span>
                  <span className="font-mono">v{appVersion}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsDownloadOpen(true);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs text-center cursor-pointer"
                >
                  Скачать APK файл
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 text-center space-y-8 max-w-4xl mx-auto relative">
          
          {/* Accent lighting pill */}
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100/80 px-4 py-1.5 rounded-full backdrop-blur-md animate-float">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
              Мобильная версия для Android
            </span>
          </div>

          {/* Catchphrase Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
            Забудьте о рекламе.<br />
            Встречайте <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Sway Browser</span>
          </h1>

          {/* Subtitle statement */}
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Мобильный браузер нового поколения, созданный для тотальной конфиденциальности и взрывной скорости интернета на вашем Android. Нативный AdBlock, защита от слежки и экономия заряда батареи.
          </p>

          {/* CTAs row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto bg-indigo-600 text-white font-bold text-sm px-8 py-4 rounded-2xl tracking-wide hover:bg-indigo-700 hover:shadow-[0_10px_30px_rgba(79,70,229,0.2)] transition-all duration-300 active:scale-97 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5px]" />
              Скачать APK бесплатно
            </button>
            <div className="w-full sm:w-auto px-6 py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs text-slate-500 shadow-xs">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span>Google Play: <span className="font-semibold text-slate-700">На проверке ⏳</span></span>
            </div>
          </div>

          {/* Mini benefits pills row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-left max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200/85 p-3.5 rounded-2xl flex items-start gap-3 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-300">
              <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">На 100% бесплатно</span>
                <span className="text-[10px] text-slate-500">Без скрытых подписок</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/85 p-3.5 rounded-2xl flex items-start gap-3 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-300">
              <Lock className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Без сбора логов</span>
                <span className="text-[10px] text-slate-500">Запросы шифруются</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/85 p-3.5 rounded-2xl flex items-start gap-3 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-300">
              <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Экономия трафика</span>
                <span className="text-[10px] text-slate-500">Сжатие ресурсов</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/85 p-3.5 rounded-2xl flex items-start gap-3 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-300">
              <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Размер 14.5 МБ</span>
                <span className="text-[10px] text-slate-500">Ультралегкий вес</span>
              </div>
            </div>
          </div>

        </section>

        {/* DEMO SITE INTEGRATION SHIELD SIMULATOR */}
        <section id="simulator" className="py-16 border-t border-slate-200/80 scroll-mt-12">
          <PhoneMockup />
        </section>

        {/* BENTO GRID KEY BROWSER ADVANTAGES */}
        <section id="features" className="py-20 border-t border-slate-200/80 scroll-mt-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-600">
              <Award className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">Максимальный Стек Безопасности</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Броня для вашего веб-серфинга
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sway Browser оснащен встроенными решениями защиты личных данных, которые обычно требуют ручной установки десятков тяжелых плагинов в Chrome или Firefox.
            </p>
          </div>

          {/* Grid Layout of key features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => (
              <div 
                key={feat.id}
                className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-300/80 p-6 rounded-2xl space-y-4 hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Background glow overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="flex items-center justify-between">
                  {renderFeatureIcon(feat.iconName)}
                  {feat.badge && (
                    <span className="text-[9px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{feat.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MASCOT / LOGO STORY SECTION */}
        <section className="py-20 border-t border-slate-200/80 scroll-mt-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto bg-amber-50/50 border border-amber-200/60 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 bg-white border border-slate-200 shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 select-none">
                <span className="text-[10px] uppercase tracking-widest bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Официальный Маскот</span>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute w-1.5 h-20 bg-amber-800 rounded-full rotate-45 transform origin-center"></div>
                  
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -top-1 left-2 w-9 h-9 bg-amber-400 border-[3px] border-amber-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-1 justify-center">
                        <div className="w-1 h-1 bg-amber-950 rounded-full"></div>
                        <div className="w-1 h-1 bg-amber-950 rounded-full"></div>
                      </div>
                      <div className="w-2.5 h-1 border-b border-amber-950 rounded-full mx-auto"></div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
                    className="absolute bottom-6 right-5 w-11 h-11 bg-amber-300 border-[3px] border-amber-400 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex space-x-1.5 justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-900 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-amber-900 rounded-full"></div>
                      </div>
                      <div className="w-3.5 h-1 bg-amber-900 rounded-full mx-auto"></div>
                    </div>
                  </motion.div>
                </div>
                <span className="text-[11px] font-bold text-slate-800 font-mono tracking-tight leading-none text-center">Postmodernism AI-Art v1.0</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-805 text-amber-800 px-3 py-1 rounded-full text-xs font-bold font-mono">
                🚀 Курьез в дизайне / AI-Driven Mascot
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Легенда о Двух Колобках на Зубочистке
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Истории брендов обычно пишутся маркетологами, но история Sway Browser создана искусственным интеллектом в Google AI Studio. Когда разработчики попросили ИИ изобразить «красивую трехмерную букву S с эффектом сверхбыстрой скорости», нейросеть решила пойти по пути постмодернизма.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Она выдала поразительное творение — <span className="font-bold text-amber-800">два абстрактных желтых колобка, насаженных на зубочистку</span>. Вместо того чтобы переделывать логотип, авторы с гордостью приняли этот дзен-сюрреализм! Два колобка стали официальным талисманом приложения — символом того, как хаос превращается в настоящую индивидуальность и мощный продукт.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-xs text-amber-900 font-bold font-mono">Официально сертифицировано AI Studio как символ Sway Browser™</span>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED SPEED METRICS COMPARISON TABLE */}
        <section id="comparison" className="py-20 border-t border-slate-200/80 scroll-mt-12">
          <ComparisonTable />
        </section>

        {/* LOCAL ACCORDION FAQ BLOCK */}
        <section id="faq" className="py-20 border-t border-slate-200/80 scroll-mt-12">
          <FAQSection />
        </section>

        {/* BOTTOM ACTIVE HERO CALL TO ACTION BANNER */}
        <section className="py-16 md:py-20 relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 md:p-12 text-center space-y-6 my-12 shadow-sm">
          {/* Subtle decoration vector circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 rounded-full blur-[90px] pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Очистите ваш мобильный интернет уже сегодня
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Почувствуйте разницу в скорости с первых секунд. Никакого захламления экрана, никаких утечек данных, только чистый контент со скоростью звука.
          </p>

          <div className="pt-4 flex flex-col items-center space-y-4">
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl text-xs hover:shadow-lg hover:shadow-indigo-600/15 transition-all active:scale-97 cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4.5 h-4.5 stroke-[2.5px]" />
              Скачать Установочный APK ({appSize})
            </button>
            <div className="flex items-center gap-2.5 text-xs text-slate-500">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
              <span>Безопасный файл • Без вирусов • Открытый код</span>
            </div>
          </div>
        </section>

        {/* ADMIN PORTAL PANEL CONTAINER */}
        <div id="admin-portal-anchor" className="scroll-mt-20" />
        <AnimatePresence>
          {isAdminOpen && (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="py-12 border-t border-slate-200/85"
            >
              <AdminPanel 
                currentVersion={appVersion}
                currentSize={appSize}
                onUpdateApp={handleUpdateApp}
                onHidePanel={() => setIsAdminOpen(false)}
              />
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER VIEW */}
      <footer className="border-t border-slate-200 bg-white py-12 relative z-10 text-xs text-slate-500 font-light font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Footer brand header block */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-extrabold text-slate-900 tracking-wider text-sm">SWAY BROWSER</span>
            </div>
            <p className="max-w-xs text-slate-500 leading-normal">
              Ориентированный на абсолютную скорость и конфиденциальность мобильный веб-браузер для Android OS. Будущее мобильного веб-серфинга уже здесь.
            </p>
          </div>

          {/* Quick legal stats and references */}
          <div className="space-y-3">
            <span className="font-bold text-slate-905 text-slate-900 text-xs block uppercase tracking-widest text-[10px]">Важные ссылки</span>
            <ul className="space-y-2 text-slate-505 text-slate-600">
              <li><a href="#features" className="hover:text-indigo-600 transition">Преимущества движения</a></li>
              <li><a href="#comparison" className="hover:text-indigo-600 transition">Замеры бенчмарков</a></li>
              <li><a href="#faq" className="hover:text-indigo-600 transition">Инструкция по APK</a></li>
              <li><a href="https://github.com/KBB001/Sawy-KBB.github.ol" className="hover:text-indigo-600 transition" target="_blank" rel="noreferrer">GitHub репозиторий</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-slate-900 text-xs block uppercase tracking-widest text-[10px]">Правовая информация</span>
            <p className="text-slate-500 leading-normal text-[11px]">
              Данный сайт представляет мобильный браузер Sway в рамках презентационного проекта. Название «Sway» защищено авторским кодом. Все торговые марки (Google Chrome, Brave) принадлежат их правообладателям.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex flex-col space-y-1 text-left max-w-2xl">
            <span>&copy; {new Date().getFullYear()} Sway Browser. Все права защищены.</span>
            <p className="text-[10px] text-slate-400 font-light leading-relaxed">
              <strong>Панель Администратора (Вход):</strong> Чтобы запустить консоль администратора, трижды/пять раз кликните по логотипу «S» в верхнем левом углу страницы или нажмите <code>Ctrl + Shift + A</code> на клавиатуре. Для авторизации введите пользовательский логин: <code>admin</code> и пароль: <code>sway</code>. В консоли доступна загрузка тестовых APK, верификация контрольных сумм файлов, управление версиями, заметками релиза, а также скрытие панели управления.
            </p>
          </div>
          <div className="flex space-x-6 shrink-0">
            <span>Разработано для Android 8.0+</span>
            <span>Конфиденциальность: Безусловная</span>
          </div>
        </div>
      </footer>

      {/* MODULAR POPUP DOWNLOAD TRIGGER DIALOG */}
      <AnimatePresence>
        {isDownloadOpen && (
          <DownloadModal 
            isOpen={isDownloadOpen} 
            onClose={() => setIsDownloadOpen(false)} 
            version={appVersion}
            fileSize={appSize}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
