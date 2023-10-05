import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from '../AccountCard';

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="block text-white font-light font-Montserrat tracking-wide">Total balance</span>

        <div className='flex items-center gap-2'>
          <p className="font-Montserrat text-white text-2xl tracking-wide">R$ 1.000,00</p>
          <button className='h-10 w-10 flex items-center justify-center'>
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-end'>
        <div className='flex items-center justify-between'>
          <p className='font-Montserrat text-white font-light text-lg tracking-wide'>My accounts</p>

          <div className='flex gap-3'>
            <button
              className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
            >
              <ChevronLeftIcon className='text-white w-6 h-6' />
            </button>
            <button
              className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
            >
              <ChevronRightIcon className='text-white w-6 h-6' />
            </button>
          </div>
        </div>

        <div className='mt-4'>
          <AccountCard
            color='#7050F2'
            name='Nubank'
            balance={1000.50}
          />
        </div>
      </div>
    </div>
  );
}