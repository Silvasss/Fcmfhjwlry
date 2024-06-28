import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

// terceiros 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Formik } from 'formik';

// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';

// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

// Principais tipos de vínculos empregatícios
const tiposDeVinculosEmpregaticios = [
    "CLT",
    "Estágio",
    "Empregado Doméstico",
    "Autônomo",
    "Pessoa Jurídica (PJ)",
    "Home Office"
]

// Alguns tipos de serviços do setor terciário
const tiposDeServicosSetorTerciario = [
    "Turismo",
    "Serviços bancários",
    "Restaurantes",
    "Hospitais",
    "Serviços de consultoria",
    "Corretagem de imóveis",
    "Serviços públicos",
    "Comércio de bens",
    "Alojamento e alimentação",
    "Transportes",
    "Correios",
    "Telecomunicações",
    "Financeiras e Seguros",
    "Serviços domésticos",
    "Administração Pública",
    "Defesa",
    "Seguridade Social",
    "Educação",
    "Saúde",
    "Serviços urbanos",
    "Supermercados",
    "Escolas",
    "Serviços de telemarketing",
    "Serviços de limpeza",
    "Centros comerciais",
    "Bancos",
    "Hotéis",
    "Agências de turismo",
    "Serviços logísticos",
    "Serviços de manutenção",
    "Serviços administrativos",
    "Serviços de meio ambiente",
    "Serviços de comunicação",
    "Serviços de construção e engenharia",
    "Serviços de distribuição",
    "Serviços de tecnologia da informação",
    "Serviços de pesquisa e desenvolvimento"
];

const AddSchema = Yup.object().shape({
    empresa: Yup.string().required('Empresa é obrigatório'),
    plusCode: Yup.string().required('PlusCode é obrigatório'),
    status: Yup.bool().required('Situação é obrigatório'),
    inicio: Yup.string().required('Início é obrigatório'),
    funcao: Yup.string().required('Função é obrigatório'),
    responsabilidade: Yup.string().required('Responsabilidade é obrigatório')
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
            event['ativo'] = event.status

            await endpoints.customFetch.post('/usuario/experiencia', event, { headers: { Authorization: `Bearer ${user.token}` } })

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
                    experiencia_Id: 0,
                    setor: 'Turismo',
                    empresa: '',
                    plusCode: '',
                    vinculo: 'CLT',
                    status: false,
                    fim: null,
                    inicio: '',
                    funcao: '',
                    responsabilidade: '',
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
                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="setor" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Setor</InputLabel>

                                            <Select
                                                name="setor"
                                                labelId="demo-simple-select-setor"
                                                id="setor"
                                                value={values.setor}
                                                label="setor"
                                                onChange={handleChange}
                                            >
                                                {
                                                    tiposDeServicosSetorTerciario.map((elem, index) => {
                                                        return <MenuItem key={index} value={elem}>{elem}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="empresa" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Empresa</InputLabel>

                                            <OutlinedInput
                                                id="empresa"
                                                type="text"
                                                name="empresa"
                                                value={values.empresa}
                                                placeholder='Nome da empresa'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.empresa && errors.empresa)}
                                            />
                                        </Stack>

                                        {touched.empresa && errors.empresa && (
                                            <FormHelperText error id="helper-text-empresa-signup">
                                                {errors.empresa}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="plusCode" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Plus Code</InputLabel>

                                            <OutlinedInput
                                                id="plusCode"
                                                type="text"
                                                name="plusCode"
                                                value={values.plusCode}
                                                placeholder='Plus Code Google'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.plusCode && errors.plusCode)}
                                            />
                                        </Stack>

                                        {touched.plusCode && errors.plusCode && (
                                            <FormHelperText error id="helper-text-plusCode-signup">
                                                {errors.plusCode}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="select-vinculo" style={{ color: 'text.secondary', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Vinculo</InputLabel>

                                            <Select
                                                name="vinculo"
                                                labelId="demo-simple-select-vinculo"
                                                id="vinculo"
                                                value={values.vinculo}
                                                label="vinculo"
                                                onChange={handleChange}
                                            >
                                                {
                                                    tiposDeVinculosEmpregaticios.map((elem, index) => {
                                                        return <MenuItem key={index} value={elem}>{elem}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="funcao" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Função</InputLabel>

                                            <OutlinedInput
                                                id="funcao"
                                                type="text"
                                                name="funcao"
                                                value={values.funcao}
                                                placeholder='Função'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.funcao && errors.funcao)}
                                            />
                                        </Stack>

                                        {touched.funcao && errors.funcao && (
                                            <FormHelperText error id="helper-text-funcao-signup">
                                                {errors.funcao}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="responsabilidade" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Responsabilidade</InputLabel>

                                            <OutlinedInput
                                                id="responsabilidade"
                                                type="text"
                                                name="responsabilidade"
                                                value={values.responsabilidade}
                                                placeholder='Responsabilidade'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.responsabilidade && errors.responsabilidade)}
                                            />
                                        </Stack>

                                        {touched.responsabilidade && errors.responsabilidade && (
                                            <FormHelperText error id="helper-text-responsabilidade-signup">
                                                {errors.responsabilidade}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="ativo" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Ativo</InputLabel>

                                            <Select
                                                name="ativo"
                                                labelId="demo-simple-select-ativo"
                                                id="ativo"
                                                value={values.status}
                                                label="ativo"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Atual</MenuItem>

                                                <MenuItem value={false}>Anterior</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="inicio" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Início</InputLabel>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker id="inicio" views={['day', 'month', 'year']} defaultValue={dayjs(values.inicio)} onChange={(e) => handleChange({ target: { name: "inicio", value: e } })} slotProps={{ field: { clearable: true } }} />
                                            </LocalizationProvider>
                                        </Stack>

                                        {touched.inicio && errors.inicio && (
                                            <FormHelperText error id="helper-text-descricao-inicio">
                                                {errors.inicio}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="fim" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Fim</InputLabel>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker id="fim" disabled={values.ativo} views={['day', 'month', 'year']} defaultValue={dayjs(values.fim)} onChange={(e) => handleChange({ target: { name: "fim", value: e } })} slotProps={{ field: { clearable: true } }} />
                                            </LocalizationProvider>
                                        </Stack>

                                        {touched.fim && errors.fim && (
                                            <FormHelperText error id="helper-text-descricao-fim">
                                                {errors.fim}
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
        </Dialog >
    )
}

Add.propTypes = { handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any };