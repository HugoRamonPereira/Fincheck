import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { SwiperOption } from './SwiperOption';
import { SwiperNavigation } from './SwiperNavigation';

export function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10">
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
      <div className="mt-4">
        Content
      </div>
    </div>
  );
}