import { Form } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';

// terceiros
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function Add({ handleClose, open, updateDados, user, endpoints }) {
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleSubmit = async (event) => {
        try {
            await endpoints.customFetch.post(`/admin/${event.quantidade}`, event, { headers: { Authorization: `Bearer ${user.token}` } })

            updateDados()

            handleClose()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth='md'
            fullWidth={true}
        >
            <DialogTitle>Adicionar população</DialogTitle>

            <Divider />

            <Formik
                initialValues={{
                    quantidade: 0,
                }}
                validationSchema={Yup.object().shape({
                    quantidade: Yup.number().min(1, 'Quantidade mínima é 1').max(100, 'Quantidade máxima é 100').positive('Número inteiro').integer().required('Quantidade é obrigatório')
                })}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, isValid, dirty, touched, values, handleSubmit }) => (
                    <Form noValidate className='form' method='POST' onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <DialogContentText id="alert-dialog-description">
                                            A biblioteca Bogus é uma ferramenta poderosa para gerar dados falsos realistas em aplicações .NET. Ela oferece uma ampla gama de geradores de dados que podem ser usados para
                                            criar dados pessoais, de negócios, de internet, de localização, e muito mais. Além disso, permite uma grande customização e suporte a múltiplos idiomas, tornando-a ideal
                                            para diversas necessidades de desenvolvimento e teste.
                                        </DialogContentText>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="quantidade" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Quantidade</InputLabel>

                                        <OutlinedInput
                                            id="quantidade"
                                            type="number"
                                            name="quantidade"
                                            value={values.quantidade}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            placeholder="Tamanho da população"
                                            error={Boolean(touched.quantidade && errors.quantidade)}
                                        />
                                    </Stack>

                                    {touched.quantidade && errors.quantidade && (
                                        <FormHelperText error id="helper-text-quantidade">
                                            {errors.quantidade}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent >

                        <Divider />

                        <DialogActions disableSpacing sx={{ m: 1 }}>
                            <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Button variant="outlined" color='secondary' onClick={() => handleClose()}>Cancelar</Button>

                                <Button variant="contained" type="submit" disabled={!isValid || !dirty || isSubmitting} sx={{ ml: '16px' }}>Criar</Button>
                            </Stack>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    )
}

Add.propTypes = { handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any, user: PropTypes.any, endpoints: PropTypes.any };