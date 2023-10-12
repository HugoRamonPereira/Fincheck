import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { SwiperOption } from './SwiperOption';
import { SwiperNavigation } from './SwiperNavigation';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useTransactionsController } from './useTransactionsController';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import noTransactionsIllustration from '../../../../../assets/images/empty-state.svg';

export function Transactions() {
  const { valuesVisible, isInitialLoading, isTransactionsLoading, transactions } = useTransactionsController();
  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 flex flex-col rounded-2xl w-full h-full sm:px-5 sm:py-10 md:p-10 border border-gray-300">
      {isInitialLoading && (
        <div className='flex flex-1 items-center justify-center'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header className="">
            <div className='flex items-center justify-between'>
              <button className='flex items-center gap-2'>
                <TransactionsIcon />
                <span className='font-Montserrat tracking-wide'>Transactions</span>
                <ChevronDownIcon className='text-gray-900 font-medium' />
              </button>
              <button className=''>
                <FilterIcon />
              </button>
            </div>
            <div className='mt-6 relative'>
              <Swiper
                slidesPerView={3}
                centeredSlides
              >
                <SwiperNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SwiperOption
                        index={index}
                        isActive={isActive}
                        month={month}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">

            {isTransactionsLoading && (
              <div className='flex flex-1 items-center justify-center h-full'>
                <Spinner className='w-10 h-10' />
              </div>
            )}

            {(!hasTransactions && !isTransactionsLoading) && (
              <div className='flex flex-col h-full items-center justify-center'>
                <img src={noTransactionsIllustration} alt='no transactions' />
                <p className='font-Montserrat tracking-wide text-gray-700'>No transactions found!</p>
              </div>
            )}

            {(hasTransactions && !isTransactionsLoading) && (
              <>
                <div className='bg-white rounded-2xl p-4 flex items-center justify-between gap-4'>
                  <div className='flex flex-1 items-center gap-3'>
                    <CategoryIcon type='expense' />
                    <div>
                      <p className='font-Montserrat font-medium'>Lunch</p>
                      <span className='font-Montserrat text-sm text-gray-600'>04/06/2022</span>
                    </div>
                  </div>

                  <span className={cn(
                    'font-Montserrat text-red-800',
                    !valuesVisible && 'blur-[7px]'
                  )}>
                    {formatCurrency(-1240)}
                  </span>
                </div>
                <div className='bg-white rounded-2xl p-4 flex items-center justify-between gap-4'>
                  <div className='flex flex-1 items-center gap-3'>
                    <CategoryIcon type='income' />
                    <div>
                      <p className='font-Montserrat font-medium'>Lunch</p>
                      <span className='font-Montserrat text-sm text-gray-600'>04/06/2022</span>
                    </div>
                  </div>

                  <span className={cn(
                    'font-Montserrat text-green-800',
                    !valuesVisible && 'blur-[7px]'
                  )}>
                    {formatCurrency(4500)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}