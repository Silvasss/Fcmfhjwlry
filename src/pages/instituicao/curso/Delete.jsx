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

export default function Delete({ copia, handleClose, open, updateDados, user, endpoints  }) {
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
        try {
            await endpoints.customFetch.delete(`/instituicao/curso/${copia.curso_Id}`, { data: copia, headers: { Authorization: `Bearer ${user.token}` } })

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
                                <InputLabel htmlFor="nome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome</InputLabel>

                                <OutlinedInput
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    disabled
                                    value={copia.nome}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1} mb={1}>
                                <InputLabel htmlFor="status" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Situação</InputLabel>

                                <OutlinedInput
                                    id="status"
                                    type="text"
                                    name="status"
                                    disabled
                                    value={copia.ativo}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <DialogContentText id="alert-dialog-description">
                                    <strong>Consequências:</strong> A exclusão desses dados resultará na perda e outras contas associadas podem se afetadas
                                </DialogContentText>
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

Delete.propTypes = { copia: PropTypes.object, handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any, user: PropTypes.any, endpoints: PropTypes.any };
