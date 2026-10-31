import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xl border border-zinc-700 animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
