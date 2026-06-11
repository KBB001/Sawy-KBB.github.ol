import React, { useState, useEffect } from "react";
import { 
  Shield, 
  ShieldAlert, 
  Zap, 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  Lock, 
  FileText, 
  Users, 
  Video, 
  Globe, 
  Bookmark, 
  Layers,
  Wifi
} from "lucide-react";
import { SIMULATOR_SITES } from "../data";

export default function PhoneMockup() {
  const [activeSiteId, setActiveSiteId] = useState("news");
  const [isSwayMode, setIsSwayMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(100);
  const [networkSpeed, setNetworkSpeed] = useState<"3g" | "lte">("3g");

  const activeSite = SIMULATOR_SITES.find(s => s.id === activeSiteId) || SIMULATOR_SITES[0];

  // Dynamic metrics calculation under slow 3G and fast 4G
  const calculatedSwayTime = networkSpeed === "3g" ? (activeSite.swayTime * 1.3).toFixed(1) : activeSite.swayTime.toFixed(1);
  const calculatedOriginalTime = networkSpeed === "3g" ? (activeSite.originalTime * 3.4).toFixed(1) : activeSite.originalTime.toFixed(1);

  // Simulate page reload when switching sites, toggling Sway mode or changing network speed
  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // 3G network mode features slower clock rates, especially without Sway Shield where trackers flood the connection
    const baseMultiplier = networkSpeed === "3g" ? 2.5 : 1.0;
    const loadTime = isSwayMode ? (220 * baseMultiplier) : (1300 * baseMultiplier);
    const intervalTime = Math.max(loadTime / 10, 20);
    
    let progress = 0;
    const timer = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        setLoadingProgress(100);
        setIsLoading(false);
        clearInterval(timer);
      } else {
        setLoadingProgress(progress);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeSiteId, isSwayMode, networkSpeed]);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-10">
      {/* Simulation Controller & Stats Panel */}
      <div className="flex-1 space-y-6 lg:max-w-md">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold text-indigo-650 tracking-wider uppercase">Оптимизация Трафика в 3G / 4G</span>
        </div>

        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none overflow-visible">
          Веб-страницы загружаются <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">мгновенно даже на слабом 3G</span>
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed">
          Классические браузеры тратят львиную долю времени и трафика на загрузку тяжелых трекеров и рекламных баннеров. Sway на лету вырезает рекламный мусор, ускоряя загрузку в десятки раз при плохом интернет-соединении.
        </p>

        {/* Network Connection Selector (3G / 4G) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Режим качества связи (Эмуляция):</span>
          <div className="grid grid-cols-2 gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-205 border-slate-200">
            <button
              onClick={() => setNetworkSpeed("3g")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                networkSpeed === "3g"
                  ? "bg-slate-900 text-white shadow-md block w-full"
                  : "text-slate-600 hover:text-slate-905 hover:bg-slate-200/50 block w-full"
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Слабый 3G (1.5 Мб/с)</span>
            </button>
            <button
              onClick={() => setNetworkSpeed("lte")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                networkSpeed === "lte"
                  ? "bg-indigo-600 text-white shadow-md block w-full"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 block w-full"
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-indigo-400" />
              <span>Быстрый 4G / LTE</span>
            </button>
          </div>
        </div>

        {/* Website Selector tabs */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Выберите демо-сайт для теста:</span>
          <div className="grid grid-cols-3 gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
            {SIMULATOR_SITES.map((site) => (
              <button
                key={site.id}
                onClick={() => setActiveSiteId(site.id)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                  activeSiteId === site.id
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10 block w-full"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 block w-full"
                }`}
              >
                {site.id === "news" && <FileText className="w-3.5 h-3.5 inline" />}
                {site.id === "social" && <Users className="w-3.5 h-3.5 inline" />}
                {site.id === "video" && <Video className="w-3.5 h-3.5 inline" />}
                <span className="truncate ml-1">{site.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Comparison Card */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xl shadow-slate-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Показатели загрузки этой страницы:</span>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Speed Index */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] text-slate-500 font-medium leading-none block mb-1">Время загрузки</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`}>
                  {isSwayMode ? `${calculatedSwayTime}s` : `${calculatedOriginalTime}s`}
                </span>
                <span className="text-[9px] text-slate-400">сек</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <Zap className={`w-3 h-3 ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`} />
                <span className="text-[9px] text-slate-500 font-semibold leading-tight">
                  {isSwayMode 
                    ? `В ${(parseFloat(calculatedOriginalTime) / parseFloat(calculatedSwayTime)).toFixed(0)} раз быстрее` 
                    : "Ожидание"}
                </span>
              </div>
            </div>

            {/* Trackers Status */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] text-slate-500 font-medium leading-none block mb-1">Трекеры данных</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`}>
                  {isSwayMode ? activeSite.swayTrackers : activeSite.originalTrackers}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">шт</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <Shield className={`w-3 h-3 ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`} />
                <span className="text-[9px] text-slate-500 font-semibold">
                  {isSwayMode ? "Защищен" : "Активна слежка"}
                </span>
              </div>
            </div>

            {/* Ads blocked */}
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] text-slate-500 font-medium leading-none block mb-1">Реклама на странице</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`}>
                  {isSwayMode ? activeSite.swayAdsCount : activeSite.originalAdsCount}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">шт</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <ShieldAlert className={`w-3 h-3 ${isSwayMode ? "text-indigo-600" : "text-rose-500"}`} />
                <span className="text-[9px] text-slate-500 font-semibold">
                  {isSwayMode ? "Реклама срезана" : "Спам забит"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-normal">
              * Замеры получены в реальном времени под выбранным типом сети (3G/4G) на Android.
            </span>
          </div>
        </div>

        {/* Manual action trigger */}
        <div className="flex items-center space-x-3 bg-slate-50 hover:bg-slate-100/50 p-4 rounded-xl border border-slate-200 transition-all duration-300">
          <div className={`p-2 rounded-lg ${isSwayMode ? "bg-indigo-50 text-indigo-600" : "bg-rose-50 text-rose-500"} h-fit`}>
            {isSwayMode ? <Shield className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              {isSwayMode ? "Sway Shield активен" : "Sway Shield отключен"}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 font-light leading-relaxed">
              {isSwayMode 
                ? "Вы находитесь под защитой нативного блокировщика трафика со скоростью молнии."
                : "Движок не фильтрует входящие запросы. Веб-трекеры собирают ваш цифровой отпечаток."}
            </p>
          </div>
        </div>
      </div>

      {/* Futuristic Interactive Android Phone Mockup */}
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-[285px] h-[580px] bg-slate-950 rounded-[42px] border-[5px] border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] focus-within:ring-2 focus-within:ring-indigo-500/40 outline-none flex flex-col overflow-hidden">
          
          {/* Inner bezel highlight border */}
          <div className="absolute inset-0 rounded-[37px] border border-white/5 pointer-events-none z-50"></div>
          
          {/* Phone Header Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 flex justify-center items-center z-50">
            <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-between px-3">
              {/* Speaker */}
              <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
              {/* Camera dot */}
              <div className="w-2 h-2 bg-blue-900/60 rounded-full border border-slate-900"></div>
            </div>
            {/* Battery state inside mockup */}
            <div className="absolute right-4 top-1.5 flex items-center space-x-1 text-[8px] font-bold text-slate-400 font-mono">
              <span>98%</span>
              <div className="w-3.5 h-1.5 border border-slate-500/50 rounded-sm p-[1px] flex items-center">
                <div className="h-full w-4/5 bg-indigo-500 rounded-2xs"></div>
              </div>
            </div>
            {/* Clock state inside mockup */}
            <div className="absolute left-4 top-1.5 text-[8px] font-bold text-slate-450 font-mono">
              16:35
            </div>
          </div>

          {/* Smartphone Body Content Container */}
          <div className="flex-1 pt-6 pb-4 bg-slate-950 flex flex-col relative">
            
            {/* Interactive Browser Address bar */}
            <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center gap-2">
              {/* Secure lock icon */}
              <div className="flex-shrink-0 text-slate-400">
                {isSwayMode ? <Lock className="w-3 h-3 text-indigo-400" /> : <Globe className="w-3 h-3" />}
              </div>
              
              {/* Address input */}
              <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-md py-1 px-2 text-[10px] text-slate-300 font-mono overflow-hidden truncate">
                {activeSite.url}
              </div>

              {/* Refresh / Action icon button */}
              <button 
                onClick={() => {
                  setIsLoading(true);
                  setLoadingProgress(0);
                  const finalLoadTime = networkSpeed === "3g" 
                    ? (isSwayMode ? 550 : 3250) 
                    : (isSwayMode ? 220 : 1300);
                  setTimeout(() => { setIsLoading(false); setLoadingProgress(100); }, finalLoadTime);
                }}
                className="text-slate-400 hover:text-white p-0.5 active:scale-90 cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              {/* SPECIAL INTERACTIVE SWAY SHIELD SWITCH */}
              <button
                onClick={() => setIsSwayMode(!isSwayMode)}
                id="sway-shield-switch-button"
                className={`relative w-8 h-5 rounded-full p-[2px] transition-all duration-300 cursor-pointer ${
                  isSwayMode ? "bg-indigo-600" : "bg-slate-700"
                }`}
                title="Переключить Sway Shield"
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-md transform transition-all duration-300 flex items-center justify-center ${
                  isSwayMode ? "translate-x-3.5" : "translate-x-0"
                }`}>
                  {isSwayMode ? (
                    <Shield className="w-2.5 h-2.5 text-indigo-600 fill-indigo-600" />
                  ) : (
                    <ShieldAlert className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                  )}
                </div>
              </button>
            </div>

            {/* Quick Stats banner for the mockup browser */}
            <div className={`px-3 py-1 flex justify-between items-center text-[8px] font-semibold border-b ${
              isSwayMode 
                ? "bg-indigo-950/40 text-indigo-300 border-indigo-900/30" 
                : "bg-rose-950/40 text-rose-450 border-rose-900/30"
            }`}>
              <div className="flex items-center gap-1">
                <span>{isSwayMode ? "Безопасное соединение" : "Небезопасно! Скрытые трекеры"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-2 h-2" />
                <span>Загрузка: {isLoading ? `${loadingProgress}%` : (isSwayMode ? `${calculatedSwayTime}с` : `${calculatedOriginalTime}с`)}</span>
              </div>
            </div>

            {/* Simulated Web View Container */}
            <div className={`flex-1 p-3 overflow-y-auto relative select-none transition-colors duration-300 ${
              isSwayMode ? "bg-white text-slate-800" : "bg-[#090a0f] text-slate-350"
            }`}>
              
              {/* Spinner loader layout mimicking real browser delay */}
              {isLoading && (
                <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center space-y-2 ${
                  isSwayMode ? "bg-white" : "bg-[#090a0f]"
                }`}>
                  <div className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${
                    isSwayMode ? "border-indigo-600" : "border-rose-400"
                  }`}></div>
                  <span className={`text-[10px] font-mono font-semibold ${isSwayMode ? "text-slate-500" : "text-slate-400"}`}>
                    Загрузка... {loadingProgress}%
                  </span>
                </div>
              )}

              {/* Live Webpage layout inside browser frame */}
              <div className="text-left select-none relative">
                {/* Header of the simulated site */}
                <div className={`flex items-center justify-between border-b pb-2 mb-3 ${
                  isSwayMode ? "border-slate-150" : "border-white/5"
                }`}>
                  <span className={`text-[9px] font-bold uppercase tracking-widest font-mono ${
                    isSwayMode ? "text-slate-400" : "text-slate-550"
                  }`}>
                    {activeSite.name}
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  </div>
                </div>

                {/* Content block: we dynamic filter out the ads if isSwayMode is true! */}
                {isSwayMode ? (
                  /* Sway Mode Content: Clean, elegant, readable, advertisements filtered out! */
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-slate-900 tracking-tight leading-snug">
                      {activeSiteId === "news" ? "Глобальное потепление: Новое открытие ИИ-климатологов ускорило прогнозы" : ""}
                      {activeSiteId === "social" ? "Тренд недели: Почему все переходят со стоковых браузеров" : ""}
                      {activeSiteId === "video" ? "Создаем 3D-движок на чистом WebGL за 20 минут без библиотек" : ""}
                    </h3>
                    
                    {activeSiteId === "news" && (
                      <p className="text-[10px] text-slate-600 leading-normal font-light">
                        Группа исследователей применила нейронные сети для анализа антарктических ледяных пластов. Данные указывают на то, что прежние климатические модели недооценивали трение подледных потоков...
                      </p>
                    )}

                    {activeSiteId === "social" && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                          <div className="w-4 h-4 bg-indigo-500 rounded-full flex-shrink-0"></div>
                          <div>
                            <h4 className="text-[9px] font-semibold text-slate-800">@techo_bro</h4>
                            <span className="text-[7px] text-slate-400">2 минуты назад</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-normal font-light">
                          Ребята, я перешел на мобильный браузер Sway на своем Android. Загрузка страниц просто моментальная. Вся назойливая реклама исчезла. Батарея теперь живет раза в полтора дольше! 🔥💻
                        </p>
                        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                          <div className="w-4 h-4 bg-violet-500 rounded-full flex-shrink-0"></div>
                          <div>
                            <h4 className="text-[9px] font-semibold text-slate-800">@nature_explorer</h4>
                            <span className="text-[7px] text-slate-400">1 час назад</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-normal font-light">
                          Утренний туман на озере Байкал сегодня просто невероятный. Чистый воздух и никого вокруг. Скину чуть позже видео-отчет!
                        </p>
                      </div>
                    )}

                    {activeSiteId === "video" && (
                      <div className="space-y-2">
                        <div className="relative w-full aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-indigo-505/10 overflow-hidden group">
                          {/* Simulated active player screen */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 to-indigo-900/20 flex items-center justify-center">
                            <span className="text-[9px] text-indigo-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-white/5">
                              Видео вещание активно 1080p
                            </span>
                          </div>
                          
                          {/* Play logo */}
                          <div className="absolute w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer shadow-lg">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white ml-0.5"></div>
                          </div>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-900">Создаем 3D-движок на чистом WebGL за 20 минут без библиотек</h4>
                        <div className="flex items-center space-x-2 text-[8px] text-slate-500">
                          <span>12K просмотров</span>
                          <span>•</span>
                          <span className="text-indigo-600 font-semibold">Канал: WebVibe (Блокировка рекламы активна)</span>
                        </div>
                      </div>
                    )}

                    {activeSiteId === "news" && (
                      <div className="mt-3 p-2.5 bg-slate-50 border border-slate-150 rounded-lg text-[9px] text-slate-500 space-y-1">
                        <span className="font-bold text-slate-800 block">ИИ Прогнозы</span>
                        <span>Ученые надеются завершить построение полноценной трехмерной симуляции ледяного панциря в течение 12 месяцев.</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Browser Content: Crowded with spam banner placeholders, warning frames and red overlay elements */
                  <div 
                    className="space-y-3"
                    dangerouslySetInnerHTML={{ __html: activeSite.contentHtml }}
                  />
                )}
              </div>
            </div>

            {/* Smartphone Bottom Browser Control Bar */}
            <div className="bg-[#10131d] border-t border-white/5 px-4 py-2 flex items-center justify-between text-slate-400 z-10">
              <button title="Назад" className="hover:text-white transition p-1"><ArrowRight className="w-4 h-4 transform rotate-180" /></button>
              <button title="Вперед" className="hover:text-white transition p-1"><ArrowRight className="w-4 h-4" /></button>
              
              {/* Central Quick Home/Inco Button bar */}
              <div className="relative w-8 h-8 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-600/10 cursor-pointer active:scale-90">
                S
              </div>

              <button title="Закладки" className="hover:text-white transition p-1"><Bookmark className="w-4 h-4" /></button>
              <button title="Вкладки" className="hover:text-white transition p-1"><Layers className="w-4 h-4" /></button>
            </div>

            {/* Smart Navigation bar on Android OS level */}
            <div className="h-4 bg-slate-950 flex justify-center items-center gap-12 pt-1 border-t border-slate-900/30">
              <div className="w-3 h-3 border border-slate-600 rounded-sm"></div>
              <div className="w-3 h-3 border border-slate-600 rounded-full"></div>
              <div className="w-4 h-0 border-t-2 border-slate-650 rounded"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
