import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { PropsWithChildren } from 'react';
import { cn } from '../../../app/utils/cn';

interface DropdownMenuProps extends PropsWithChildren {
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Root>
      {children}
    </RadixDropdownMenu.Root>
  );
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    // The prop asChild had to be added because we were having a warning in the console
    // The Radix trigger is a button and we were passing as children another button
    // And buttons cannot be descendent of another button
    // We passed as child so that the properties of Radix Trigger are passed down to its first child which is gonna be a button
    // Radix creates an id and removes the 2 buttons who were nested into each other and the warning disappears
    <RadixDropdownMenu.Trigger className='outline-none' asChild>
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

function DropdownMenuContent({ children, className }: DropdownMenuProps) {
  return (
    <RadixDropdownMenu.Content
      className={cn(
        'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
        'data-[side=bottom]:animate-slideUpAndFade',
        'data-[side=top]:animate-slideDownAndFade',
        className
      )}
    >
      {children}
    </RadixDropdownMenu.Content>
  );
}

function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return (
    <RadixDropdownMenu.Portal>
      {children}
    </RadixDropdownMenu.Portal>
  );
}

function DropdownMenuItem({ children, className, onSelect }: DropdownMenuProps) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] flex items-center px-4 py-2 outline-none font-Montserrat text-gray-800 text-sm data-[highlighted]:bg-gray-100 data-[highlighted]:rounded-lg transition-colors cursor-pointer',
        className
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};