import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/TransactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';

const schema = z.object({
  value: z.union([
    z.string().nonempty('Value is required!'),
    z.number()
  ]),
  name: z.string().nonempty('Name is required!'),
  categoryId: z.string().nonempty('Category is required!'),
  bankAccountId: z.string().nonempty('Category is required!'),
  date: z.date()
});

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date()
    }
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.update);
  const queryClient = useQueryClient();

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });
      // This invalidateQueries is to force React Query after form submission make a new request to bring the new transaction we are creating inside this function scope
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Expense edited successfully!'
          : 'Income edited successfully!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Error saving expense!'
          : 'Error saving income!'
      );
    }
  });

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  };
}