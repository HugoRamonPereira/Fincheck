import { useAuth } from '../../../app/hooks/useAuth/useAuth';
import { Button } from '../../components/Button';

export function Dashboard() {
  // The function destructured signout comes from the useAuth context
  const { signout } = useAuth();

  return (
    <>
      <h1>Dashboard Page</h1>

      <Button onClick={signout}>
        Sign out
      </Button>
    </>
  );
}