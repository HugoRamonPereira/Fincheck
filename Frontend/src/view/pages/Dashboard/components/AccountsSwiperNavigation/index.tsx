import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

export function AccountsSwiperNavigation() {
  const swiper = useSwiper();

  return (
    <div className='flex gap-3'>
      <button
        className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className='text-white w-6 h-6' />
      </button>
      <button
        className='py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className='text-white w-6 h-6' />
      </button>
    </div>
  );
}