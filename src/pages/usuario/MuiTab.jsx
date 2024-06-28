import PropTypes from 'prop-types';

// material-ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// assets
import UserOutlined from '@ant-design/icons/UserOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ContainerOutlined from '@ant-design/icons/ContainerOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import CompassOutlined from '@ant-design/icons/CompassOutlined';

export default function MuiTab({ value, handleChange }) {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="account profile tab" variant="scrollable" scrollButtons="auto">
                <Tab icon={<UserOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Perfil"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={0}
                />

                <Tab icon={<FileTextOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Pessoal"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={1}
                />

                <Tab icon={<CompassOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Profissional"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={2}
                />

                <Tab icon={<BookOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Gradução"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={3}
                />

                <Tab icon={<ContainerOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Minha Conta"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={4}
                />

                <Tab icon={<LockOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Alterar senha"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={5}
                />

                <Tab icon={<SettingOutlined fontSize="small" />}
                    iconPosition="start"
                    label="Configurações"
                    sx={{ "&:hover": { background: 'rgba(225, 240, 252, 0.3)' } }}
                    value={6}
                />
            </Tabs>
        </Box>
    )
}

MuiTab.propTypes = { handleChange: PropTypes.func, value: PropTypes.number };
