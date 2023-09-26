import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { Signin } from '../view/pages/Signin';
import { Signup } from '../view/pages/Signup';
import { Dashboard } from '../view/pages/Dashboard';
import { AuthLayout } from '../view/layouts/AuthLayout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path='/signin' element={< Signin/>} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}