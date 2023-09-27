import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This util function was created for us to avoid the import of Tailwind-Merge and also CLSX
// We do it here in this file and then we export it to reuse it.