import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';

// terceiros
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';


export default function Delete({ copia, handleClose, open, updateDados }) {
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleSubmit = async () => {
        const user = store.getState().userState.user

        try {
            await endpoints.customFetch.delete(`/usuario/graduacao/${copia.graduacao_Id}`, { data: copia, headers: { Authorization: `Bearer ${user.token}` } })

            updateDados()

            handleClose()
        } catch (error) {
            console.log(error)
        }
    };

    if (copia === undefined) return

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth='md'
            fullWidth={true}
        >
            <DialogTitle>Excluir Dados</DialogTitle>

            <Divider />

            <DialogContent>
                <SimpleBar>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <DialogContentText id="alert-dialog-description">
                                    Você está prestes a excluir os seguintes dados:
                                </DialogContentText>
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="situacao" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Situação</InputLabel>

                                <OutlinedInput
                                    id="situacao"
                                    type="text"
                                    name="situacao"
                                    disabled
                                    value={copia.situacao}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="instituicaNome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Instituição</InputLabel>

                                <OutlinedInput
                                    id="instituicaNome"
                                    type="text"
                                    name="instituicaNome"
                                    disabled
                                    value={copia.instituicaoNome}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="cursoNome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Curso</InputLabel>

                                <OutlinedInput
                                    id="cursoNome"
                                    type="text"
                                    name="cursoNome"
                                    disabled
                                    value={copia.cursoNome}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="tipo" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Tipo</InputLabel>

                                <OutlinedInput
                                    id="tipo"
                                    type="text"
                                    name="tipo"
                                    disabled
                                    value={copia.tipo}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="inicio" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Início</InputLabel>

                                <OutlinedInput
                                    id="inicio"
                                    type="text"
                                    name="inicio"
                                    disabled
                                    value={copia.inicio}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fim" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Fim</InputLabel>

                                <OutlinedInput
                                    id="fim"
                                    type="text"
                                    name="fim"
                                    disabled
                                    value={copia.fim ? copia.fim : ""}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </SimpleBar>
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

Delete.propTypes = { copia: PropTypes.object, handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any };
