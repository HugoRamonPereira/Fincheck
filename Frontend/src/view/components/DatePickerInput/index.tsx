import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/cn';
import { useState } from 'react';
import { formatDate } from '../../../app/utils/formatDate';
import { Popover } from '../Popover';
import { DatePicker } from '../DatePicker';

interface DatePickerProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({ error, className, onChange, value }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn('bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] font-Montserrat text-gray-800 focus:border-gray-800        transition-all outline-none text-left relative pt-4',
              error && '!border-red-900',
              className
            )}
          >
            <span className='absolute text-gray-700 text-[10px] left-[13px] top-2 font-Montserrat pointer-events-none'>
              Date
            </span>
            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className='flex items-center gap-1 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-red-900 text-xs font-Montserrat'>{error}</span>
        </div>
      )}
    </div>
  );
}