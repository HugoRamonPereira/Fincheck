import { httpClient } from '../HttpClient/httpClient';
import { Category } from '../../entities/Category';

type CategoriesResponse = Array<Category>

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}