import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({ className, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 text-sm sm:text-base px-6 h-12 rounded-lg font-Montserrat text-gray-100 tracking-wider disabled:text-gray-400 disabled:cursor-not-allowed transition-all',
        className
      )}
      disabled={disabled || isLoading}
    />
  );
}