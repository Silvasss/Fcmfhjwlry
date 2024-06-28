import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import Loadable from '../components/Loadable';
import Administrado from '../layout/Admin';

// loader e actions das páginas
import { loader as IndexLoader } from '../pages/administrado';
import { loader as LogsLoader } from '../pages/administrado/logs';
import { loader as InstituicoesLoader } from '../pages/administrado/instituicao';
import { loader as UsuarioLoader } from '../pages/administrado/usuario';

const AdministradoDefault = Loadable(lazy(() => import('../pages/administrado')));
const LogPage = Loadable(lazy(() => import('../pages/administrado/logs')));
const InstituicoesPage = Loadable(lazy(() => import('../pages/administrado/instituicao')));
const UsuarioPage = Loadable(lazy(() => import('../pages/administrado/usuario')));

// ==============================|| ADMIN ROUTING ||============================== //

const ProtectedRoute = ({ children }) => {
    const redux = useSelector((state) => state.userState.user);

    if (!(redux.isAuthenticated && redux.role === 'admin')) {
        return <Navigate to='/auth/login' replace />;
    }

    return children ? children : <Administrado />;
};

const AdministradoRoutes = {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
        {
            path: 'default',
            element: <AdministradoDefault />,
            loader: IndexLoader()
        },
        {
            path: 'log',
            element: <LogPage />,
            loader: LogsLoader()
        },
        {
            path: 'instituicoes',
            element: <InstituicoesPage />,
            loader: InstituicoesLoader()
        },
        {
            path: 'usuarios',
            element: <UsuarioPage />,
            loader: UsuarioLoader()
        }
    ]
};

export default AdministradoRoutes;