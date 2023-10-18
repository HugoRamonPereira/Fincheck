import { PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {
  const { openNewAccountModal } = useDashboard();

  return (
    <div className='fixed right-4 bottom-4'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='bg-teal-900 h-12 w-12 rounded-full flex items-center justify-center text-white'>
            <PlusIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className='mr-[18px] mb-2'>
          <DropdownMenu.Item className='gap-2'>
            <CategoryIcon type='income' />
            New income
          </DropdownMenu.Item>
          <DropdownMenu.Item className='gap-2'>
            <CategoryIcon type='expense' />
            New expense
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='gap-2'
            onSelect={openNewAccountModal}
          >
            <BankAccountIcon />
            New account
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
