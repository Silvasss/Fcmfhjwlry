import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import Loadable from '../components/Loadable';
import Usuario from '../layout/Usuario';

const UsuarioDefault = Loadable(lazy(() => import('../pages/usuario/index')));

// ==============================|| USUÁRIO ROUTING ||============================== //

const ProtectedRoute = ({ children }) => {    
    const redux = useSelector((state) => state.userState.user);  

    if (!(redux?.isAuthenticated && redux.role === 'usuario')) {
        return <Navigate to='/auth/login' replace />;
    }

    return children ? children : <Usuario />;
};

const UsuarioRoutes = {
    path: '/',
    element: <ProtectedRoute />,
    children: [
        {
            path: 'perfil/conta/:id',
            element: <UsuarioDefault />
        }
    ]
};

export default UsuarioRoutes;
