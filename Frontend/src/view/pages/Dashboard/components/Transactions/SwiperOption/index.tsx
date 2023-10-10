import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../../app/utils/cn';

interface SwiperOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SwiperOption({ isActive, month, index }: SwiperOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12 font-Montserrat text-sm',
        isActive && 'bg-white'
      )}
    >
      {month}
    </button>
  );
}