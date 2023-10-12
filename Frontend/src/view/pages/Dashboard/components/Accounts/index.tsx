import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SwiperNavigation } from './SwiperNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    valuesVisible,
    toggleValuesVisibility,
    isLoading
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className='flex flex-1 items-center justify-center'>
          <Spinner className='text-teal-950/50 fill-white w-10 h-10' />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className="block text-white font-light font-Montserrat tracking-wide">
          Total balance
            </span>

            <div className='flex items-center gap-2'>
              <p className={cn(
                'font-Montserrat text-white text-2xl tracking-wide',
                !valuesVisible && 'blur-[10px]'
              )}>
                {formatCurrency(1000)}
              </p>
              <button
                className='h-10 w-10 flex items-center justify-center'
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!valuesVisible} />
              </button>
            </div>
          </div>

          <div className='flex flex-1 flex-col justify-end mt-10 md:mt-0'>
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 480 ? 2.1 : 1.2}
                onSlideChange={swiper => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd
                  });
                }}
              >
                <div className='flex items-center justify-between mb-4' slot='container-start'>
                  <p className='font-Montserrat text-white font-light text-lg tracking-wide'>My accounts</p>

                  <SwiperNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
                </div>

                <SwiperSlide>
                  <AccountCard
                    color='#7050F2'
                    name='Nubank'
                    balance={1000.50}
                    type='CASH'
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <AccountCard
                    color='#333'
                    name='XP'
                    balance={1000.50}
                    type='INVESTMENT'
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <AccountCard
                    color='#0F0'
                    name='Carteira'
                    balance={1000.50}
                    type='CASH'
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}