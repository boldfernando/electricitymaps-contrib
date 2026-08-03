import { memo } from 'react';

function CapacityLegend({ text, unit }: { text: string; unit?: string }) {
  return (
    <div className="flex flex-row items-center gap-2 mb-2">
      <span className="h-2.5 w-2.5 rounded-sm bg-[#adaaad]" />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#adaaad]">
        {text} {unit && `(${unit})`}
      </span>
    </div>
  );
}

export default memo(CapacityLegend);
