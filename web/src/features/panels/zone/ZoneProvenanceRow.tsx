import { FormattedTime } from 'components/Time';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ZoneProvenanceRowProps {
  source?: string[];
  updatedAt?: string;
  isConsumption?: boolean;
  status?: 'LIVE' | 'HISTORICAL' | 'ESTIMATED' | 'STALE' | 'UNAVAILABLE' | 'UNKNOWN';
}

function ZoneProvenanceRow({
  source,
  updatedAt,
  isConsumption,
  status = 'UNKNOWN',
}: ZoneProvenanceRowProps) {
  const { i18n, t } = useTranslation();

  const sourceText = source && source.length > 0 ? source.join(', ') : 'UNKNOWN';
  const modeText = isConsumption
    ? t('consumption', 'CONSUMPTION')
    : t('production', 'PRODUCTION');

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#adaaad]">
      <div className="flex items-center gap-1">
        <span className="text-[#f9f5f8]/50">SOURCE:</span>
        <span className="text-[#f9f5f8]">{sourceText}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[#f9f5f8]/50">UPDATED:</span>
        <span className="text-[#f9f5f8]">
          {updatedAt ? (
            <FormattedTime datetime={new Date(updatedAt)} language={i18n.languages[0]} />
          ) : (
            'N/A'
          )}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[#f9f5f8]/50">MODE:</span>
        <span className="text-[#f9f5f8]">{modeText}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[#f9f5f8]/50">STATUS:</span>
        <span className={status === 'LIVE' ? 'text-[#ff0066]' : 'text-[#f9f5f8]'}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default memo(ZoneProvenanceRow);
