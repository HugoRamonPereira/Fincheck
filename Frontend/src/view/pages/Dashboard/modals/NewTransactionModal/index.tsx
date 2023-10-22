import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrerncy';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'New Expense' : 'New Income'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div className='flex items-center gap-2 '>
            <span className='text-gray-600 text-lg'>R$</span>
            <Controller
              control={control}
              name='value'
              defaultValue='0'
              render={({ field: { onChange, value}}) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <span className='text-gray-600 text-xs tracking-wide'>
            Value {isExpense ? 'of the expense' : 'of the income'}
          </span>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder={isExpense ? 'Name of the Expense' : 'Name of the Income'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name='categoryId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Category'
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pay with' : 'Receive with'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          className='w-full mt-6'
          isLoading={isLoading}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}