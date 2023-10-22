import { ExitIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../DropdownMenu';
import { useAuth } from '../../../app/hooks/useAuth';

export function UserMenu() {
  const { user, signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-200">
          <span className="text-sm text-teal-900 font-medium ">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='w-32 mr-8 mt-2'>
          <DropdownMenu.Item
            className='flex items-center justify-between'
            onSelect={signout}
          >
            Log out
            <ExitIcon className='w-4 h-4' />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}