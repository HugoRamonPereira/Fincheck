import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/AuthService';
import toast from 'react-hot-toast';
import { SigninProps } from '../../../app/services/AuthService/signin';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().nonempty('Email is required').email('Email is not valid'),
  password: z.string().nonempty('Password is required').min(8, 'Password must contain 8 or more characters')
});

type FormData = z.infer<typeof schema>;

export function useSigninController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninProps) => {
      return authService.signin(data);
    }
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (error) {
      toast.error('Invalid Credentials!');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}