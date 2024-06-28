import { useState } from 'react';
import { Form } from 'react-router-dom'

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

const AlterarSenhaSchema = Yup.object().shape({
    senhaAntiga: Yup.string()
        .min(6, 'Pelo menos 6 caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .required('A senha antiga é obrigatória'),
    novaSenha: Yup.string()
        .min(6, 'Pelo menos 6 caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .required('Nova senha é necessária')
        .test('not-same-as-old', 'A nova senha deve ser diferente da senha atual', function (value) {
            return value !== this.parent.senhaAntiga;
        }),
    confirmeSenha: Yup.string()
        .min(6, 'Pelo menos 6 caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .required('Confirmar senha é obrigatório')
        .oneOf([Yup.ref('novaSenha'), null], 'As senhas devem coincidir')
});

export default function AlterarSenhaUsuario() {
    const [showSenhaAntiga, setShowSenhaAntiga] = useState(false);

    const [showNovaSenha, setShowNovaSenha] = useState(false);

    const [showConfirmeSenha, setShowConfirmeSenha] = useState(false);

    return (
        <Box mt={'20px'}>
            <Card>
                <CardHeader title="Alterar senha" titleTypographyProps={{ variant: "subtitle1" }} />

                <Divider />

                <CardContent>
                    <Formik
                        initialValues={{
                            senhaAntiga: '',
                            novaSenha: '',
                            confirmeSenha: '',
                            submit: null
                        }}
                        validationSchema={AlterarSenhaSchema}
                    >
                        {({ errors, handleBlur, handleChange, isSubmitting, isValid, dirty, touched, values }) => (
                            <Form noValidate className='form' method='POST'>
                                <Grid container spacing={3}>
                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="senhaAntiga" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Senha Antiga</InputLabel>

                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.senhaAntiga && errors.senhaAntiga)}
                                                id="senhaAntiga"
                                                type={showSenhaAntiga ? 'text' : 'password'}
                                                value={values.senhaAntiga}
                                                name="senhaAntiga"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowSenhaAntiga(!showSenhaAntiga)}
                                                            onMouseDown={(event) => event.preventDefault()}
                                                            edge="end"
                                                            color="secondary"
                                                        >
                                                            {showSenhaAntiga ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Senha Antiga"
                                            />
                                        </Stack>

                                        {touched.senhaAntiga && errors.senhaAntiga && (
                                            <FormHelperText error id="standard-weight-helper-text-senhaAntiga">
                                                {errors.senhaAntiga}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="novaSenha" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nova Senha</InputLabel>

                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.novaSenha && errors.novaSenha)}
                                                id="novaSenha"
                                                type={showNovaSenha ? 'text' : 'password'}
                                                value={values.novaSenha}
                                                name="novaSenha"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowNovaSenha(!showNovaSenha)}
                                                            onMouseDown={(event) => event.preventDefault()}
                                                            edge="end"
                                                            color="secondary"
                                                        >
                                                            {showNovaSenha ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Nova Senha"
                                            />
                                        </Stack>

                                        {touched.novaSenha && errors.novaSenha && (
                                            <FormHelperText error id="standard-weight-helper-text-novaSenha">
                                                {errors.novaSenha}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="confirmeSenha" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Confirme sua senha</InputLabel>

                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.confirmeSenha && errors.confirmeSenha)}
                                                id="confirmeSenha"
                                                type={showConfirmeSenha ? 'text' : 'password'}
                                                value={values.confirmeSenha}
                                                name="confirmeSenha"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowConfirmeSenha(!showConfirmeSenha)}
                                                            onMouseDown={(event) => event.preventDefault()}
                                                            edge="end"
                                                            color="secondary"
                                                        >
                                                            {showConfirmeSenha ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Confirme sua senha"
                                            />
                                        </Stack>

                                        {touched.confirmeSenha && errors.confirmeSenha && (
                                            <FormHelperText error id="standard-weight-helper-text-confirmeSenha">
                                                {errors.confirmeSenha}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Button variant="contained" type="submit" disabled={!isValid || !dirty || isSubmitting}>Alterar senha</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box >
    );
}
