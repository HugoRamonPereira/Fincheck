import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Modal } from '../../../../../components/Modal';
import { Button } from '../../../../../components/Button';
import { useFiltersModalController } from './useFiltersModalController';
import { cn } from '../../../../../../app/utils/cn';

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(
    filters: {
      bankAccountId: string | undefined;
      year: number;
    }
  ): void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModalController();

  return (
    <Modal
      open={open}
      title='Filters'
      onClose={onClose}
    >
      <div>
        <span className='font-Montserrat font-medium pl-4'>
        Account
        </span>

        <div className='space-y-2 mt-4'>
          {accounts.map(account => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccountId(account.id)}
              className={cn(
                'p-2 pl-4 rounded-xl w-full font-Montserrat text-left text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer',
                account.id === selectedBankAccountId && '!bg-gray-200'
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-10 text-gray-800'>
        <span className='font-Montserrat font-medium flex justify-center'>
          Year
        </span>

        <div className='mt-2 w-52 flex items-center justify-between mx-auto'>
          <button
            className='w-12 h-12 flex items-center justify-center'
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className='w-6 h-6' />
          </button>
          <div className='flex-1 font-Montserrat text-center tracking-wider'>
            <span className='text-sm'>
              {selectedYear}
            </span>
          </div>
          <button
            className='w-12 h-12 flex items-center justify-center'
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className='w-6 h-6' />
          </button>
        </div>
      </div>

      <Button
        className='w-full mt-10'
        onClick={() => onApplyFilters({
          bankAccountId: selectedBankAccountId,
          year: selectedYear
        })}
      >
        Apply Filters
      </Button>
    </Modal>
  );
}