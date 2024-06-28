// assets
import ProfileOutlined from '@ant-design/icons/ProfileOutlined'

// ==============================|| MENU ITEMS - CURSO ||============================== //

const curso = {
  id: 'Curso',
  title: 'Curso',
  type: 'group',
  children: [
    {
      id: 'list',
      title: 'Lista',
      type: 'item',
      url: '/instituicao/curso-list',
      icon: ProfileOutlined
    }
  ]
};

export default curso;
