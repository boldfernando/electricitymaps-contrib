import LabelTooltip from 'components/tooltips/LabelTooltip';
import TooltipWrapper from 'components/tooltips/TooltipWrapper';
import { useNavigationEvent, useTrackEvent } from 'hooks/useTrackEvent';
import type { LucideIcon } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem } from './Sidebar';

export function MenuItem({
  to,
  Icon,
  label,
  isActive = false,
}: {
  to: string;
  Icon: LucideIcon;
  label: string;
  isActive?: boolean;
}) {
  const trackEvent = useTrackEvent();
  const trackNavigationClick = useNavigationEvent(trackEvent, label);

  return (
    <TooltipWrapper
      tooltipContent={<LabelTooltip>{label}</LabelTooltip>}
      side="right"
      sideOffset={4}
    >
      <SidebarMenuItem className="flex flex-col">
        <SidebarMenuButton
          asChild
          className="p-2 text-neutral-600 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 data-[active=true]:bg-[#1f1f22] data-[active=true]:shadow-[inset_2px_0_0_#ff6600] data-[active=true]:font-semibold data-[active=true]:text-[#f9f5f8] group-data-[collapsible=icon]:!p-1.5 dark:text-neutral-200 group-data-[collapsible=icon]:[&>svg]:size-5"
          isActive={isActive}
          onClick={trackNavigationClick}
        >
          <a href={to}>
            <Icon className="transition-[height,width] duration-200" />
            <span>{label}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </TooltipWrapper>
  );
}
