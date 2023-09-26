import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Signup() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold font-Montserrat text-gray-900">
          Create your account
        </h1>

        <p className='space-x-3'>
          <span className='text-gray-700 font-Montserrat'>
          Already have an account?
          </span>
          <Link to='/signin' className='text-teal-900 font-Montserrat font-medium'>
            Sign in
          </Link>
        </p>
      </header>

      <form className='mt-16 flex flex-col gap-4'>
        <Input
          type="name"
          placeholder='Name'
          name='name'
        />
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
        <Button type="submit" className='mt-2'>Sign up</Button>
      </form>
    </>
  );
}