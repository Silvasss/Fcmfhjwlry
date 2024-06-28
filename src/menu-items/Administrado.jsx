// assets
import MonitorOutlined from '@ant-design/icons/MonitorOutlined'
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined';
import ClusterOutlined from '@ant-design/icons/ClusterOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const administrado = {
    id: 'admin',
    title: 'Páginas',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/admin/default',
            icon: DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'log',
            title: 'Registros de eventos',
            type: 'item',
            url: '/admin/log',
            icon: MonitorOutlined
        },
        {
            id: 'instituicoes',
            title: 'Lista de instituições',
            type: 'item',
            url: '/admin/instituicoes',
            icon: DeploymentUnitOutlined
        },
        {
            id: 'usuarios',
            title: 'Lista de usuários',
            type: 'item',
            url: '/admin/usuarios',
            icon: ClusterOutlined
        },
        {
            id: 'logout',
            title: 'Sair',
            type: 'button',
            url: '/auth/login',
            icon: LogoutOutlined
        }
    ]
};

const menuItem = {
    items: [administrado]
};

export { menuItem, administrado }
