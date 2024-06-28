import { lazy } from 'react';

// projeto import
import Loadable from '../components/Loadable';
import AuthLayout from '../layout/Auth';

// funções
import { action as LoginAction } from '../pages/autenticacao/Login';
import { action as RegisterAction } from '../pages/autenticacao/Register';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/autenticacao/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/autenticacao/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: 'auth/login',
      element: <AuthLogin />,
      action: LoginAction()
    },
    {
      path: 'auth/register',
      element: <AuthRegister />,
      action: RegisterAction()
    }
  ]
};

export default LoginRoutes;
