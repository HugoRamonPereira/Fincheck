import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../services/AuthService';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('Email is required').email('Email is not valid'),
  password: z.string().nonempty('Password is required').min(8, 'Password must contain 8 or more characters')
});

type FormData = z.infer<typeof schema>;

export function useSignupController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const { accessToken } = await authService.signup(data);

    console.log(accessToken);

  });

  return { register, handleSubmit, errors };
}