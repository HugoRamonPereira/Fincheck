import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
}

export function AccountCard({ color, name, balance }: AccountCardProps) {
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <CategoryIcon type="income" />
        <span className='font-Montserrat font-light block mt-4'>
          {name}
        </span>
      </div>

      <div className='font-Montserrat'>
        <span className='font-normal block'>
          {formatCurrency(balance)}
        </span>
        <small className='text-gray-600 text-sm font-light'>Current balance</small>
      </div>
    </div>
  );
}