import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

// terceiros 
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';


const AddSchema = Yup.object().shape({
    nome: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(100, 'Tamanho máximo 100 caracteres').required('Nome é obrigatório'),
    usuario: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(32, 'Tamanho máximo 32 caracteres').required('Usuário é obrigatório'),
    password: Yup.string().min(6, 'Tamanho mínimo 4 caracteres').required('Senha é obrigatório'),
    plusCode: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(150, 'Tamanho máximo 150 caracteres').required('Plus code é obrigatório'),
});

export default function Add({ handleClose, open, updateDados }) {
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
        const user = store.getState().userState.user

        try {
            await endpoints.customFetch.post('/admin', event, { headers: { Authorization: `Bearer ${user.token}` } })

            updateDados()

            handleClose()
        } catch (error) {
            toast.error(error.code)

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
            <DialogTitle>Adicionar nova instituição</DialogTitle>

            <Divider />

            <Formik
                initialValues={{
                    nome: '',
                    plusCode: '',
                    usuario: '',
                    password: ''
                }}
                validationSchema={AddSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, isValid, dirty, touched, values, handleSubmit }) => (
                    <Form noValidate className='form' method='POST' onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="nome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome</InputLabel>

                                        <OutlinedInput
                                            id="nome"
                                            type="text"
                                            name="nome"
                                            value={values.nome}
                                            placeholder='Nome da instituição'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.nome && errors.nome)}
                                        />
                                    </Stack>

                                    {touched.nome && errors.nome && (
                                        <FormHelperText error id="helper-text-nome">
                                            {errors.nome}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="plusCode" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Plus code</InputLabel>

                                        <OutlinedInput
                                            id="plusCode"
                                            type="text"
                                            name="plusCode"
                                            value={values.plusCode}
                                            placeholder='Plus code'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.plusCode && errors.plusCode)}
                                        />
                                    </Stack>

                                    {touched.plusCode && errors.plusCode && (
                                        <FormHelperText error id="helper-text-plusCode">
                                            {errors.plusCode}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="usuario" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Usuário</InputLabel>

                                        <OutlinedInput
                                            id="usuario"
                                            type="text"
                                            name="usuario"
                                            value={values.usuario}
                                            placeholder='Usuário de login'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.usuario && errors.usuario)}
                                        />
                                    </Stack>

                                    {touched.usuario && errors.usuario && (
                                        <FormHelperText error id="helper-text-usuario">
                                            {errors.usuario}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1} mb={1}>
                                        <InputLabel htmlFor="password" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Senha</InputLabel>

                                        <OutlinedInput
                                            id="password"
                                            type="text"
                                            name="password"
                                            value={values.password}
                                            placeholder='Senha'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                        />
                                    </Stack>

                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password">
                                            {errors.password}
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
        </Dialog >
    )
}

Add.propTypes = { handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any };
