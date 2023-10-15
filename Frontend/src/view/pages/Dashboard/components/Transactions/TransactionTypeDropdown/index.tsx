import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../../components/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../../components/DropdownMenu';
import { IncomeIcon } from '../../../../../components/icons/IncomeIcon';
import { ExpensesIcon } from '../../../../../components/icons/ExpensesIcon';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2'>
          <TransactionsIcon />
          <span className='font-Montserrat tracking-wide'>Transactions</span>
          <ChevronDownIcon className='text-gray-900 font-medium' />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-[250px] ml-[90px] mt-2'>
        <DropdownMenu.Item className='gap-3'>
          <IncomeIcon />
          Incomes
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-3'>
          <ExpensesIcon />
          Expenses
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-3'>
          <TransactionsIcon />
          Transactions
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}