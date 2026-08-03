import { CountryFlag } from 'components/Flag';
import LabelTooltip from 'components/tooltips/LabelTooltip';
import TooltipWrapper from 'components/tooltips/TooltipWrapper';
import { Info } from 'lucide-react';
import { memo } from 'react';
import { getZoneName } from 'translation/translation';

import { getDisclaimer } from './util';

const MAX_TITLE_LENGTH = 19;

function ZoneHeaderTitle({
  zoneId,
  zoneNameFull,
}: {
  zoneId: string;
  zoneNameFull: string;
}) {
  const zoneName = getZoneName(zoneId);
  const showTooltip = zoneName !== zoneNameFull || zoneName.length >= MAX_TITLE_LENGTH;
  const disclaimer = getDisclaimer(zoneId);

  return (
    <div className="flex w-full flex-col pr-2 md:pr-4">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#adaaad]">
        ZONE / {zoneId.toUpperCase()}
      </span>
      <div className="grid grid-cols-[32px_minmax(0,1fr)] items-center gap-3 min-h-[34px] mt-1">
        <CountryFlag
          zoneId={zoneId}
          size={32}
          className="shadow-[0_0px_3px_rgba(0,0,0,0.2)] rounded-sm w-[32px] h-[22px] object-cover flex-shrink-0"
        />
        <div className="flex items-center gap-2 min-w-0">
          <TooltipWrapper
            tooltipContent={
              showTooltip ? (
                <LabelTooltip className="max-w-[400px]">{zoneNameFull}</LabelTooltip>
              ) : undefined
            }
            side="bottom"
          >
            <h1
              className="truncate text-[20px] leading-[1.1] font-[750] tracking-[-0.02em] text-[#f9f5f8]"
              data-testid="zone-name"
            >
              {zoneName}
            </h1>
          </TooltipWrapper>
          {disclaimer && (
            <TooltipWrapper
              side="bottom"
              tooltipContent={<LabelTooltip>{disclaimer}</LabelTooltip>}
            >
              <Info size={16} className="min-h-4 min-w-4 text-[#adaaad]" />
            </TooltipWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ZoneHeaderTitle);
