import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useSignupController } from './useSignupController';

export function Signup() {
  const { handleSubmit, register, errors, isLoading } = useSignupController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-xl lg:text-2xl font-Montserrat font-semibold text-gray-900">
          Create your account
        </h1>

        <p className='flex md:flex-none flex-col md:flex-row space-x-3'>
          <span className='text-sm lg:text-base text-gray-700 font-Montserrat'>
          Already have an account?
          </span>
          <Link to='/signin' className='text-sm lg:text-base text-teal-900 font-Montserrat font-medium'>
            Sign in
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className='mt-8 lg:mt-12 flex flex-col gap-4'
      >
        <Input
          type="name"
          placeholder='Name'
          error={errors.name?.message}
          {...register('name')}
        />
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
        <Button type="submit" className='mt-2' isLoading={isLoading}>Sign up</Button>
      </form>
    </>
  );
}