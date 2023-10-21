import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BankAccountsService } from '../../../../../app/services/bankAccountsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = z.object({
  // z.union() is used to add 2 possible types, out balance is both number and also string
  initialBalance: z.union([
    z.string().nonempty('Initial balance is required'),
    z.number()],{ required_error: 'Initial balance is required'
  }),
  name: z.string({ required_error: 'Account name is required' }).nonempty('Account name is required'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'Account type is required' }),
  color: z.string({ required_error: 'Account color is required' }).nonempty('Account color is required'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name,
      color: accountBeingEdited?.color,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    }
  });

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateAccount
  } = useMutation(BankAccountsService.update);

  const {
    isLoading: isLoadingDeletion,
    mutateAsync: removeAccount
  } = useMutation(BankAccountsService.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        // In the id below we used instead of optional chaining operator ?, we used non-null assertion operator !
        // The non-null assertion will tell Typescript that you are sure that null or undefined will never be the values
        id: accountBeingEdited!.id,
        initialBalance: currencyStringToNumber(data.initialBalance)
      });
      // This invalidateQueries is to force React Query after form submission make a new request to bring the new edited values, recalculate and etc...
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Account edited successfully!');
      closeEditAccountModal();
    } catch {
      toast.error('Error saving changes!');
    }
  });

  function handleOpenDeletionModal() {
    setIsDeletionModalOpen(true);
  }

  function handleCloseDeletionModal() {
    setIsDeletionModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Account deleted successfully!');
      closeEditAccountModal();
    } catch {
      toast.error('Error deleting account!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeletionModalOpen,
    handleOpenDeletionModal,
    handleCloseDeletionModal,
    handleDeleteAccount,
    isLoadingDeletion
  };
}