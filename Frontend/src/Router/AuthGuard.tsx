import { Navigate, Outlet } from 'react-router-dom';

type AuthGuardProps = {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  // The property replace was added to avoid saving browsing history in cache
  // So if the user is trying to access a private route the route will be replaced and there will be no history
  // No history for the user to be going back to, by clicking in the arrows
  if (!signedIn && isPrivate) {
    return <Navigate to="/signin" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}