import { useLoaderData } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// projeto import
import AnalyticSolicitacoes from '../../components/cards/AnalyticSolicitacoes';
import SolicitacaoPieChart from './SolicitacaoPieChart';
import SolicitacaoCard from './SolicitacaoCard';
import { endpoints } from '../../api/menu';
import { store } from '../../context/auth';

// assets
import ContactsOutlined from '@ant-design/icons/ContactsOutlined';
import FileProtectOutlined from '@ant-design/icons/FileProtectOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import HeatMapOutlined from '@ant-design/icons/HeatMapOutlined';


export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/instituicao/solicitacao`, { headers: { Authorization: `Bearer ${user.token}` } })

        const api = response.data

        return { api }
    } catch (error) {
        console.log(error)

        return { ok: false }
    }
}

// ==============================|| INSTITUIÇÃO - DEFAULT ||============================== //

export default function InstituicaoDefault() {
    const { api } = useLoaderData()
    
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticSolicitacoes title="Total Solicitações" count={api.totalSolicitacoes} Icone={ContactsOutlined} propCard={{ background: 'rgb(22, 119, 255)' }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticSolicitacoes title="Aceitas" count={api.totalAceitas} Icone={FileProtectOutlined} propCard={{ background: 'rgb(149, 222, 100)' }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticSolicitacoes title="Pendentes" count={api.totalPendentes} Icone={HeatMapOutlined} propCard={{ background: 'rgb(19, 194, 194)' }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticSolicitacoes title="Recusadas" count={api.totalRecusadas} Icone={CloseOutlined} propCard={{ background: 'rgb(250, 173, 20)' }} />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <SolicitacaoCard />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Income Overview</Typography>
                    </Grid>

                    <Grid item />
                </Grid>

                <SolicitacaoPieChart
                    title="Resumo das solicitações"
                    chart={{
                        series: [
                            { label: 'Aprovadas', value: api.porcentagemAceitas },
                            { label: 'Recusadas', value: api.porcentagemRecusadas },
                            { label: 'Pendentes', value: api.porcentagemPendentes }
                        ],
                    }} />
            </Grid>
        </Grid>
    );
}