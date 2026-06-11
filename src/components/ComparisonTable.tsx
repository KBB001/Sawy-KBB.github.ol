import React from "react";
import { Check, X, Shield, Award, Zap, HelpCircle } from "lucide-react";
import { COMPARISONS } from "../data";

export default function ComparisonTable() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Как <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">Sway</span> превосходит конкурентов?
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Честное техническое сравнение ключевых характеристик и показателей приватности на основе независимых замеров в мобильных сетях.
        </p>
      </div>

      {/* Table container with responsive horizontal scroll */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-150 bg-slate-50/70">
              <th className="py-4 px-6 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Функции и показатели</th>
              {COMPARISONS.map((browser) => (
                <th 
                  key={browser.name} 
                  className={`py-4 px-6 text-center ${
                    browser.isSway 
                      ? "bg-indigo-50/40 font-extrabold text-indigo-600 border-x border-indigo-100" 
                      : "font-semibold text-slate-700"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
                    {browser.isSway && (
                      <span className="text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest mb-1">
                        Выбор экспертов
                      </span>
                    )}
                    <span>{browser.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150">
            {/* Speed Multiplier Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Скорость (индекс загрузки)</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 font-extrabold text-indigo-600 border-x border-indigo-100" : "text-slate-600 font-medium"
                  }`}
                >
                  <span className={`px-2 py-1 rounded text-xs ${b.isSway ? "bg-indigo-50 text-indigo-700 font-bold" : "bg-slate-100 text-slate-500"}`}>
                    {b.speedIndex}x {b.isSway ? "быстрее" : ""}
                  </span>
                </td>
              ))}
            </tr>

            {/* Load on Weak 3G Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-amber-100 rounded text-amber-800 font-mono text-[9px] font-black tracking-wider">3G</span>
                  <span>Загрузка на слабом 3G (1.5 Мб/с)</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 font-extrabold text-indigo-600 border-x border-indigo-100" : "text-slate-600 font-medium text-xs"
                  }`}
                >
                  <span className={b.isSway ? "text-indigo-700 font-extrabold" : "text-slate-500"}>
                    {b.name === "Sway Browser" && "1.2 сек (Мгновенно) ⚡"}
                    {b.name === "Google Chrome" && "16.4 сек (Зависания) 🐌"}
                    {b.name === "Brave Android" && "3.1 сек"}
                    {b.name === "DuckDuckGo Browser" && "4.8 сек"}
                  </span>
                </td>
              ))}
            </tr>

            {/* Adblocker Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>Блокировка рекламы</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 font-bold border-x border-indigo-100" : ""
                  }`}
                >
                  {b.isSway ? (
                    <div className="flex items-center justify-center space-x-1.5 text-indigo-600 font-bold">
                      <Check className="w-4 h-4 stroke-[3px]" />
                      <span className="text-xs">{b.adBlocker}</span>
                    </div>
                  ) : typeof b.adBlocker === "string" ? (
                    <span className="text-slate-500 text-xs">{b.adBlocker}</span>
                  ) : b.adBlocker === true ? (
                    <div className="flex items-center justify-center text-slate-600">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-slate-300">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Tracker Shield Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-indigo-505 text-indigo-500 flex-shrink-0" />
                  <span>Блокировка трекеров</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                  }`}
                >
                  {b.trackerShield ? (
                    <div className="flex items-center justify-center text-indigo-600">
                      <Check className="w-5 h-5 stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-rose-500/60">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Memory Usage (RAM) Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <span>Потребление ОЗУ (RAM)</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 text-xs ${
                    b.isSway ? "bg-indigo-50/40 font-bold text-indigo-600 border-x border-indigo-100" : "text-slate-500"
                  }`}
                >
                  <span className={b.isSway ? "text-indigo-700 font-bold" : ""}>
                    {b.memoryUsage}
                  </span>
                </td>
              ))}
            </tr>

            {/* Fingerprinting Block Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-805 text-slate-800">
                <div className="flex items-center space-x-2">
                  <span>Защита от фингерпринтинга</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                  }`}
                >
                  {b.fingerprintProtection ? (
                    <div className="flex items-center justify-center text-indigo-600">
                      <Check className="w-5 h-5 stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-rose-500/60">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Open Source Row */}
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-800">
                <div className="flex items-center space-x-2">
                  <span>Открытый исходный код</span>
                </div>
              </td>
              {COMPARISONS.map((b) => (
                <td 
                  key={b.name} 
                  className={`text-center py-4 px-6 ${
                    b.isSway ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                  }`}
                >
                  {b.openSource ? (
                    <div className="flex items-center justify-center text-indigo-600">
                      <Check className="w-5 h-5 stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-rose-500/60">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200 justify-center">
        <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
        <span className="text-xs text-slate-500">
          * Индекс скорости измеряется как соотношение времени полной отрисовки контента (Time-to-Interactive) к базовой шкале Google Chrome.
        </span>
      </div>
    </div>
  );
}
