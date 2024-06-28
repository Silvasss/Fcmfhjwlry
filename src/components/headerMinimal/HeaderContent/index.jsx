import { Link as Link2 } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// projeto import
import Profile from './Profile';
import Logo from '../../logo/LogoMain'
import Avatar from '../../@extended/Avatar';

// ==============================|| HEADER - CONTENT ||============================== //
export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const theme = useTheme();

  const user = useSelector((state) => state.userState.user);

  const TipoConta = () => {
    if (!user?.isAuthenticated) {
      return (
        <>
          <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <ButtonBase disableRipple component={Link} href={'/'}>
              <Logo />
            </ButtonBase>
          </Box>

          <ButtonBase
            sx={{
              p: 0.25,
              bgcolor: 'transparent',
              borderRadius: 1,
              '&:hover': { bgcolor: 'secondary.lighter' },
              '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
            }}
            aria-label="botão entrar"
            component={Link2}
            to={'/auth/login'}
            texttransform='capitalize'
            variant="subtitle1"
          >
            Entrar
          </ButtonBase>
        </>
      )
    }

    if (user?.role === 'usuario') {
      return (
        <>
          <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <ButtonBase disableRipple component={Link} href={'/'}>
              <Logo />
            </ButtonBase>
          </Box>

          <Profile nomeUsuario={user.nome} />
        </>
      )
    }

    if (user?.role === 'instituicao') {
      return (
        <>
          <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />

          <ButtonBase
            sx={{
              p: 0.25,
              bgcolor: 'transparent',
              borderRadius: 1,
              '&:hover': { bgcolor: 'secondary.lighter' },
              '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
            }}
            aria-label="perfil instituição"
            component={Link2}
            to={'/instituicao/default'}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
              <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />

              <Stack>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                  {user.nome}
                </Typography>
              </Stack>
            </Stack>
          </ButtonBase>
        </>
      )
    }

    if (user?.role === 'admin') {
      return (
        <>
          <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />

          {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

          <ButtonBase
            sx={{
              p: 0.25,
              bgcolor: 'transparent',
              borderRadius: 1,
              '&:hover': { bgcolor: 'secondary.lighter' },
              '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
            }}
            aria-label="perfil admin"
            component={Link2}
            to={'/admin/default'}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
              <Avatar alt="profile admin" sx={{ width: 32, height: 32 }} />

              <Stack>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                  Administrador
                </Typography>
              </Stack>
            </Stack>
          </ButtonBase>
        </>
      )
    }
  }

  return (<TipoConta />);
}
