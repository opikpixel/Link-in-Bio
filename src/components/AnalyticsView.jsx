import React from 'react';
import { Eye, MousePointerClick, TrendingUp, RefreshCw } from 'lucide-react';
import { SectionPillTag, CardStepHeader } from './SpecialEffects';

export default function AnalyticsView({ links, analytics, onResetStats }) {
  const totalClicks = links.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const totalViews = analytics?.totalViews || 1;
  const ctr = ((totalClicks / totalViews) * 100).toFixed(1);

  return (
    <section className="space-y-5">
      {/* SECTION HEADER */}
      <div className="space-y-2">
        <SectionPillTag code="03" label="STATISTIK & PERFORMA" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Analitik Kunjungan & Klik
            </h1>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Pantau interaksi pengunjung pada setiap tautan aktif Anda.
            </p>
          </div>
          {onResetStats && (
            <button
              onClick={onResetStats}
              className="ghost-pill-btn px-3.5 py-1.5 text-xs text-[#cbd5e1] hover:text-white font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Reset Angka</span>
            </button>
          )}
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="maghrib-card p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Kunjungan</span>
            <Eye className="w-4 h-4 text-[#818cf8]" />
          </div>
          <div className="text-2xl font-black text-white">{totalViews}</div>
          <p className="text-[11px] text-slate-400">Total profil dilihat</p>
        </div>

        <div className="maghrib-card p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Total Klik</span>
            <MousePointerClick className="w-4 h-4 text-[#facc15]" />
          </div>
          <div className="text-2xl font-black text-[#facc15]">{totalClicks}</div>
          <p className="text-[11px] text-slate-400">Seluruh klik tautan</p>
        </div>

        <div className="maghrib-card p-5 rounded-3xl space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Rasio Klik (CTR)</span>
            <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#38bdf8]">{ctr}%</div>
          <p className="text-[11px] text-slate-400">Interaksi pengunjung</p>
        </div>
      </div>

      {/* DETAIL PER TAUTAN */}
      <div className="maghrib-card p-5 sm:p-6 rounded-3xl space-y-4">
        <CardStepHeader number="01" category="PERFORMA SETIAP TAUTAN" status="REAL-TIME" />

        <div className="space-y-2.5 pt-1">
          {links.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Belum ada tautan untuk dianalisis.
            </div>
          ) : (
            links.map((link, idx) => {
              const linkClicks = link.clicks || 0;
              const percentage = totalClicks > 0 ? ((linkClicks / totalClicks) * 100).toFixed(0) : 0;

              return (
                <div
                  key={link.id || idx}
                  className="tactile-box p-3.5 rounded-2xl space-y-2"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                      {link.title}
                    </span>
                    <span className="font-mono font-bold text-[#facc15] shrink-0">
                      {linkClicks} klik ({percentage}%)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#070a14] border border-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-[#facc15] rounded-full transition-all duration-500"
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
