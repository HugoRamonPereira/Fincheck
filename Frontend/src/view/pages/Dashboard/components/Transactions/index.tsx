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
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { FiltersModal } from './FiltersModal';
import { formatDate } from '../../../../../app/utils/formatDate';
import { EditTransactionModal } from '../../modals/EditTransactionModal';

export function Transactions() {
  const {
    valuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited
  } = useTransactionsController();
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
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header className="">
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>
            <div className='mt-6 relative'>
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
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
            {/* Loading for the whole section of transactions */}
            {isLoading && (
              <div className='flex flex-1 items-center justify-center h-full'>
                <Spinner className='w-10 h-10' />
              </div>
            )}
            {/* Loading for transactions of each month */}
            {/* Some months can have transactions or not */}
            {(!hasTransactions && !isLoading) && (
              <div className='flex flex-col h-full items-center justify-center'>
                <img src={noTransactionsIllustration} alt='no transactions' />
                <p className='tracking-wide text-gray-700'>No transactions found!</p>
              </div>
            )}
            {/* Finally the transactions are listed here below */}

            {(hasTransactions && !isLoading) && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className='bg-white rounded-2xl p-4 flex items-center justify-between gap-4'
                    role='button'
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className='flex flex-1 items-center gap-3'>
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />
                      <div>
                        <p className='font-medium'>
                          {transaction.name}
                        </p>
                        <span className='text-sm text-gray-600'>
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span className={cn(
                      'tracking-wide',
                      transaction.type === 'EXPENSE' ? ' text-red-800' : 'text-green-800',
                      !valuesVisible && 'blur-[7px]'
                    )}>
                      {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}