import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from '../MainCard';



export default function AnalyticSolicitacoes({ color, title, count, propCard, Icone }) {
  return (
    <MainCard contentSX={{ p: 2.25, position: 'relative', color: color }} sx={propCard}>
      <Box sx={{ position: 'absolute', transform: 'rotate(25deg)', left: '-17px', bottom: '-27px', color: 'rgb(255, 255, 255)' }}>
        <Icone style={{ width: '100px', height: '100px', fontSize: '100px', opacity: 0.35 }} />
      </Box>

      <Grid container justify-content={'center'} alignItems="center" flexDirection={'column'} display={'flex'} width={'calc(100% + 8px)'}>
        <Grid item>
          <Typography variant="h3" align='center' color="inherit">
            {count}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1" color="inherit" align='center'>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}

AnalyticSolicitacoes.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  propCard: PropTypes.any,
  Icone: PropTypes.any
};
