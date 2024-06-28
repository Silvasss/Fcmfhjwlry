import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// terceiros 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function Visitante({ handleClose, open, id, endpoints }) {
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const response = await endpoints.customFetch.get(`/${id}`)

                const api = response.data

                setDados(api);
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
        toast.warn(erro)

        return <div>Erro: {erro}</div>;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth='md'
            fullWidth={true}
        >
            <Box sx={{
                paddingLeft: { xs: '16px', sm: '24px', md: '20px' },
                paddingRight: { xs: '16px', sm: '24px', md: '20px' },
            }}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Avatar alt="Earl Parrini" sx={{ width: 56, height: 56, marginRight: 2 }} />

                        <Box flexGrow={1}>
                            <Typography variant="h6">{dados.nome}</Typography>

                            <Typography variant="subtitle1" color="textSecondary">{dados.cargoPrincipal}</Typography>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Divider sx={{ mb: 2 }} />

                    <SimpleBar style={{ 'overflowX': 'hidden', maxHeight: '100%', height: 'calc(-290px + 100vh)' }}>
                        <Grid container spacing={3}>
                            {/* Primeira Coluna */}
                            <Grid item xs={12} sm={8} xl={9}>
                                <Grid container spacing={2.25} mb={1}>
                                    {/* Sobre mim */}
                                    <Grid item xs={12}>
                                        <Card variant='outlined'>
                                            <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Sobre mim" />

                                            <Divider />

                                            <CardContent>
                                                <Stack mt={2}>
                                                    <Stack spacing={1.25} sx={{ p: 0.5 }}>
                                                        <Typography variant="body1">
                                                            {dados.sobreMin}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Educação */}
                                    <Grid item xs={12}>
                                        <Card variant='outlined'>
                                            <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Educação" />

                                            <Divider />

                                            <CardContent>
                                                <List>
                                                    {dados.graduacoes
                                                        .map((elem, index) => {
                                                            return (
                                                                <Box key={index}>
                                                                    <ListItem >
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        {elem.cursoNome}
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {format(elem.inicio, 'yyyy')} - {elem.fim ? format(elem.fim, 'yyyy') : 'Atual'}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Instituição
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {elem.instituicaoNome}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>

                                                                    {(dados.graduacoes.length !== index + 1) && <Divider />}
                                                                </Box>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Emprego */}
                                    <Grid item xs={12}>
                                        <Card variant='outlined'>
                                            <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Emprego" />

                                            <Divider />

                                            <CardContent>
                                                <List>
                                                    {dados.experiencias
                                                        .map((elem, index) => {
                                                            return (
                                                                <Box key={index}>
                                                                    <ListItem >
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Empresa
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {elem.empresa}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Plus code
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {elem.plusCode}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Tipo
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {elem.vinculo}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Cargo
                                                                                    </Typography>

                                                                                    <Typography variant="body1">
                                                                                        {elem.funcao}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Tempo
                                                                                    </Typography>

                                                                                    <Typography variant="body1" mt={'4px'}>
                                                                                        {format(elem.inicio, 'yyyy')} - {elem.fim ? format(elem.fim, 'yyyy') : 'Atual'}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack>
                                                                                    <Typography color="text.secondary" variant="body1">
                                                                                        Responsabilidade de trabalho
                                                                                    </Typography>

                                                                                    <Typography variant="body1" mt={'4px'}>
                                                                                        {elem.responsabilidade}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>

                                                                    {(dados.experiencias.length !== index + 1) && <Divider />}
                                                                </Box>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Skills */}
                                    <Grid item xs={12}>
                                        <Card variant='outlined'>
                                            <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Skills" />

                                            <Divider />

                                            <CardContent>
                                                <Box>
                                                    <ListItem sx={{ flexWrap: 'wrap' }}>
                                                        <Chip label={'Codeigniter'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                                                        <Chip label={'HTML'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                                                        <Chip label={'Prototyping'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                                                        <Chip label={'Mobile App'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                                                        <Chip label={'Figma'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                                                        <Chip label={'Angular'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary" }} />
                                                    </ListItem>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Segunda Coluna */}
                            <Grid item xs={12} sm={4} xl={3}>
                                {/* Contacs */}
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Stack>
                                            <Stack spacing={1.25} sx={{ p: 0.5 }}>
                                                <Typography color="text.secondary" variant="body1">
                                                    Nome
                                                </Typography>

                                                <Typography variant="body1">
                                                    {dados.nome}
                                                </Typography>
                                            </Stack>


                                            <Stack spacing={1.25} sx={{ p: 0.5 }}>
                                                <Typography color="text.secondary" variant="body1">
                                                    País
                                                </Typography>

                                                <Typography variant="body1">
                                                    {dados.pais}
                                                </Typography>
                                            </Stack>

                                            <Stack spacing={1.25} sx={{ p: 0.5 }}>
                                                <Typography color="text.secondary" variant="body1">
                                                    Plus code
                                                </Typography>

                                                <Typography variant="body1">
                                                    {dados.plusCode}
                                                </Typography>
                                            </Stack>

                                            <Stack spacing={1.25} sx={{ p: 0.5 }}>
                                                <Typography color="text.secondary" variant="body1">
                                                    Portfólio
                                                </Typography>

                                                <Typography variant="body1">
                                                    {dados.portfolioURL}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </SimpleBar>

                    <Divider sx={{ mt: 1 }} />
                </DialogContent>

                <DialogActions disableSpacing sx={{ mt: -3 }}>
                    <Button size="medium" color="error" disableElevation onClick={() => handleClose()}>Close</Button>
                </DialogActions>
            </Box>
        </Dialog >
    )
}

Visitante.propTypes = { handleClose: PropTypes.any, open: PropTypes.bool, id: PropTypes.number, endpoints: PropTypes.any };
