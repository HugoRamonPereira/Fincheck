import * as RadixPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { cn } from '../../../app/utils/cn';

export function PopoverRoot({ children }: { children: ReactNode }) {
  return (
    <RadixPopover.Root>
      {children}
    </RadixPopover.Root>
  );
}

export function PopoverTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixPopover.Trigger asChild>
      {children}
    </RadixPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]',
          'data-[side=bottom]:animate-slideUpAndFade',
          'data-[side=top]:animate-slideDownAndFade',
          className
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
};