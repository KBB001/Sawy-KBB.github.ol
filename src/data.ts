import { FeatureItem, FAQItem, ReviewItem, ComparisonBrowser, SimulatorSite } from "./types";

export const FEATURES: FeatureItem[] = [
  {
    id: "media-picker",
    iconName: "Compass",
    title: "Интеллектуальный Медиа-Детектор",
    description: "Двусторонний JavaScript-Kotlin мост внутри WebView сканирует DOM на лету. Обнаруживает все теги <img>, <video>, <source> и формирует единый интерактивный каталог готовых к скачиванию файлов со всеми метаданными (разрешение, размер, расширение).",
    badge: "MediaPickerJSInterface"
  },
  {
    id: "zip-archiver",
    iconName: "Cookie",
    title: "Пакетная ZIP-загрузка",
    description: "Менеджер скачивания умеет упаковывать выбранный мульти-контент прямо в ZIP-архив на лету. Никаких хаотичных сотен файлов в галерее — все сохраняется в структурированном виде, упорядоченно и с прогресс-баром.",
    badge: "DownloadManagerHelper"
  },
  {
    id: "unsplash-search",
    iconName: "EyeOff",
    title: "Умный Поиск Изображений",
    description: "Оригинальная поисковая интеграция с Unsplash API для быстрого нахождения обоев и визуальных ресурсов. Если API недоступен или соединение прервано, срабатывает интеллектуальный fallback-режим на локальный каталог из 30+ категорий.",
    badge: "ImageSearchService"
  },
  {
    id: "pinterest-booster",
    iconName: "Zap",
    title: "Улучшение Pinterest (Originals)",
    description: "Браузер оснащен уникальной системой дедупликации и повышения качества изображений. При обнаружении Pinterest-эскизов он автоматически подменяет пути на оригиналы высокого разрешения (/originals/) и фильтрует дубли.",
    badge: "Pinterest Booster"
  },
  {
    id: "storage-sorting",
    iconName: "BatteryCharging",
    title: "Умное сохранение и сортировка",
    description: "На Android 10+ используется MediaStore API (для бесконфликтной записи и автоиндексации файлов), а на старых версиях — надежный Legacy File API. Картинки летят в /Pictures, видео — в /Movies, остальное — в /Downloads.",
    badge: "Safe Saving"
  },
  {
    id: "room-db",
    iconName: "ShieldAlert",
    title: "Локальная база данных Room",
    description: "Все ваши вкладки, избранное, история, текущие и завершенные загрузки кэшируются в локальной СУБД SQLite через Room. Никаких облачных серверов, утечек или пересылки логов — полная приватность по схеме zero-knowledge.",
    badge: "Room SQLite DB"
  }
];

export const COMPARISONS: ComparisonBrowser[] = [
  {
    name: "Sway Browser",
    isSway: true,
    speedIndex: 3.5,
    adBlocker: "Встроенный + Нативный",
    trackerShield: true,
    memoryUsage: "85 MB",
    fingerprintProtection: true,
    openSource: true
  },
  {
    name: "Google Chrome",
    isSway: false,
    speedIndex: 1.0,
    adBlocker: "Нет (нужны расширения)",
    trackerShield: false,
    memoryUsage: "410 MB",
    fingerprintProtection: false,
    openSource: false
  },
  {
    name: "Brave Android",
    isSway: false,
    speedIndex: 2.1,
    adBlocker: "Есть",
    trackerShield: true,
    memoryUsage: "185 MB",
    fingerprintProtection: true,
    openSource: true
  },
  {
    name: "DuckDuckGo Browser",
    isSway: false,
    speedIndex: 1.6,
    adBlocker: "Частичный",
    trackerShield: true,
    memoryUsage: "160 MB",
    fingerprintProtection: false,
    openSource: true
  }
];

export const SIMULATOR_SITES: SimulatorSite[] = [
  {
    id: "news",
    name: "Pinterest Media Feed",
    url: "https://pinterest.com/pin/sway-inspiration",
    originalTime: 5.4,
    swayTime: 1.1,
    originalTrackers: 32,
    swayTrackers: 1,
    originalAdsCount: 5,
    swayAdsCount: 0,
    contentHtml: `
      <div class="space-y-3 pb-6">
        <div class="flex items-center space-x-2 border-b border-white/5 pb-2">
          <div class="w-5 h-5 bg-red-650 bg-red-650 bg-red-600 rounded-full flex-shrink-0 flex items-center justify-center font-black text-white text-[10px]">P</div>
          <div>
            <h4 class="text-[10px] font-bold text-slate-200 leading-none">Идеи для UI/UX Дизайна</h4>
            <span class="text-[8px] text-slate-500">Популярный пин</span>
          </div>
        </div>
        <p class="text-[10px] text-slate-350">На странице опубликовано 3 эскиза с низким разрешением. Стандартные браузеры скачают только сжатые миниатюры 564x564px.</p>
        
        <!-- Low-res images with placeholders simulated -->
        <div class="grid grid-cols-3 gap-1.5 pt-1">
          <div class="aspect-square bg-slate-900 rounded p-1 border border-white/5 flex flex-col justify-between">
            <span class="text-[8px] font-mono text-slate-400">img_preview_1.jpg</span>
            <span class="text-[7px] text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded w-fit">564x564 px</span>
          </div>
          <div class="aspect-square bg-slate-900 rounded p-1 border border-white/5 flex flex-col justify-between">
            <span class="text-[8px] font-mono text-slate-400">img_preview_2.jpg</span>
            <span class="text-[7px] text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded w-fit">564x564 px</span>
          </div>
          <div class="aspect-square bg-slate-900 rounded p-1 border border-white/5 flex flex-col justify-between">
            <span class="text-[8px] font-mono text-slate-400">img_preview_3.jpg</span>
            <span class="text-[7px] text-amber-400 bg-amber-950/40 px-1 py-0.5 rounded w-fit flex items-center gap-0.5">564x564 px</span>
          </div>
        </div>

        <div class="ad-placeholder bg-rose-500/10 text-rose-300 text-xs py-3 px-4 border border-dashed border-rose-500/20 text-center rounded flex flex-col justify-center items-center">
          <span class="font-bold tracking-wider text-[9px] uppercase bg-rose-500/20 px-1 py-0.5 rounded mb-1 text-rose-200">РЕКЛАМА / PROMOTED AD</span>
          <span class="text-[10px]">Вам одобрен кредит на 5,000,000 ₸ по ставке 0.01%! Кликнете</span>
        </div>
      </div>
    `
  },
  {
    id: "social",
    name: "Unsplash Wallpaper Search",
    url: "https://unsplash.com/s/photos/nature",
    originalTime: 4.8,
    swayTime: 0.9,
    originalTrackers: 22,
    swayTrackers: 0,
    originalAdsCount: 4,
    swayAdsCount: 0,
    contentHtml: `
      <div class="space-y-3">
        <h4 class="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest font-mono">Unsplash Поиск фото</h4>
        <div class="flex gap-1.5">
          <input type="text" readonly value="Nature" class="flex-1 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[9px] text-slate-350" />
          <button class="bg-indigo-650 px-2 py-1 text-[9px] text-white rounded font-bold">Найти</button>
        </div>
        
        <p class="text-[10px] text-slate-400 leading-normal font-light">В режиме оффлайн или лимита запросов Unsplash API, интеллектуальная система автоматически переходит в локальный SQLite fallback-каталог с 30+ HD фотографиями по теме.</p>
        
        <div class="mt-2 p-2 bg-slate-900 border border-indigo-900/30 rounded flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span class="text-[8px] font-mono font-bold text-slate-300">ImageSearchService: Active (Offline SQLite fallback)</span>
        </div>
      </div>
    `
  },
  {
    id: "video",
    name: "Media Streaming Gallery",
    url: "https://videoshare-sample.net/explore",
    originalTime: 7.2,
    swayTime: 1.3,
    originalTrackers: 39,
    swayTrackers: 1,
    originalAdsCount: 9,
    swayAdsCount: 0,
    contentHtml: `
      <div class="space-y-2">
        <div class="relative w-full aspect-video bg-black rounded flex flex-col justify-center items-center border border-white/10 overflow-hidden">
          <div class="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <span class="text-[10px] text-slate-400">Медиа контент (Video/Source тег)</span>
          </div>
          
          <div class="ad-placeholder absolute inset-0 bg-rose-950/95 z-20 flex flex-col items-center justify-center p-3 text-center">
            <span class="text-[9px] font-semibold text-rose-400 bg-rose-950 px-1.5 py-0.5 rounded border border-rose-500/30 mb-1">ФОНОВАЯ РЕКЛАМА</span>
            <p class="text-[10px] text-rose-200 mt-1">Рекламный блок перед стримом (45 сек)</p>
            <span class="text-[8px] text-rose-400 font-mono mt-1">Sway нативно извлечет прямую видео-ссылку MP4 и запустит в стороннем плеере, обходя весь этот спам!</span>
          </div>
        </div>
        <h4 class="text-[11px] font-bold text-slate-200">Презентация нового смартфона под управлением Android 15</h4>
        <p class="text-[9px] text-slate-500 leading-tight">Обнаружен видео поток: 1080p, формат MP4, размер ~135 MB.</p>
      </div>
    `
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Sway действительно умеет скачивать картинки в максимальном качестве?",
    answer: "Да! Это одна из основных фишек Sway Browser. Когда вы находитесь на Pinterest или подобных ресурсах, стандартные браузеры захватывают лишь сжатые превью-версии с низким разрешением. Sway содержит интеллектуальный парсер JavaScript-Kotlin в WebView, который на лету анализирует код страницы, дедуплицирует контент, ищет оригинальные пути (например, заменяя пути миниатюр Pinterest на /originals/) и предлагает скачать настоящие исходники файлов в один клик."
  },
  {
    question: "Что за история с талисманом «два колобка на зубочистке»?",
    answer: "Это забавный реальный случай из процесса дизайна в Google AI Studio! Мы попросили нейросеть сгенерировать красивый трехмерный логотип с буквой «S» и аккуратной стрелкой скорости. В ответ ИИ представил весьма абстрактное концептуальное творение, поразительно похожее на два желтых колобка, насаженных на зубочистку. Мы решили не бороться с хаосом, а принять его: колобки стали официальным маскотом и символом того, как творческая искра хаоса создает уникальный дзен-дизайн."
  },
  {
    question: "Каковы системные требования и версия Android?",
    answer: "Sway Browser разработан на современном Kotlin/Compose стеке специально для устройств под управлением Android OS 7.0 и выше (минимальный уровень API 24). Приложение скомпилировано под целевую версию SDK 36 (Android 15). Вес готового APK файла составляет всего 14.5 МБ, а для стабильной работы медиа-сканера достаточно 2 ГБ оперативной памяти."
  },
  {
    question: "Как работает функция Unsplash и почему там упоминается Gemini?",
    answer: "В браузер интегрирована система ImageSearchService через Unsplash API для быстрого поиска вдохновляющих фоновых ресурсов и обоев. Для расширенного поиска используется аналитика Gemini API. Если API недоступен, лимит запросов исчерпан или отсутствует веб-сеть, браузер мгновенно переходит на локальную базу данных SQLite из 30+ предустановленных качественных изображений с автоматическим фильтром тегов."
  },
  {
    question: "Что дает локальное кеширование базы данных Room SQLite?",
    answer: "Мы реализуем строгую философию приватности zero-knowledge (нулевые знания). Любые данные вашего сеанса — открытые вкладки, закладки, история и задачи текущего менеджера скачивания — сохраняются исключительно локально на вашем смартфоне с помощью базы данных Room SQLite. Мы не ведим никаких внешних серверов телеметрии, не храним ваши запросы в облаке и никогда их не передаем."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    name: "Алибек С.",
    role: "Android QA Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    rating: 5,
    content: "Как Android-тестировщик, я в восторге! Jetpack Compose в интерфейсе летает плавно, а нативный JavaScript мост в WebView цепляет медиа-ссылки даже со сложных веб-приложений. Наконец-то нет мусора на страницах."
  },
  {
    name: "Мария К.",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120",
    rating: 5,
    content: "История с логотипом из двух колобков на зубочистке покорила мое сердце — это лучший постмодернистский дизайн во всей индустрии! Коллаж скачиваемых медиафайлов очень удобен, авто-бутстрэп Pinterest до оригиналов невероятно экономит время."
  },
  {
    name: "Дмитрий Т.",
    role: "Кибербезопасность & Мобильный реверс",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    rating: 5,
    content: "Проверил декомпилированный APK в JADX — исходники чистые, действительно открытый код (MIT License), написан на отличном декларативном Kotlin 2.2. Понравилась работа СУБД Room SQLite для хранения вкладок, никаких скрытых сокетов телеметрии."
  }
];
