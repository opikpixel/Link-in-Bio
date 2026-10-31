import React from 'react';
import { Eye, MousePointerClick, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';

export default function AnalyticsView({ links, analytics, onResetStats }) {
  const totalClicks = links.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const totalViews = analytics?.totalViews || 1;
  const ctr = ((totalClicks / totalViews) * 100).toFixed(1);

  return (
    <section className="space-y-5">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-medium">Total Kunjungan</span>
            <Eye className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">{totalViews}</div>
          <p className="text-[11px] text-zinc-400">Tampilan profil terhitung</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-medium">Total Klik Tautan</span>
            <MousePointerClick className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">{totalClicks}</div>
          <p className="text-[11px] text-zinc-400">Seluruh klik tombol aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-medium">Rasio Klik (CTR)</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-zinc-900">{ctr}%</div>
          <p className="text-[11px] text-zinc-400">Rata-rata interaksi pengunjung</p>
        </div>
      </div>

      {/* DETAIL PER TAUTAN */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900">Performa Setiap Tautan</h3>
            <p className="text-xs text-zinc-500">
              Lihat tautan mana yang paling menarik perhatian audiens Anda.
            </p>
          </div>
          {onResetStats && (
            <button
              onClick={onResetStats}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-xs text-zinc-600 font-medium flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Angka</span>
            </button>
          )}
        </div>

        <div className="space-y-3 pt-2">
          {links.length === 0 ? (
            <div className="text-center py-8 text-zinc-400 text-xs">
              Belum ada tautan untuk dianalisis.
            </div>
          ) : (
            links.map((link, idx) => {
              const linkClicks = link.clicks || 0;
              const percentage = totalClicks > 0 ? ((linkClicks / totalClicks) * 100).toFixed(0) : 0;

              return (
                <div key={link.id || idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
                      {link.title}
                    </span>
                    <span className="font-bold text-zinc-800 shrink-0">
                      {linkClicks} klik ({percentage}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-zinc-900 rounded-full transition-all duration-500"
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
