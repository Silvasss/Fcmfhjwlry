// assets
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';

// ==============================|| MENU ITEMS - VISITANTE ||============================== //

const Home = {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'inicio',
            title: 'Inicio',
            type: 'item',
            url: '/',
            icon: DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'visitante',
            title: 'Visitante',
            type: 'item',
            url: '/visitante',
            icon: DashboardOutlined
        },
        {
            id: 'sobre',
            title: 'Sobre',
            type: 'item',
            url: '/sobre',
            icon: DashboardOutlined
        }
    ]
};

export default Home;
