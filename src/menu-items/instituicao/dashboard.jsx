// assets
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/instituicao/default',
      icon: DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
