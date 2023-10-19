import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/cn';
import { useState } from 'react';
import { formatDate } from '../../../app/utils/formatDate';

interface DatePickerProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ error, className }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
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

      {error && (
        <div className='flex items-center gap-1 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-red-900 text-xs font-Montserrat'>{error}</span>
        </div>
      )}
    </div>
  );
}