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
    newTransactionType
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'New Expense' : 'New Income'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <div className='flex items-center gap-2 '>
            <span className='text-gray-600 font-Montserrat text-lg'>R$</span>
            <InputCurrency />
          </div>
          <span className='text-gray-600 font-Montserrat text-xs tracking-wide'>
            Value {isExpense ? 'of the expense' : 'of the income'}
          </span>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            name='initialBalance'
            placeholder={isExpense ? 'Name of the Expense' : 'Name of the Income'}
          />

          <Select
            placeholder='Category'
            options={[
              {
                value: 'CHECKING',
                label: 'Checkinc Account'
              },
              {
                value: 'INVESTMENT',
                label: 'Investment'
              },
              {
                value: 'CASH',
                label: 'Cash'
              },
            ]}
          />

          <Select
            placeholder={isExpense ? 'Pay with' : 'Receive with'}
            options={[
              {
                value: 'CHECKING',
                label: 'Checkinc Account'
              },
              {
                value: 'INVESTMENT',
                label: 'Investment'
              },
              {
                value: 'CASH',
                label: 'Cash'
              },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button type='submit' className='w-full mt-6'>
          Create
        </Button>
      </form>
    </Modal>
  );
}