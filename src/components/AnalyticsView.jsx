import React from 'react';
import { Eye, MousePointerClick, TrendingUp, RefreshCw } from 'lucide-react';
import { BracketTechBadge } from './SpecialEffects';

export default function AnalyticsView({ links, analytics, onResetStats }) {
  const totalClicks = links.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const totalViews = analytics?.totalViews || 1;
  const ctr = ((totalClicks / totalViews) * 100).toFixed(1);

  return (
    <section className="space-y-5">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="maghrib-glass tech-corner-box p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-[#cbd5e1]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Total Kunjungan</span>
            <Eye className="w-4 h-4 text-[#818cf8]" />
          </div>
          <div className="text-2xl font-black text-white">{totalViews}</div>
          <p className="text-[11px] text-[#cbd5e1]/65">Tampilan profil terhitung</p>
        </div>

        <div className="maghrib-glass tech-corner-box p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-[#cbd5e1]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Total Klik Tautan</span>
            <MousePointerClick className="w-4 h-4 text-[#facc15]" />
          </div>
          <div className="text-2xl font-black text-[#facc15]">{totalClicks}</div>
          <p className="text-[11px] text-[#cbd5e1]/65">Seluruh klik tombol aktif</p>
        </div>

        <div className="maghrib-glass tech-corner-box p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-[#cbd5e1]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Rasio Klik (CTR)</span>
            <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#38bdf8]">{ctr}%</div>
          <p className="text-[11px] text-[#cbd5e1]/65">Rata-rata interaksi pengunjung</p>
        </div>
      </div>

      {/* DETAIL PER TAUTAN */}
      <div className="maghrib-glass tech-corner-box p-5 sm:p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BracketTechBadge accent="sky">METRICS // DATA</BracketTechBadge>
              <h3 className="text-base sm:text-lg font-extrabold text-[#facc15] tracking-tight italic">
                PERFORMA SETIAP TAUTAN
              </h3>
            </div>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Lihat tautan mana yang paling menarik perhatian audiens Anda.
            </p>
          </div>
          {onResetStats && (
            <button
              onClick={onResetStats}
              className="ghost-pill-btn px-3.5 py-1.5 text-xs text-[#cbd5e1] hover:text-[#facc15] font-semibold flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Reset Angka</span>
            </button>
          )}
        </div>

        <div className="space-y-3 pt-2">
          {links.length === 0 ? (
            <div className="text-center py-8 text-[#cbd5e1]/60 text-xs">
              Belum ada tautan untuk dianalisis.
            </div>
          ) : (
            links.map((link, idx) => {
              const linkClicks = link.clicks || 0;
              const percentage = totalClicks > 0 ? ((linkClicks / totalClicks) * 100).toFixed(0) : 0;

              return (
                <div
                  key={link.id || idx}
                  className="p-3.5 rounded-2xl bg-[#070a14]/75 border border-[#818cf8]/25 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                      {link.title}
                    </span>
                    <span className="font-mono font-bold text-[#facc15] shrink-0">
                      {linkClicks} klik ({percentage}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#0f172a] border border-[#818cf8]/20 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-gradient-to-r from-[#38bdf8] to-[#facc15] rounded-full transition-all duration-500 shadow-[0_0_8px_#facc15]"
                    ></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
