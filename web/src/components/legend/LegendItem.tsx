import { ReactElement } from 'react';

export function LegendItem({
  label,
  unit,
  children,
}: {
  label: string;
  unit: string;
  children: ReactElement;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-sm bg-[#1f1f22]/85 backdrop-blur-xl border border-[#262528]">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f9f5f8]">
        {label}
      </span>
      <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#adaaad] mb-1">
        {unit}
      </span>
      <div className="w-full px-2">{children}</div>
    </div>
  );
}
