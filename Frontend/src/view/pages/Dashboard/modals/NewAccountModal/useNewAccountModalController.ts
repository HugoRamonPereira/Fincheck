import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BankAccountsService } from '../../../../../app/services/bankAccountsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';

const schema = z.object({
  initialBalance: z.string({ required_error: 'Initial balance is required' }).nonempty('Initial balance is required'),
  name: z.string({ required_error: 'Name is required' }).nonempty('Name is required'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { required_error: 'Type is required' }),
  color: z.string({ required_error: 'Color is required' }).nonempty('Color is required'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(BankAccountsService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      });
      // This invalidateQueries is to force React Query after form submission make a new request to bring the new account we are creating inside this function scope
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Account registered successfully');
      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Error registering account');
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  };
}