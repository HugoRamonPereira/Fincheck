import { Outlet } from 'react-router-dom';
import illustration from '../../assets/images/illustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">

      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center">
        <div className='w-3/4 h-3/5 flex flex-col items-center justify-center gap-4 lg:gap-8 bg-gray-100 border border-gray-400 rounded-3xl'>
          <Logo className='text-teal-900 h-5 lg:h-7' />

          <div className='w-full max-w-[504px] px-8'>
            <Outlet />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 h-full justify-center items-center p-8 relative">
        <img
          src={illustration}
          alt="transactions-illustration"
          className='w-full h-full max-w-[656px] max-h-[960px] select-none'
        />

        <div className='max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px]'>
          <Logo className='text-teal-900 h-7' />
          <p className='text-gray-700 font-Montserrat font-normal mt-4'>
            Manage your personal finances in a simple way with Fincheck, and by the way, it&apos;s totally free!
          </p>
        </div>
      </div>
    </div>
  );
}