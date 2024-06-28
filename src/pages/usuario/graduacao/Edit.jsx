import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// terceiros 
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import * as Yup from 'yup';
import { Formik } from 'formik';

// projeto import
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';
import MainCard from '../../../components/MainCard';

// assets
import BankOutlined from '@ant-design/icons/BankOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

// Tipo de situações de matrícula
const situacoesMatricula = [
    "Matriculado",
    "Trancado",
    "Concludente",
    "Concluído",
    "Cancelamento Compulsório"
]

export default function Edit({ copia, handleClose, open, updateDados }) {
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
                const response = await endpoints.customFetch.get(`/usuario/graduacao/${copia.graduacao_Id}`, { headers: { Authorization: `Bearer ${user.token}` } })

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

    const formikRef = useRef();

    const handleExternalSubmit = async () => {
        if (formikRef.current) {          
            const values = formikRef.current.values

            values["solicitacao_Id"] = dados.solicitacao_Id

            await endpoints.customFetch.put('/usuario/graduacao', values, { headers: { Authorization: `Bearer ${user.token}` } })

            updateDados()

            handleClose()
        }
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
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
            <DialogTitle>Editar</DialogTitle>

            <Divider />

            <Formik
                innerRef={formikRef}
                initialValues={{
                    graduacao_Id: copia.graduacao_Id,
                    situacao: copia.situacao,
                    inicio: copia.inicio,
                    fim: copia.fim,
                    curso_Id: copia.curso_Id,
                    cursoNome: copia.cursoNome,
                    instituicaoId: copia.instituicaoId,
                    instituicaNome: copia.instituicaoNome,
                    conteudoReposta: "",
                    tipo: copia.tipo
                }}
                validationSchema={Yup.object().shape({
                    conteudoReposta: Yup.string().max(650)
                })}
            >
                {({ errors, handleBlur, handleChange, touched, values }) => (
                    <>
                        <DialogContent>
                            <Grid container spacing={3}>
                                {/* Mensagens */}
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="mensagens" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Histórico de mensagens</InputLabel>

                                        <MainCard>
                                            <SimpleBar style={{ maxHeight: '300px' }}>
                                                <Grid container spacing={2.5}>
                                                    {dados.resposta
                                                        .map((elem, index) => {
                                                            return (
                                                                <Grid item xs={12} key={index}>
                                                                    <Stack display={'flex'} flexDirection={'row'} alignItems={'flex-start'} >
                                                                        {elem.origem === 1 ?
                                                                            <>
                                                                                <Grid container>
                                                                                    <Grid item xs={2} md={3} xl={4} />

                                                                                    <Grid item xs={10} md={9} xl={8}>
                                                                                        <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} alignItems={'flex-end'} mt={'4px'} mr={'1%'}>
                                                                                            <Grid item xs={12} >
                                                                                                <Box width={'calc(100% + 8px)'} display={'inline-block'} sx={{ borderRadius: '4px', float: 'right', backgroundColor: 'rgb(22, 119, 255)', marginLeft: '8px' }}>
                                                                                                    <Typography variant='h6' align='center' color="#FFFFFF">
                                                                                                        {elem.conteudoReposta}
                                                                                                    </Typography>
                                                                                                </Box>
                                                                                            </Grid>

                                                                                            <Grid item xs={12}>
                                                                                                <Typography variant='subtitle2'>
                                                                                                    {format(elem.createdAt, 'dd/MM/yyyy  HH:mm:ss')}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        </Stack>
                                                                                    </Grid>
                                                                                </Grid>

                                                                                <Avatar alt="user 1">
                                                                                    <BankOutlined />
                                                                                </Avatar>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <Avatar alt="user 2">
                                                                                    <UserOutlined />
                                                                                </Avatar>

                                                                                <Grid item xs={10} md={9} xl={8}>
                                                                                    <Stack display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-start'} mt={'4px'} marginLeft={'1%'}>
                                                                                        <Grid item xs={12} >
                                                                                            <Box boxShadow={2} width={'calc(100% + 8px)'} display={'inline-block'} sx={{ borderRadius: '4px', float: 'left', backgroundColor: 'rgb(255, 255, 255)' }}>
                                                                                                <Typography variant='h6' align='center'>
                                                                                                    {elem.conteudoReposta}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                        </Grid>

                                                                                        <Grid item xs={12}>
                                                                                            <Typography variant='subtitle2'>
                                                                                                {format(elem.createdAt, 'dd/MM/yyyy  HH:mm:ss')}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Stack>
                                                                                </Grid>
                                                                            </>
                                                                        }
                                                                    </Stack>
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                            </SimpleBar>
                                        </MainCard>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="resposta" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Resposta</InputLabel>

                                        <OutlinedInput
                                            id="conteudoReposta"
                                            type="text"
                                            name="conteudoReposta"
                                            value={values.conteudoReposta}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            placeholder="Mensagem"
                                            multiline
                                            error={Boolean(touched.conteudoReposta && errors.conteudoReposta)}
                                        />
                                    </Stack>

                                    {touched.conteudoReposta && errors.conteudoReposta && (
                                        <FormHelperText error id="helper-text-conteudoReposta-signup">
                                            {errors.conteudoReposta}
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="situacao" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Situação</InputLabel>

                                        <Select
                                            name="situacao"
                                            labelId="demo-simple-select-situacao"
                                            id="situacao"
                                            value={values.situacao}
                                            label="situacao"
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

                                {errors.submit && 
                                    (<Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>)
                                }
                            </Grid>
                        </DialogContent >

                        <Divider />
                    </>
                )
                }
            </Formik >

            <DialogActions disableSpacing sx={{ m: 1 }}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                    <Button variant="outlined" color='secondary' onClick={() => handleClose()}>Cancelar</Button>

                    <Button variant="contained" type='button' sx={{ ml: '16px' }} onClick={handleExternalSubmit}>Salvar</Button>
                </Stack>
            </DialogActions>
        </Dialog >
    )
}

Edit.propTypes = { copia: PropTypes.object, handleClose: PropTypes.any, open: PropTypes.bool, updateDados: PropTypes.any };
