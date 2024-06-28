import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import Loadable from '../components/Loadable';
import Administrado from '../layout/Admin';

// loader e actions das páginas
import { loader as instituicaoLoader } from '../pages/instituicao';
import { loader as CursoLoader } from '../pages/instituicao/curso';
import { loader as SolicitacaoLoader } from '../pages/instituicao/solicitacao';

const InstituicaoDefault = Loadable(lazy(() => import('../pages/instituicao')));
const CursoPage = Loadable(lazy(() => import('../pages/instituicao/curso')));
const SolicitacaoDefault = Loadable(lazy(() => import('../pages/instituicao/solicitacao')));


// ==============================|| INSTITUIÇÃO ROUTING ||============================== //

const ProtectedRoute = ({ children }) => {
    const redux = useSelector((state) => state.userState.user);

    if (!(redux.isAuthenticated && redux.role === 'instituicao')) {
        return <Navigate to='/auth/login' replace />;
    }

    return children ? children : <Administrado />;
};

const InstituicaoRoutes = {
    path: '/instituicao',
    element: <ProtectedRoute />,
    children: [
        {
            path: 'default',
            element: <InstituicaoDefault />,
            loader: instituicaoLoader()
        },
        {
            path: 'curso-list',
            element: <CursoPage />,
            loader: CursoLoader()
        },
        {
            path: 'solicitacao',
            element: <SolicitacaoDefault />,
            loader: SolicitacaoLoader()
        }
    ]
};

export default InstituicaoRoutes;
