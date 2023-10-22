import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SwiperNavigation } from './SwiperNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    valuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance
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
            <span className="block text-white font-light tracking-wide">
              Total balance
            </span>

            <div className='flex items-center gap-2'>
              <p className={cn(
                'text-white text-2xl tracking-wide',
                !valuesVisible && 'blur-[10px]'
              )}>
                {formatCurrency(currentBalance)}
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
            {accounts.length === 0 && (
              <>
                <div className='mb-4' slot='container-start'>
                  <p className='text-white font-light text-lg tracking-wide'>My accounts</p>
                </div>
                <button
                  className='flex flex-col items-center justify-center mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 gap-4 text-white'
                  onClick={openNewAccountModal}
                >
                  <div className='flex items-center justify-center w-11 h-11 rounded-full border-2 border-dashed border-white'>
                    <PlusIcon className='w-5 h-5' />
                  </div>
                  <span className='font-light tracking-wide'>Create a new account</span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
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
                    <p className='text-white font-light text-lg tracking-wide'>My accounts</p>

                    <SwiperNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>
                  {accounts.map(account => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account}/>
                    </SwiperSlide>
                  ))}

                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}