import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

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
import DialogContentText from '@mui/material/DialogContentText';

// terceiros
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function Delete({ id, handleClose, open, updateDados, user, endpoints }) {
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
                const response = await endpoints.customFetch.get(`/admin/usuario/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })

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

    const handleSubmit = async () => {
        try {
            await endpoints.customFetch.delete(`/admin/usuario/${id}`, { data: dados, headers: { Authorization: `Bearer ${user.token}` } })

            updateDados()

            handleClose()
        } catch (error) {
            toast.warn(error.code)

            console.log(error)
        }
    };

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
            <DialogTitle>Excluir usuário</DialogTitle>

            <Divider />

            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <DialogContentText id="alert-dialog-description">
                                Você está prestes a excluir os seguintes dados:
                            </DialogContentText>
                        </Stack>
                    </Grid>

                    {/* Perfil */}
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
                                                                Nome completo
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {dados.nome}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Stack>
                                                            <Typography color="text.secondary" variant="body1">
                                                                País
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {dados.pais}
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
                                                                E-mail
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {dados.email}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Stack>
                                                            <Typography color="text.secondary" variant="body1">
                                                                Plus code
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {dados.plusCode}
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
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent >

            <Divider />

            <DialogActions disableSpacing sx={{ m: 1 }}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                    <Button variant="outlined" color='secondary' onClick={() => handleClose()}>Cancelar</Button>

                    <Button variant="contained" color='warning' sx={{ ml: '16px' }} onClick={() => handleSubmit()}>Excluir</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    )
}

Delete.propTypes = { id: PropTypes.number, handleClose: PropTypes.func, open: PropTypes.bool, updateDados: PropTypes.func, user: PropTypes.any, endpoints: PropTypes.any };
