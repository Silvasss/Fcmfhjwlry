// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - USUARIO ||============================== //

const Usuario = {
    id: 'group-usuario',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'usuario-perfil',
            title: 'Perfil',
            type: 'item',
            url: '/perfil/conta',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-pessoal',
            title: 'Pessoal',
            type: 'item',
            url: '/perfil/conta/update',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-experiencia',
            title: 'Experiência',
            type: 'item',
            url: '/perfil/conta/experiencia',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-graduacao',
            title: 'Graduação',
            type: 'item',
            url: '/perfil/conta/graduacao',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-minhaConta',
            title: 'Minha conta',
            type: 'item',
            url: '/perfil/conta/minha-conta',
            icon: icons.DashboardOutlined
        },        
        {
            id: 'usuario-password',
            title: 'Alterar senha',
            type: 'item',
            url: '/perfil/conta/password',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-setting',
            title: 'Configurações',
            type: 'item',
            url: '/perfil/conta/settings',
            icon: icons.DashboardOutlined
        },
    ]
};


export default Usuario;