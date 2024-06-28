import { useLoaderData } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// projeto import
import MainCard from '../../components/MainCard';
import AnalyticSistema from './AnalyticSistema';
import FonteTrafego from './FonteTrafego';
import UniqueVisitorCard from './UniqueVisitorCard';
import LogTable from './LogTable';
import { endpoints } from '../../api/menu';
import { store } from '../../context/auth';
import { Box } from '@mui/material';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/admin`, { headers: { Authorization: `Bearer ${user.token}` } })

        const dados = response.data

        return { dados }
    } catch (error) {
        console.log(error)

        return { sucess: false }
    }
}

export default function AdministradoDefault() {
    const { dados } = useLoaderData()

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>

            {
                dados.analyticSistema.map((elem, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <AnalyticSistema title={elem.title} count={elem.count} percentage={elem.percentage} color={!elem.color ? 'primary' : elem.color} />
                        </Grid>
                    )
                })
            }

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* -------------------------------------- row 2 --------------------------------------------------- */}
            <Grid item xs={12} lg={8} >
                <UniqueVisitorCard />
            </Grid>

            <Grid item xs={12} lg={4} md={6}>
                <Box height={508}>
                    <FonteTrafego chartSeries={dados.fonteTrafico} labels={['Desktop', 'Tablet', 'Phone']} />
                </Box>
            </Grid>

            {/* -------------------------------------- row 3 --------------------------------------------------- */}
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Logs recentes</Typography>
                    </Grid>

                    <Grid item />
                </Grid>

                <MainCard sx={{ mt: 2 }} content={false}>
                    <LogTable dados={dados.logs} />
                </MainCard>
            </Grid>
        </Grid>
    );
}