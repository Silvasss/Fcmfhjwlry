import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

// material-ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

// project import
import Logo from '../../components/logo/LogoMain';
import ImgAuthWidget from '../../assets/auth-widgets.png'

// assets
import AuthBackground from '../../assets/AuthBackground';
import AuthFooter from '../../components/cards/AuthFooter';

// ==============================|| AUTH LAYOUT ||============================== //

export default function AuthLayout() {
    return (
        <Box sx={{
            display: { xs: 'flex', lg: 'grid' },
            flexDirection: 'column',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '100vh',
        }}>
            <AuthBackground />

            <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
                <Grid container justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                        <ButtonBase disableRipple component={Link} to={'/'}>
                            <Logo />
                        </ButtonBase>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                        >
                            <Grid item>
                                <Outlet />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </Box>
            
            <Box
                sx={{
                    alignItems: 'center',
                    background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                    color: 'var(--mui-palette-common-white)',
                    display: { xs: 'none', lg: 'flex' },
                    justifyContent: 'center',
                    p: 3,
                }}
            >
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography color="inherit" sx={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
                            Welcome to{' '}
                            <Box component="span" sx={{ color: '#15b79e' }}>
                                Devias Kit
                            </Box>
                        </Typography>

                        <Typography align="center" variant="subtitle1">
                            A professional template that comes with ready-to-use MUI components.
                        </Typography>
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            alt="Widgets"
                            src={ImgAuthWidget}
                            sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
