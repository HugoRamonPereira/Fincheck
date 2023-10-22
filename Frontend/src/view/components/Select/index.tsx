import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/cn';
import { useState } from 'react';

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange(value: string): void;
}

export function Select({
  className,
  placeholder,
  options,
  error,
  value,
  onChange
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label className={cn(
          'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none',
          selectedValue && 'text-[10px] left-[13px] top-2 transition-all -translate-y-0'
        )}>
          {placeholder}
        </label>

        <RadixSelect.Root
          onValueChange={handleSelect}
          value={value}
        >
          <RadixSelect.Trigger
            className={cn('bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 focus:border-gray-800 transition-all outline-none text-left relative',
              error && '!border-red-900',
              className
            )}
          >
            <RadixSelect.Value />

            <RadixSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className='w-6 h-6 text-gray-800' />
            </RadixSelect.Icon>

          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]"
            >
              <RadixSelect.ScrollUpButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-2">
                {options.map(option => (
                  <RadixSelect.Item
                    key={option.value}
                    className='p-2 text-gray-800 text-sm data-[state=checked]:font-semibold outline-none data-[highlighted]:bg-gray-100 rounded-lg transition-colors'
                    value={option.value}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton
                className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
              >
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

      </div>
      {error && (
        <div className='flex items-center gap-1 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-red-900 text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
}