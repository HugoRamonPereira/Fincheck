import { Button } from '../Button';
import { Modal } from '../Modal';
import { TrashIcon } from '../icons/TrashIcon';

interface ConfirmDeletionModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeletionModal({ onConfirm, onClose, title, description, isLoading }: ConfirmDeletionModalProps) {
  return (
    <Modal open title='Delete' onClose={onClose}>
      <div className='flex flex-col items-center text-center gap-6'>
        <div className='w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center'>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>
        <p className='font-medium w-[200px] text-gray-800'>
          {title}
        </p>
        {description && (
          <p className='font-light text-gray-800'>
            {description}
          </p>
        )}
      </div>

      <div className='mt-10 space-y-4'>
        <Button
          className='w-full'
          variant='dangerFill'
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Yes, I want to delete
        </Button>
        <Button
          className='w-full'
          variant='dangerOutline'
          onClick={onClose}
          disabled={isLoading}
        >
          No, cancel
        </Button>
      </div>
    </Modal>
  );
}