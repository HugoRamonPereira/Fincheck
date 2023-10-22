import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ColorsDropdown } from '../../../../components/ColorsDropdown';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrerncy';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditAccountModalController } from './useEditAccountModalController';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { ConfirmDeletionModal } from '../../../../components/ConfirmDeletionModal';

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isLoadingDeletion,
    isDeletionModalOpen,
    handleOpenDeletionModal,
    handleCloseDeletionModal,
    handleDeleteAccount
  } = useEditAccountModalController();

  if (isDeletionModalOpen) {
    return (
      <ConfirmDeletionModal
        title='Are you sure you want to delete this account?'
        description='On acount deletion, all registries including incomes and expenses will also be deleted!'
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeletionModal}
        isLoading={isLoadingDeletion}
      />
    );
  }

  return (
    <Modal
      title='Edit Account'
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      buttonRightAction={(
        <button onClick={handleOpenDeletionModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div className='flex items-center gap-2 '>
            <span className='text-gray-600 text-lg'>R$</span>
            <Controller
              control={control}
              name='initialBalance'
              defaultValue='0'
              render={({ field: { onChange, value }}) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <span className='text-gray-600 text-xs'>Initial Balance</span>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder='Account name'
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name='type'
            defaultValue='CHECKING'
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Type'
                onChange={onChange}
                value={value}
                error={errors.type?.message}
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
            )}
          />

          <Controller
            name='color'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }}) => (
              <ColorsDropdown
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <Button className='w-full mt-4' isLoading={isLoading}>
          Save
        </Button>
      </form>
    </Modal>
  );
}