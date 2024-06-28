import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
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

// terceiros 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import dayjs from 'dayjs';
import { Formik } from 'formik';

// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';


// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

// Tipo de situações de matrícula
const situacoesMatricula = [
    "Matriculado",
    "Trancado",
    "Concludente",
    "Concluído"
]

export default function Add({ instituicoesDados, handleClose, open, updateDados }) {
    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    // --------------------------------- Select instituição e cursos -------------------------
    const [selectedInstituicao, setSelectedInstituicao] = useState('');
    const [selectedInstituicaoId, setSelectedInstituicaoId] = useState();
    const [selectedCursoId, setSelectedCursoId] = useState();

    const handleInstituicaoChange = (event, setFieldValue) => {
        // ----------------*Problema- quando o usuário escolher outra instituição o campo cursos, não irar atualizar pois não foi resetado*----------
        setFieldValue(event.target.name, event.target.value);

        setSelectedInstituicaoId(instituicoesDados.find(inst => inst.nome === event.target.value).instituicao_Id)

        setSelectedInstituicao(event.target.value);
    };

    const handleCursoChange = (event, setFieldValue) => {
        setFieldValue(event.target.name, event.target.value);

        setSelectedCursoId(cursos.find(inst => inst.nome === event.target.value).curso_Id)
    };

    const cursos = instituicoesDados.find(inst => inst.nome === selectedInstituicao)?.cursos || [];
    // -----------------------------------------------------------------------------------------

    const handleSubmit = async (event) => {
        const user = store.getState().userState.user

        try {
            event['curso_Id'] = selectedCursoId

            event['instituicaoId'] = selectedInstituicaoId

            await endpoints.customFetch.post('/usuario/graduacao', event, { headers: { Authorization: `Bearer ${user.token}` } })

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
                    graduacao_Id: 0,
                    situacao: 'Concluído',
                    tipo: 'Bacharelado',
                    inicio: "",
                    fim: null,
                    cursoNome: '',
                    instituicaoNome: '',
                    submit: null
                }}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ handleChange, isSubmitting, isValid, dirty, values, handleSubmit, setFieldValue }) => (
                    <Form className='form' method='POST' onSubmit={handleSubmit}>
                        <DialogContent>
                            <SimpleBar>
                                <Grid container spacing={3}>
                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="situacao" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Situação</InputLabel>

                                            <Select
                                                name="situacao"
                                                labelId="demo-simple-select-situacao"
                                                id="situacao"
                                                value={values.situacao}
                                                label="Situação"
                                                onChange={handleChange}
                                            >
                                                {
                                                    situacoesMatricula.map((elem, index) => {
                                                        return <MenuItem key={index} value={elem}>{elem}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="instituicaoNome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Instituição</InputLabel>

                                            <Select
                                                id="instituicaoNome"
                                                name="instituicaoNome"
                                                labelId="instituicaoNome-label"
                                                value={values.instituicaoNome}
                                                onChange={(event) => handleInstituicaoChange(event, setFieldValue)}
                                                label="Instituição"
                                            >
                                                {instituicoesDados.map((instituicao, index) => (
                                                    <MenuItem key={index} value={instituicao.nome}>
                                                        {instituicao.nome}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="cursoNome" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Curso</InputLabel>

                                            <Select
                                                id="cursoNome"
                                                name="cursoNome"
                                                labelId="demo-simple-select-cursoNome"
                                                value={values.cursoNome}
                                                onChange={(event) => handleCursoChange(event, setFieldValue)}
                                            >
                                                {cursos.map((curso) => (
                                                    <MenuItem key={curso.nome} value={curso.nome}>
                                                        {curso.nome}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="tipo" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Tipo</InputLabel>

                                            <Select
                                                id="tipo"
                                                name="tipo"
                                                labelId="demo-simple-select-tipo"
                                                value={values.tipo}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'Bacharelado'}>Bacharelado</MenuItem>

                                                <MenuItem value={'Licenciatura'}>Licenciatura</MenuItem>

                                                <MenuItem value={'Tecnólogo'}>Tecnólogo</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="inicio" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Início</InputLabel>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker id="inicio" views={['day', 'month', 'year']} defaultValue={dayjs(values.inicio)} onChange={(e) => handleChange({ target: { name: "inicio", value: e } })} />
                                            </LocalizationProvider>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={1} mb={1}>
                                            <InputLabel htmlFor="fim" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Fim</InputLabel>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker id="fim" disabled={values.situacao !== "Concluído"} views={['day', 'month', 'year']} defaultValue={dayjs(values.fim)} onChange={(e) => handleChange({ target: { name: "fim", value: e } })} />
                                            </LocalizationProvider>
                                        </Stack>
                                    </Grid>
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

Add.propTypes = { instituicoesDados: PropTypes.array, handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any };
