import { PropsWithChildren, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../../app/utils/cn';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
  buttonRightAction?: ReactNode;
  onClose?(): void;
}

export function Modal({ open, title, buttonRightAction, onClose, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
            'data-[state=open]:animate-overlayShow'
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
            'data-[state=open]:animate-contentShow'
          )}
        >
          <header className="flex items-center justify-between h-12 text-gray-800">
            <button
              className='flex items-center justify-center h-12 w-12 outline-none'
              onClick={onClose}
            >
              <Cross1Icon className='w-5 h-5' />
            </button>
            <span
              className='font-Montserrat font-medium'
            >
              {title}
            </span>
            <div
              className='flex items-center justify-center h-12 w-12'
            >
              {buttonRightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
