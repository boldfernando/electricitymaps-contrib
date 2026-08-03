import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useFeatureFlag } from 'features/feature-flags/api';
import { TFunction } from 'i18next';
import { ChevronsUpDown, FlaskConicalIcon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TimeRange } from 'utils/constants';

import { useDropdownCtl } from './MoreOptionsDropdown';

const ICON_SIZE = 14;

const createOption = (time: TimeRange, t: TFunction) => ({
  value: time,
  label: t(`time-controller.${time}`),
  dataTestId: `time-controller-${time}`,
  isExperimental: time === TimeRange.H24,
});

export interface TimeRangeSelectorProps {
  timeRange: TimeRange;
  onToggleGroupClick: (newTimeRange: TimeRange) => void;
}

function TimeRangeSelector({ timeRange, onToggleGroupClick }: TimeRangeSelectorProps) {
  const { t } = useTranslation();
  const { isOpen, onToggleDropdown } = useDropdownCtl();
  const is5MinGranularityEnabled = useFeatureFlag('five-minute-granularity');

  const options = useMemo(
    () =>
      Object.values(TimeRange)
        .filter((value) => {
          if (!is5MinGranularityEnabled && value === TimeRange.H24) {
            return false;
          }
          return true;
        })
        .map((value) => ({
          ...createOption(value, t),
          onClick: () => onToggleGroupClick(value),
        })),
    [is5MinGranularityEnabled, t, onToggleGroupClick]
  );

  const selectedLabel = useMemo(
    () => options.find(({ value }) => value === timeRange)?.label,
    [options, timeRange]
  );

  return (
    <DropdownMenu.Root onOpenChange={onToggleDropdown} open={isOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button className="flex w-36 flex-row items-center justify-between rounded-sm bg-neutral-100 px-2 py-1 text-xs font-semibold uppercase outline-none transition-colors border-b-2 border-neutral-400/20 hover:border-b-[#ff6600] focus:border-b-[#ff6600] data-[state=open]:border-b-[#ff6600] dark:bg-[#1f1f22] tracking-[0.15em]">
          <span>
            <span className="text-neutral-500 mr-1">WINDOW /</span>
            {selectedLabel}
          </span>
          <ChevronsUpDown size={ICON_SIZE} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={4}
        className="z-50 w-36 rounded-sm border border-neutral-200 bg-white dark:border-[#262528] dark:bg-[#1f1f22] p-1"
      >
        {options.map(({ value, label, dataTestId, onClick, isExperimental }) => (
          <DropdownMenu.Item
            key={`group-item-${value}-${label}`}
            data-testid={dataTestId}
            aria-label={label}
            onClick={onClick}
            className="flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] hover:bg-neutral-100 focus-visible:outline-none dark:hover:bg-[#262528]"
          >
            {label}{' '}
            {isExperimental && (
              <FlaskConicalIcon size={ICON_SIZE} className="text-[#ff6600]" />
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default memo(TimeRangeSelector);
