import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// projeto import
import HeaderContent from './HeaderContent';
import AppBarStyled from './AppBarStyled';
import { handlerDrawerOpen, useGetMenuMaster } from '../../api/menu';
import { store } from '../../context/auth';

// assets
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// ==============================|| COMPARTILHADO LAYOUT - HEADER ||============================== //
// ------------------------------  Admin, instituição e usuário-------------------------- //

export default function Header() {
    const theme = useTheme();

    // header content
    const headerContent = useMemo(() => <HeaderContent />, []);

    const downLG = useMediaQuery(theme.breakpoints.down('lg'));

    const { menuMaster } = useGetMenuMaster();

    const user = store.getState().userState.user

    const Retorno = () => {
        if (!user || user.role === 'usuario') {
            // common header
            const mainHeader = (
                <Toolbar>
                    {headerContent}
                </Toolbar>
            );

            // app-bar params
            const appBar = {
                position: 'fixed',
                color: 'inherit',
                elevation: 0,
                sx: {
                    borderBottom: `1px solid ${theme.palette.divider}`
                    // boxShadow: theme.customShadows.z1
                }
            };

            return (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            );
        } else {
            const drawerOpen = menuMaster.isDashboardDrawerOpened;

            const iconBackColor = 'grey.100';
            const iconBackColorOpen = 'grey.200';

            // common header
            const mainHeader = (
                <Toolbar>
                    <IconButton
                        disableRipple
                        aria-label="open drawer"
                        onClick={() => handlerDrawerOpen(!drawerOpen)}
                        edge="start"
                        color="secondary"
                        variant="light"
                        sx={{ color: 'text.primary', bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
                    >
                        {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </IconButton>
                    {headerContent}
                </Toolbar>
            );

            // app-bar params
            const appBar = {
                position: 'fixed',
                color: 'inherit',
                elevation: 0,
                sx: { borderBottom: `1px solid ${theme.palette.divider}` }
            };

            return (
                <>
                    {!downLG ? (
                        <AppBarStyled open={!!drawerOpen} {...appBar}>
                            {mainHeader}
                        </AppBarStyled>
                    ) : (
                        <AppBar {...appBar}>{mainHeader}</AppBar>
                    )}
                </>
            );
        }
    }

    return (<Retorno />)
}