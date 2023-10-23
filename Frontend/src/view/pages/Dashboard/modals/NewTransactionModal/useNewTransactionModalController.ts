import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/TransactionsService';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.string().nonempty('Value is required!'),
  name: z.string().nonempty('Name is required!'),
  categoryId: z.string().nonempty('Category is required!'),
  bankAccountId: z.string().nonempty('Bank is required!'),
  date: z.date()
});

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
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
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.create);

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });
      // This invalidateQueries is to force React Query after form submission make a new request to bring the new transaction we are creating inside this function scope
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bannkAccounts'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Expense registered successfully!'
          : 'Income registered successfully!'
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Error registering expense!'
          : 'Error registering income!'
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  };
}