import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#070a14]/95 text-[#facc15] px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.25)] border border-[#facc15]/60 backdrop-blur-md">
      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
      <span>{message}</span>
    </div>
  );
}
