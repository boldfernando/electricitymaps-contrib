import * as Portal from '@radix-ui/react-portal';
import useGetState from 'api/getState';
import EstimationBadge from 'components/EstimationBadge';
import GlassContainer from 'components/GlassContainer';
import NoDataBadge from 'components/NoDataBadge';
import OutageBadge from 'components/OutageBadge';
import { TimeDisplay } from 'components/TimeDisplay';
import { getSafeTooltipPosition } from 'components/tooltips/utilities';
import ZoneGaugesWithCO2Square from 'components/ZoneGauges';
import { ZoneName } from 'components/ZoneName';
import { useAtomValue } from 'jotai';
import { CircleDashed, TrendingUpDown } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { RouteParameters, StateZoneData } from 'types';
import { EstimationMethods, isTSAModel } from 'utils/constants';
import getEstimationOrAggregationTranslation from 'utils/getEstimationTranslation';
import { round } from 'utils/helpers';
import {
  displayByEmissionsAtom,
  isConsumptionAtom,
  isFiveMinuteOrHourlyGranularityAtom,
  selectedDatetimeStringAtom,
  timeRangeAtom,
} from 'utils/state/atoms';

import { hoveredZoneAtom, mapMovingAtom, mousePositionAtom } from './mapAtoms';

const emptyZoneData: StateZoneData = {
  p: {},
  c: {},
};

export const TooltipInner = memo(function TooltipInner({
  zoneData,
  zoneId,
}: {
  zoneId: string;
  zoneData?: StateZoneData;
}) {
  const hasZoneData = Boolean(zoneData);
  zoneData ??= emptyZoneData;
  const { em: estimationMethod, ep: estimationPercentage, o } = zoneData;

  return (
    <div className="flex w-full flex-col gap-2 py-3 text-center">
      <div className="flex flex-col px-3">
        <span className="self-start text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff6600]">
          HOVER / {zoneId.toUpperCase()}
        </span>
        <div className="flex w-full flex-row justify-between mt-1">
          <ZoneName zone={zoneId} textStyle="font-medium text-base font-poppins" />
          <DataValidityBadge
            hasOutage={Boolean(o)}
            estimatedMethod={estimationMethod || undefined}
            estimatedPercentage={round(estimationPercentage ?? 0, 0)}
            hasZoneData={hasZoneData}
          />
        </div>
        <TimeDisplay
          zoneId={zoneId}
          className="self-start text-sm text-neutral-600 dark:text-neutral-400"
        />
      </div>
      <ZoneGaugesWithCO2Square zoneData={zoneData} classNames="justify-evenly" />
    </div>
  );
});

TooltipInner.displayName = 'TooltipInner';

export const DataValidityBadge = memo(function DataValidityBadge({
  hasOutage,
  estimatedMethod,
  estimatedPercentage,
  hasZoneData,
}: {
  hasOutage: boolean;
  estimatedMethod?: EstimationMethods;
  estimatedPercentage?: number | undefined;
  hasZoneData: boolean;
}) {
  const { t } = useTranslation();
  const isFineGranularity = useAtomValue(isFiveMinuteOrHourlyGranularityAtom);

  if (!hasZoneData) {
    return <NoDataBadge />;
  }
  if (hasOutage) {
    return <OutageBadge />;
  }
  if (estimatedMethod == null && isFineGranularity) {
    // No aggregation or estimation pill to show
    return null;
  }
  const text = getEstimationOrAggregationTranslation(
    t,
    'pill',
    !isFineGranularity,
    estimatedMethod,
    estimatedPercentage
  );
  if (isTSAModel(estimatedMethod)) {
    return <EstimationBadge text={text} Icon={CircleDashed} isPreliminary={true} />;
  }
  return <EstimationBadge text={text} Icon={TrendingUpDown} />;
});

DataValidityBadge.displayName = 'DataValidityBadge';

export default function MapTooltip() {
  const mousePosition = useAtomValue(mousePositionAtom);
  const hoveredZone = useAtomValue(hoveredZoneAtom);
  const selectedDatetimeString = useAtomValue(selectedDatetimeStringAtom);
  const isMapMoving = useAtomValue(mapMovingAtom);
  const { data } = useGetState();
  const { zoneId: selectedZoneId } = useParams<RouteParameters>();

  // Read the remaining analytic key atoms to document the full comparison chain.
  // These are global atoms shared by both the tooltip and the inspector panel.
  // When zoneId matches, the full analytic key is necessarily identical because:
  //   - datetime:       both read selectedDatetimeStringAtom (same value)
  //   - aggregate:      both read timeRangeAtom (same value)
  //   - layer:          both read displayByEmissionsAtom (same value)
  //   - accountingMode: both read isConsumptionAtom (same value)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _timeRange = useAtomValue(timeRangeAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _isConsumption = useAtomValue(isConsumptionAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _displayByEmissions = useAtomValue(displayByEmissionsAtom);

  if (!hoveredZone || isMapMoving) {
    return null;
  }

  const { zoneId } = hoveredZone;

  // Full analytic key comparison: zoneId equality implies full key equality
  // because datetime, aggregate, layer and accountingMode are shared global atoms.
  if (zoneId === selectedZoneId) {
    return null;
  }

  const { x, y } = mousePosition;
  const zoneData = data?.datetimes[selectedDatetimeString]?.z[zoneId];

  const screenWidth = window.innerWidth;
  const tooltipWithDataPositon = getSafeTooltipPosition(x, y, screenWidth, 361, 170);

  return (
    <Portal.Root className="absolute left-0 top-0 hidden h-0 w-0 md:block">
      <GlassContainer
        className="pointer-events-none relative w-[361px]"
        style={{ left: tooltipWithDataPositon.x, top: tooltipWithDataPositon.y }}
      >
        <TooltipInner zoneData={zoneData} zoneId={zoneId} />
      </GlassContainer>
    </Portal.Root>
  );
}
