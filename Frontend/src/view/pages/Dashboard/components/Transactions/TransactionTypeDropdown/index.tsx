import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../../components/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../../components/DropdownMenu';
import { IncomeIcon } from '../../../../../components/icons/IncomeIcon';
import { ExpensesIcon } from '../../../../../components/icons/ExpensesIcon';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2 p-3 sm:p-0'>
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}
          <span className='font-Montserrat tracking-wide'>
            {selectedType === 'INCOME' && 'Incomes'}
            {selectedType === 'EXPENSE' && 'Expenses'}
            {selectedType === undefined && 'Transactions'}
          </span>
          <ChevronDownIcon className='text-gray-900 font-medium' />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-[250px] ml-[90px] mt-2'>
        <DropdownMenu.Item className='gap-3' onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Incomes
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-3' onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Expenses
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-3' onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transactions
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}