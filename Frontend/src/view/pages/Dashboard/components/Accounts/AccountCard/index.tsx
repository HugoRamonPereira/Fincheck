import { BankAccount } from '../../../../../../app/entities/BankAccount';
import { cn } from '../../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../../DashboardContext/useDashboard';
interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, name, currentBalance, type } = data;
  const { valuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      //By passing role as button I am turning this div into a button so that we can click it
      role='button'
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className='font-Montserrat font-light block mt-4'>
          {name}
        </span>
      </div>

      <div className='font-Montserrat'>
        <span className={cn(
          'font-normal block',
          !valuesVisible && 'blur-[7px]'
        )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className='text-gray-600 text-sm font-light'>Current balance</small>
      </div>
    </div>
  );
}