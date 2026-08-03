import { memo } from 'react';

import InfoIconWithPadding from './InfoIconWithPadding';
import LabelTooltip from './tooltips/LabelTooltip';
import TooltipWrapper from './tooltips/TooltipWrapper';

export interface CircularGaugeProps {
  ratio: number;
  name: string;
  tooltipContent?: string | JSX.Element;
  testId?: string;
}

function CircularGauge({ ratio, name, testId, tooltipContent }: CircularGaugeProps) {
  const percentage = Number.isFinite(ratio) ? Math.round(ratio * 100) : null;

  return (
    <div className="flex w-full flex-col">
      <TooltipWrapper
        tooltipContent={<LabelTooltip>{tooltipContent}</LabelTooltip>}
        side="bottom"
        sideOffset={8}
      >
        <div
          data-testid={testId}
          className="relative flex w-full flex-col rounded-sm bg-[#1f1f22] p-3 shadow-sm border border-neutral-800 transition-all duration-200 ease-[cubic-bezier(0.2,0,0.1,1)] hover:bg-[#262528]"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#adaaad]">
              {name}
            </span>
            {tooltipContent && <InfoIconWithPadding />}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black tracking-tighter text-[#f9f5f8]">
              {percentage === null ? 'N/A' : `${percentage}%`}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-sm bg-[#131315]">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-[cubic-bezier(0.2,0,0.1,1)]"
              style={{ width: `${Math.min(100, Math.max(0, percentage || 0))}%` }}
            />
          </div>
        </div>
      </TooltipWrapper>
    </div>
  );
}

export default memo(CircularGauge);
