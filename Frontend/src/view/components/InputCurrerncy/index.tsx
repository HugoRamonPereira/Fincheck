import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../../../app/utils/cn';

interface InputCurrencyProps {
  error?: string;
  value?: string;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator='.'
        decimalSeparator=','
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={cn(
          'w-full text-gray-800 text-[32px] font-Montserrat outline-none',
          error && 'text-red-900'
        )}
      />

      {error && (
        <div className={'flex items-center gap-1 text-red-900'}>
          <CrossCircledIcon />
          <span className='text-red-900 text-xs font-Montserrat'>{error}</span>
        </div>
      )}
    </div>
  );
}