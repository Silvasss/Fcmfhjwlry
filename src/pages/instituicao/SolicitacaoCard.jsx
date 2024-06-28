// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from '../../components/MainCard';
import SolicitacaoAreaChart from './SolicitacaoAreaChart';

// ==============================|| DEFAULT - SOLICITAÇÃO ||============================== //

export default function SolicitacaoCard() {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Solicitações</Typography>
        </Grid>
      </Grid>

      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <SolicitacaoAreaChart />
        </Box>
      </MainCard>
    </>
  );
}
