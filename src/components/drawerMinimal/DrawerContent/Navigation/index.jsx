import { useSelector } from 'react-redux';

// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import { menuItem } from '../../../../menu-items/Administrado';
import menuItems from '../../../../menu-items/instituicao';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const user = useSelector((state) => state.userState.user);

  if (user.role === 'instituicao') {
    const navGroups = menuItems.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
  } else {
    const navGroups = menuItem.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
  }
}
