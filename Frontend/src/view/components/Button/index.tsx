import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/cn';
import { Spinner } from '../Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  variant?: 'dangerFill' | 'dangerOutline'
}

export function Button({ className, isLoading, disabled, variant, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 text-sm sm:text-base px-6 h-12 rounded-lg font-Montserrat text-gray-100 tracking-wider disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center',
        variant === 'dangerFill' && 'bg-red-900 hover:bg-red-800',
        variant === 'dangerOutline' && 'bg-transparent border border-red-900 text-red-900 hover:bg-red-50',
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className='w-6 h-6' />}
    </button>
  );
}