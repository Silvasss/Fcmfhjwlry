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


// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';

export default function Delete({ id, handleClose, open, updateDados }) {
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

    const user = store.getState().userState.user

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const response = await endpoints.customFetch.get(`/admin/instituicao/info/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })

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
            await endpoints.customFetch.delete(`/admin/${id}`, { data: dados, headers: { Authorization: `Bearer ${user.token}` } })

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
            <DialogTitle>Excluir instituição</DialogTitle>

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

                    <Grid item xs={12}>
                        <Grid container spacing={2.25} mb={1}>
                            {/* Detalhes da conta */}
                            <Grid item xs={12}>
                                <Card variant='outlined'>
                                    <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Detalhes" />

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
                                                                {dados.nome}
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

                                            <Divider />

                                            <ListItem>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <Stack>
                                                            <Typography color="text.secondary" variant="body1">
                                                                Data de criação
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {format(dados.createdAt, 'dd/MM/yyyy')}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Stack>
                                                            <Typography color="text.secondary" variant="body1">
                                                                Última atualização
                                                            </Typography>

                                                            <Typography variant="body1">
                                                                {format(dados.updatedAt, 'dd/MM/yyyy')}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Cursos */}
                            <Grid item xs={12}>
                                <Card variant='outlined'>
                                    <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Cursos" />

                                    <Divider />

                                    <CardContent>
                                        <List>
                                            {dados.cursos
                                                .map((elem, index) => {
                                                    return (
                                                        <Box key={index}>
                                                            <ListItem >
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12} md={6}>
                                                                        <Stack>
                                                                            <Typography color="text.secondary" variant="body1">
                                                                                Data criação e última atualização
                                                                            </Typography>

                                                                            <Typography variant="body1">
                                                                                {format(elem.createdAt, 'dd/MM/yyyy')} - {format(elem.updatedAt, 'dd/MM/yyyy')}
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6}>
                                                                        <Stack>
                                                                            <Typography color="text.secondary" variant="body1">
                                                                                Nome
                                                                            </Typography>

                                                                            <Typography variant="body1">
                                                                                {elem.nome}
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItem>

                                                            <Divider />
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

Delete.propTypes = { id: PropTypes.number, handleClose: PropTypes.func, open: PropTypes.bool, updateDados: PropTypes.func };
