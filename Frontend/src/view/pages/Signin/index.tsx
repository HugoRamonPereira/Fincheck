import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useSigninController } from './useSigninController';

export function Signin() {
  const { handleSubmit, register, errors, isLoading } = useSigninController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 lg:gap-6 text-center">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
        Log into your account
        </h1>

        <p className='flex md:flex-none flex-col md:flex-row space-x-3'>
          <span className='text-sm lg:text-base text-gray-700'>
          Don&apos;t have an account?
          </span>
          <Link to='/signup' className='text-sm lg:text-base text-teal-900 font-medium'>
            Sign up
          </Link>
        </p>
      </header>

      <form
        className='mt-10 lg:mt-14 flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder='Email'
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder='Password'
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className='mt-2' isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </>
  );
}