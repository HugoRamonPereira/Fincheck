import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className='bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-lg font-Montserrat text-gray-100 tracking-wider disabled:text-gray-400 disabled:cursor-not-allowed transition-all'
    />
  );
}