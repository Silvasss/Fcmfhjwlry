// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const solicitacao = {
  id: 'solicitacao',
  title: 'Solicitação',
  type: 'group',
  children: [
    {
      id: 'solicitacoes',
      title: 'Solicitações',
      type: 'item',
      url: '/instituicao/solicitacao',
      icon: ExclamationCircleOutlined
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

export default solicitacao;
