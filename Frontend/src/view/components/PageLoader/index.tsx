import { Spinner } from '../Spinner';

export function PageLoader() {
  return (
    <div className="bg-gray-0 fixed top-0 left-0 w-full h-full grid place-content-center">
      <Spinner />
    </div>
  );
}