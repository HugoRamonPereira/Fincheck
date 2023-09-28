import { authService } from '../../../services/AuthService';
import { SignupProps } from '../../../services/AuthService/signup';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupProps) => {
      return authService.signup(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      toast.error('An error ocurred while creating your account!');
    }
  });

  return { register, handleSubmit, errors, isLoading };
}