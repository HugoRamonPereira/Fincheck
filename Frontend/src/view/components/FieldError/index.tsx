import { CrossCircledIcon } from '@radix-ui/react-icons';

interface FieldErrorProps {
  error: string;
}

export function FieldError({ error }: FieldErrorProps) {
  return (
    <>
      {error && (
        <div className={'flex items-center gap-1 text-red-900'}>
          <CrossCircledIcon />
          <span className='text-red-900 text-xs font-Montserrat'>{error}</span>
        </div>
      )}
    </>
  );
}