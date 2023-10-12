import { cn } from '../../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../../DashboardContext/useDashboard';
interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT'
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  const { valuesVisible } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
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
          {formatCurrency(balance)}
        </span>
        <small className='text-gray-600 text-sm font-light'>Current balance</small>
      </div>
    </div>
  );
}