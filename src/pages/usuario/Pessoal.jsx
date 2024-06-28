import { useState, useRef, useEffect } from 'react'

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

// terceiros 
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// projeto import
import { endpoints } from '../../api/menu';
import { store } from '../../context/auth';

// assets
import TwitterOutlined from '@ant-design/icons/TwitterOutlined';
import FacebookOutlined from '@ant-design/icons/FacebookOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';


const AddSchema = Yup.object().shape({
    email: Yup.string().email('must be a valid email'),
    nome: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(50, 'Tamanho máximo 50 caracteres').required('Nome é obrigatório'),
    pais: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(50, 'Tamanho máximo 50 caracteres').required('País é obrigatório'),
    plusCode: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(150, 'Tamanho máximo 150 caracteres').required('Plus code é obrigatório'),
    sobreMin: Yup.string().max(650, 'Tamanho máximo 650 caracteres').required('Sobre min é obrigatório'),
    cargoPrincipal: Yup.string().min(4, 'Tamanho mínimo 4 caracteres').max(150, 'Tamanho máximo 150 caracteres').required('Função é obrigatório'),
    portfolioURL: Yup.string().url()
});

export default function Pessoal() {
    const [enableEdit, setEnableEdit] = useState(true)

    const [dados, setDados] = useState()
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const user = store.getState().userState.user

                const response = await endpoints.customFetch.get(`/usuario`, { headers: { Authorization: `Bearer ${user.token}` } })

                setDados(response.data);
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);


    const formikRef = useRef();

    const handleExternalSubmit = async () => {
        if (formikRef.current) {
            const values = formikRef.current.values

            const user = store.getState().userState.user

            try {
                await endpoints.customFetch.put('/usuario', values, { headers: { Authorization: `Bearer ${user.token}` } })

                const response = await endpoints.customFetch.get(`/usuario`, { headers: { Authorization: `Bearer ${user.token}` } })

                setDados(response.data.value)

                setEnableEdit(true)
            } catch (error) {
                toast.error(error.code)

                console.log(error)
            }
        }
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
        return <div>Erro: {erro}</div>;
    }

    return (
        <Box mt={'20px'}>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    usuario_Id: 0,
                    nome: dados.nome,
                    pais: dados.pais,
                    plusCode: dados.plusCode,
                    sobreMin: dados.sobreMin,
                    cargoPrincipal: dados.cargoPrincipal,
                    email: dados.email,
                    portfolioURL: dados.portfolioURL,
                    experiencia: dados.experiencia
                }}
                validationSchema={AddSchema}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, isValid, dirty, touched, values, handleReset }) => (
                    <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', width: 'calc(100% + 24px)' }}>
                        <Grid item sm={6} xs={12}>
                            {/* Informações pessoais */}
                            <Card>
                                <CardHeader title="Informações pessoais" titleTypographyProps={{ variant: "subtitle1" }} />

                                <Divider />

                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'24px'}>
                                                <Stack>
                                                    <Avatar
                                                        alt="Anshan H."
                                                        src="https://lordicon.com/icons/system/solid/2-accessibility.svg"
                                                        sx={{ height: '76px', width: '76px' }}
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="nome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome</InputLabel>

                                                <OutlinedInput
                                                    id="nome"
                                                    type="text"
                                                    name="nome"
                                                    disabled={enableEdit}
                                                    value={values.nome}
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
                                                <InputLabel htmlFor="pais" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>País</InputLabel>

                                                <OutlinedInput
                                                    id="pais"
                                                    type="text"
                                                    name="pais"
                                                    disabled={enableEdit}
                                                    value={values.pais}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    error={Boolean(touched.pais && errors.pais)}
                                                />
                                            </Stack>

                                            {touched.pais && errors.pais && (
                                                <FormHelperText error id="helper-text-pais">
                                                    {errors.pais}
                                                </FormHelperText>
                                            )}
                                        </Grid>

                                        <Grid item sm={6} xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="pluscode" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Plus code</InputLabel>

                                                <OutlinedInput
                                                    id="plusCode"
                                                    type="text"
                                                    name="plusCode"
                                                    disabled={enableEdit}
                                                    value={values.plusCode}
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

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="sobremin" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Sobre Min</InputLabel>

                                                <OutlinedInput
                                                    id="sobreMin"
                                                    type="text"
                                                    name="sobreMin"
                                                    multiline
                                                    disabled={enableEdit}
                                                    value={values.sobreMin}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    error={Boolean(touched.sobreMin && errors.sobreMin)}
                                                />
                                            </Stack>

                                            {touched.sobreMin && errors.sobreMin && (
                                                <FormHelperText error id="helper-text-sobreMin">
                                                    {errors.sobreMin}
                                                </FormHelperText>
                                            )}
                                        </Grid>

                                        <Grid item sm={6} xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="experiencia" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Experiência</InputLabel>

                                                <Select
                                                    labelId="experiencia"
                                                    id="experiencia"
                                                    name='experiencia'
                                                    value={values.experiencia}
                                                    onChange={handleChange}
                                                    disabled={enableEdit}
                                                >
                                                    <MenuItem value={"Start Up"}>Start Up</MenuItem>
                                                    <MenuItem value={"6 months"}>6 meses</MenuItem>
                                                    <MenuItem value={"1 Year"}>1 Ano</MenuItem>
                                                    <MenuItem value={"2 Year"}>2 Ano</MenuItem>
                                                    <MenuItem value={"3 Year"}>3 Ano</MenuItem>
                                                    <MenuItem value={"4 Year"}>4 Ano</MenuItem>
                                                    <MenuItem value={"5 Year"}>5 Ano</MenuItem>
                                                </Select>
                                            </Stack>
                                        </Grid>

                                        <Grid item sm={6} xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="cargoPrincipal" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Função principal</InputLabel>

                                                <OutlinedInput
                                                    id="cargoPrincipal"
                                                    type="text"
                                                    name="cargoPrincipal"
                                                    disabled={enableEdit}
                                                    value={values.cargoPrincipal}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    error={Boolean(touched.cargoPrincipal && errors.cargoPrincipal)}
                                                />
                                            </Stack>

                                            {touched.cargoPrincipal && errors.cargoPrincipal && (
                                                <FormHelperText error id="helper-text-cargoPrincipal">
                                                    {errors.cargoPrincipal}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Grid container spacing={3}>
                                {/* Rede social */}
                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Rede social" titleTypographyProps={{ variant: "subtitle1" }} />

                                        <Divider />

                                        <CardContent>
                                            <Stack display={'flex'} flexDirection={'column'}>
                                                <Stack display={'flex'} flexDirection="row" justifyContent="space-between" alignItems="center">
                                                    <Button variant="text" size="small" startIcon={<TwitterOutlined />}>
                                                        Twitter
                                                    </Button>

                                                    <Button variant="text" size="small" color="error">
                                                        Connect
                                                    </Button>
                                                </Stack>

                                                <Stack display={'flex'} flexDirection="row" justifyContent="space-between" alignItems="center">
                                                    <Button variant="text" size="small" startIcon={<FacebookOutlined />}>
                                                        Facebook
                                                    </Button>

                                                    <Button variant="text" size="small" color="error">
                                                        Connect
                                                    </Button>
                                                </Stack>

                                                <Stack display={'flex'} flexDirection="row" justifyContent="space-between" alignItems="center">
                                                    <Button variant="text" size="small" startIcon={<LinkedinOutlined />}>
                                                        LinkedIn
                                                    </Button>

                                                    <Button variant="text" size="small" color="error">
                                                        Connect
                                                    </Button>
                                                </Stack>
                                            </Stack>

                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Contact Information */}
                                <Grid item xs={12}>
                                    <Card mt={2}>
                                        <CardHeader title="Informações de contato" titleTypographyProps={{ variant: "subtitle1" }} />

                                        <Divider />

                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="email" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Email Address</InputLabel>

                                                        <OutlinedInput
                                                            id="email"
                                                            type="text"
                                                            name="email"
                                                            disabled={enableEdit}
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            fullWidth
                                                            error={Boolean(touched.email && errors.email)}
                                                        />
                                                    </Stack>

                                                    {touched.email && errors.email && (
                                                        <FormHelperText error id="helper-text-email">
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="portfolioURL" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Portfolio URL</InputLabel>

                                                        <OutlinedInput
                                                            id="portfolioURL"
                                                            type="url"
                                                            name="portfolioURL"
                                                            disabled={enableEdit}
                                                            value={values.portfolioURL}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            fullWidth
                                                            error={Boolean(touched.portfolioURL && errors.portfolioURL)}
                                                        />
                                                    </Stack>

                                                    {touched.portfolioURL && errors.portfolioURL && (
                                                        <FormHelperText error id="helper-text-portfolioURL">
                                                            {errors.portfolioURL}
                                                        </FormHelperText>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                {
                                    !enableEdit ?
                                        <>
                                            <Button variant="outlined" type='reset' onClick={() => { setEnableEdit(true); handleReset() }}>Cancelar</Button>

                                            <Button variant="contained" disabled={isValid || !dirty || isSubmitting} sx={{ ml: '16px' }} onClick={handleExternalSubmit}>Salvar</Button>
                                        </>
                                        :
                                        <>
                                            <Button variant="contained" onClick={() => setEnableEdit(false)}>Editar</Button>
                                        </>
                                }
                            </Stack>
                        </Grid>
                    </Grid >
                )}
            </Formik>
        </Box >
    )
}