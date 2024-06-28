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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';

// terceiros
import * as Yup from 'yup';
import { Formik } from 'formik';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const AddSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    status: Yup.bool().required('Status é obrigatório')
});

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
            event['ativo'] = event.status

            await endpoints.customFetch.post('/instituicao/curso', event, { headers: { Authorization: `Bearer ${user.token}` } })

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
            <DialogTitle>Adicionar</DialogTitle>

            <Divider />

            <Formik
                initialValues={{
                    nome: '',
                    status: true,
                    submit: null
                }}
                validationSchema={AddSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, isValid, dirty, touched, values, handleSubmit }) => (
                    <Form noValidate className='form' method='POST' onSubmit={handleSubmit}>
                        <DialogContent>
                            <SimpleBar>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="nome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome</InputLabel>

                                            <OutlinedInput
                                                id="nome"
                                                type="text"
                                                name="nome"
                                                value={values.nome}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder="Nome"
                                                error={Boolean(touched.nome && errors.nome)}
                                            />
                                        </Stack>

                                        {touched.nome && errors.nome && (
                                            <FormHelperText error id="helper-text-nome-signup">
                                                {errors.nome}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack spacing={1} mb={1}>
                                            <InputLabel htmlFor="status" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Situação</InputLabel>

                                            <Select
                                                name="status"
                                                labelId="demo-simple-select-status"
                                                id="status"
                                                value={values.status}
                                                label="status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <MenuItem value={true}>Disponível</MenuItem>

                                                <MenuItem value={false}>Indisponível</MenuItem>
                                            </Select>
                                        </Stack>

                                        {touched.status && errors.status && (
                                            <FormHelperText error id="helper-text-descricao-status">
                                                {errors.status}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
                                </Grid>
                            </SimpleBar>
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