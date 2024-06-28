// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { CommentOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton component="a" href="">
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>

        <ListItemText primary="Suporte" />
      </ListItemButton>

      <ListItemButton component="a" href="/perfil/conta/6">
        <ListItemIcon>
          <SettingOutlined />
        </ListItemIcon>

        <ListItemText primary="Configurações" />
      </ListItemButton>

      <ListItemButton component="a" href="">
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>

        <ListItemText primary="Feedback" />
      </ListItemButton>
    </List>
  );
}
