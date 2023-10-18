import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrerncy';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModalController();

  return (
    <Modal
      title='New account'
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <div className='flex items-center gap-2 '>
            <span className='text-gray-600 font-Montserrat text-lg'>R$</span>
            <InputCurrency />
          </div>
          <span className='text-gray-600 font-Montserrat text-xs'>Balance</span>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            name='initialBalance'
            placeholder='Account name'
          />

          <Select
            placeholder='Type'
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
        </div>
      </form>
    </Modal>
  );
}