import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

// terceiros
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { format } from 'date-fns';

// assets
import BankOutlined from '@ant-design/icons/BankOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

export default function Ver({ copia, handleClose, open, user, endpoints }) {
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
                const response = await endpoints.customFetch.get(`/instituicao/solicitacao/${copia.solicitacao_Id}`, { headers: { Authorization: `Bearer ${user.token}` } })

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
            <DialogTitle>Solicitação recusada</DialogTitle>

            <Divider />

            <DialogContent>
                <SimpleBar>
                    <Grid container spacing={3}>
                        {/* Primeira Coluna */}
                        <Grid item xs={12}>
                            <Grid container spacing={2.25} mb={1}>
                                {/* Detalhes pessoais */}
                                <Grid item xs={12}>
                                    <Card variant='outlined'>
                                        <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Detalhes pessoais" />

                                        <Divider />

                                        <CardContent>
                                            <List>
                                                <ListItem>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <Stack>
                                                                <Typography color="text.secondary" variant="body1">
                                                                    Nome
                                                                </Typography>

                                                                <Typography variant="body1">
                                                                    {dados.visitante.nome}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <Stack>
                                                                <Typography color="text.secondary" variant="body1">
                                                                    País
                                                                </Typography>

                                                                <Typography variant="body1">
                                                                    {dados.visitante.pais}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>

                                                <Divider />

                                                <ListItem>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <Stack>
                                                                <Typography color="text.secondary" variant="body1">
                                                                    Plus code
                                                                </Typography>

                                                                <Typography variant="body1">
                                                                    {dados.visitante.plusCode}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <Stack>
                                                                <Typography color="text.secondary" variant="body1">
                                                                    Portfólio
                                                                </Typography>

                                                                <Typography variant="body1">
                                                                    {dados.visitante.portfolioURL}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            </List>
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
                                                {dados.visitante.graduacoes
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

                                                                {(dados.visitante.graduacoes.length !== index + 1) && <Divider />}
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
                                                {dados.visitante.experiencias
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

                                                                {(dados.visitante.experiencias.length !== index + 1) && <Divider />}
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Mensagens */}
                        <Grid item xs={12}>
                            <Card variant='outlined'>
                                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Histórico de mensagens" align="center" />

                                <Divider />

                                <CardContent>
                                    <Grid container spacing={2.5}>
                                        {dados.respostas
                                            .map((elem, index) => {
                                                return (
                                                    <Grid item xs={12} key={index}>
                                                        <Stack display={'flex'} flexDirection={'row'} alignItems={'flex-start'} >
                                                            {elem.origem === 1 ?
                                                                <>
                                                                    <Grid container>
                                                                        <Grid item xs={2} md={3} xl={4} />

                                                                        <Grid item xs={10} md={9} xl={8}>
                                                                            <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} alignItems={'flex-end'} mt={'4px'} mr={'1%'}>
                                                                                <Grid item xs={12} >
                                                                                    <Box width={'calc(100% + 8px)'} display={'inline-block'} sx={{ borderRadius: '4px', float: 'right', backgroundColor: 'rgb(22, 119, 255)', marginLeft: '8px' }}>
                                                                                        <Typography variant='h6' align='center' color="#FFFFFF">
                                                                                            {elem.conteudoReposta}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </Grid>

                                                                                <Grid item xs={12}>
                                                                                    <Typography variant='subtitle2'>
                                                                                        {format(elem.createdAt, 'dd/MM/yyyy  HH:mm:ss')}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Avatar alt="user 1">
                                                                        <BankOutlined />
                                                                    </Avatar>
                                                                </>
                                                                :
                                                                <>
                                                                    <Avatar alt="user 2">
                                                                        <UserOutlined />
                                                                    </Avatar>

                                                                    <Grid item xs={10} md={9} xl={8}>
                                                                        <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-start'} mt={'4px'} marginLeft={'1%'}>
                                                                            <Grid item xs={12} >
                                                                                <Box boxShadow={2} width={'calc(100% + 8px)'} display={'inline-block'} sx={{ borderRadius: '4px', float: 'left', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                                                    <Typography variant='h6' align='center'>
                                                                                        {elem.conteudoReposta}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Typography variant='subtitle2'>
                                                                                    {format(elem.createdAt, 'dd/MM/yyyy  HH:mm:ss')}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Stack>
                                                                    </Grid>
                                                                </>
                                                            }
                                                        </Stack>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </SimpleBar>
            </DialogContent >

            <Divider />

            <DialogActions disableSpacing sx={{ m: 1 }}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                    <Button variant="outlined" color='secondary' onClick={() => handleClose()}>Fechar</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    )
}

Ver.propTypes = { copia: PropTypes.object, handleClose: PropTypes.any, open: PropTypes.bool, user: PropTypes.any, endpoints: PropTypes.any };
