import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';

// projeto import
import { store, logoutUser } from '../../../../context/auth';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton component="a" href="/perfil/conta/1">
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>

        <ListItemText primary="Editar perfil" />
      </ListItemButton>

      <ListItemButton component="a" href="/perfil/conta/0">
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>

        <ListItemText primary="Ver perfil" />
      </ListItemButton>

      <ListItemButton component="a" href="/perfil/conta/4" >
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>

        <ListItemText primary="Minha conta" />
      </ListItemButton>

      <ListItemButton component="a" href="" onClick={() => { store.dispatch(logoutUser()) }}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>

        <ListItemText primary="Sair" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
