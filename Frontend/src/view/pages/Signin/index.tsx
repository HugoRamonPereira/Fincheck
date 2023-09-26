import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Signin() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-Montserrat font-semibold text-gray-900">
        Log into your account
        </h1>

        <p className='space-x-3'>
          <span className='font-Montserrat text-gray-700'>
          Don&apos;t have an account?
          </span>
          <Link to='/signup' className='text-teal-900 font-Montserrat font-medium'>
            Sign up
          </Link>
        </p>
      </header>

      <form className='mt-16 flex flex-col gap-4'>
        <Input
          type="email"
          placeholder='Email'
          name='email'
        />
        <Input
          type="password"
          placeholder='Password'
          name='password'
        />
        <Button type="submit" className='mt-2'>Sign in</Button>
      </form>
    </>
  );
}