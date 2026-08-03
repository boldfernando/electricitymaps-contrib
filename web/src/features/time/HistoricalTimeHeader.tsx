import { Button } from 'components/Button';
import { addDays, subDays, subHours } from 'date-fns';
import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight, Radio, X } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { RouteParameters } from 'types';
import { MAX_HISTORICAL_LOOKBACK_DAYS } from 'utils/constants';
import { useNavigateWithParameters } from 'utils/helpers';
import { endDatetimeAtom } from 'utils/state/atoms';

function HistoricalTimeHeader({
  floating,
  onClose,
}: {
  floating?: boolean;
  onClose: () => void;
}) {
  const endDatetime = useAtomValue(endDatetimeAtom);
  const { urlDatetime } = useParams<RouteParameters>();
  const navigate = useNavigateWithParameters();
  const { t } = useTranslation();

  const isWithinHistoricalLimit = useMemo(() => {
    if (!urlDatetime) {
      return true;
    }

    const targetDate = subHours(new Date(urlDatetime), 1);

    const maxHistoricalDate = subDays(new Date(), MAX_HISTORICAL_LOOKBACK_DAYS);

    return targetDate >= maxHistoricalDate;
  }, [urlDatetime]);

  function handleRightClick() {
    if (!endDatetime || !urlDatetime) {
      return;
    }

    const nextDay = addDays(endDatetime, 1);

    const fourHoursAgo = subHours(new Date(), 4);

    if (nextDay >= fourHoursAgo) {
      navigate({ datetime: '' });
      return;
    }
    navigate({ datetime: nextDay.toISOString() });
  }

  function handleLeftClick() {
    if (!endDatetime || !isWithinHistoricalLimit) {
      return;
    }

    const previousDay = subDays(endDatetime, 1);

    navigate({ datetime: previousDay.toISOString() });
  }

  function handleLatestClick() {
    navigate({ datetime: '' });
  }

  const floatingStyle = floating
    ? 'border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'
    : '';

  return (
    <div className="flex h-6 w-full flex-row items-center justify-between text-xs font-semibold">
      <div
        className={`relative flex items-center justify-between rounded-sm bg-neutral-100 px-1 py-0.5 dark:bg-[#1f1f22] tracking-[0.1em] uppercase ${floatingStyle}`}
      >
        <Button
          backgroundClasses="bg-transparent"
          onClick={handleLeftClick}
          size="sm"
          type="tertiary"
          isDisabled={!isWithinHistoricalLimit}
          icon={
            <ChevronLeft
              size={20}
              className={twMerge(
                'text-[#ff6600]',
                !isWithinHistoricalLimit && 'opacity-50'
              )}
            />
          }
        />
        {t('time-controller.navigate')} 24h
        <Button
          backgroundClasses="bg-transparent"
          size="sm"
          onClick={handleRightClick}
          type="tertiary"
          isDisabled={!urlDatetime}
          icon={
            <ChevronRight
              className={twMerge('text-[#ff6600]', !urlDatetime && 'opacity-50')}
              size={20}
            />
          }
        />
      </div>
      <div className="semibold relative mr-0 flex">
        <Button
          foregroundClasses="text-xs font-semibold uppercase tracking-[0.1em]"
          backgroundClasses={`rounded-sm bg-transparent z-1 ${floatingStyle}`}
          size="sm"
          type="tertiary"
          onClick={handleLatestClick}
          isDisabled={!urlDatetime}
          icon={
            <Radio
              size={20}
              className={urlDatetime ? 'text-[#ff6600]' : 'text-[#ff0066]'}
            />
          }
        >
          {t('time-controller.live')}
        </Button>
        <Button
          backgroundClasses={`rounded-sm bg-transparent mr-0 z-1 ${floatingStyle}`}
          size="sm"
          type="tertiary"
          onClick={onClose}
          icon={<X size={20} className="text-neutral-500 hover:text-white" />}
        />
      </div>
    </div>
  );
}

export default memo(HistoricalTimeHeader);
