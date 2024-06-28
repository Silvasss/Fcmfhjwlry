import PropTypes from 'prop-types';

// material-ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';


export default function MuiTab({ pendentes, recusadas, value, handleChange }) {  
    return (
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label="solicitações tabs" variant="scrollable" scrollButtons="auto">
                <Tab
                    label="Pedentes"
                    icon={<Chip label={pendentes} color="info" variant="light" size="small" />}
                    iconPosition="end"
                    value={0}
                />

                <Tab
                    label="Recusadas"
                    icon={<Chip label={recusadas} color='warning' variant="light" size="small" />}
                    iconPosition="end"
                    value={2}
                    disabled={recusadas === 0}
                />
            </Tabs>
        </Box>
    )
}

MuiTab.propTypes = { pendentes: PropTypes.number, recusadas: PropTypes.number, handleChange: PropTypes.func, value: PropTypes.number };
