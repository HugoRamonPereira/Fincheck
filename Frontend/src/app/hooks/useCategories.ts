import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../services/CategoriesService';

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll
  });

  // Every time this hook is called it will return accounts being an array of bank accounts or an empty array
  return { categories: data ?? [] , isFetching };
}