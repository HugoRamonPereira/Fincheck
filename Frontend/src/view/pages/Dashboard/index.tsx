import { TrashIcon } from '@radix-ui/react-icons';
import { Logo } from '../../components/Logo';
import { Modal } from '../../components/Modal';
import { UserMenu } from '../../components/userMenu';
import { Accounts } from './components/Accounts';
import { DashboardProvider } from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="h-full w-full p-4 md:px-8 md:pb-8 pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className='flex flex-1 flex-col md:flex-row gap-4 max-h-full' >
          <div className='w-full md:w-1/2'>
            <Accounts />
          </div>
          <div className='w-full md:w-1/2'>
            <Transactions />
          </div>
        </main>
        <Fab />
        <Modal open title='Incomes' buttonRightAction={<TrashIcon />}>
          Content
        </Modal>
      </div>
    </DashboardProvider>
  );
}