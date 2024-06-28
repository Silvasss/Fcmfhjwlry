import { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import Dot from '../../components/@extended/Dot';

export default function ContaUsuario() {
    const [enableEdit, setEnableEdit] = useState(true)

    const [dados, setDados] = useState()
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const api = {
                    "generalSettings": {
                        "username": "Asoka_Tana_16",
                        "accountEmail": "user@tana.com",
                        "language": "New York",
                        "signingUsing": "Facebook",
                        "secureBrowsing": true,
                        "loginNotifications": true,
                        "loginApprovals": true
                    }
                }

                setDados(api.generalSettings);
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    // List Advance Settings
    const [checked, setChecked] = useState(['SecureBrowsing']);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);

        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSubmit = async () => {
        try {
            toast.success('Sem rota!')
        } catch (error) {
            toast.error(error.code)

            console.log(error)
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
            <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', width: 'calc(100% + 24px)' }}>
                {/* Configurações Gerais */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Configurações Gerais" titleTypographyProps={{ variant: "subtitle1" }} />

                        <Divider />

                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="username" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome de usuário</InputLabel>

                                        <OutlinedInput
                                            id="username"
                                            type="text"
                                            name="username"
                                            disabled={enableEdit}
                                            value={dados.username}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="accountEmail" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Conta de e-mail</InputLabel>

                                        <OutlinedInput
                                            id="accountEmail"
                                            type="text"
                                            name="accountEmail"
                                            disabled={enableEdit}
                                            value={dados.accountEmail}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="language" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Linguagem</InputLabel>

                                        <OutlinedInput
                                            id="language"
                                            type="text"
                                            name="language"
                                            disabled={enableEdit}
                                            value={dados.language}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="signingUsing" style={{ color: "text.secondary", fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Autenticação usando</InputLabel>

                                        <OutlinedInput
                                            id="signingUsing"
                                            type="text"
                                            name="signingUsing"
                                            disabled={enableEdit}
                                            value={dados.signingUsing}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Advance Settings */}
                <Grid item sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Configurações avançadas" titleTypographyProps={{ variant: "subtitle1" }} />

                        <Divider />

                        <List>
                            <ListItem>
                                <ListItemText id="switch-list-label-SecureBrowsing" primary="Navegação segura" secondary="Navegar com segurança (https) quando necessário" />

                                <Switch
                                    edge="end"
                                    onChange={handleToggle('SecureBrowsing')}
                                    checked={checked.indexOf('SecureBrowsing') !== -1}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-SecureBrowsing',
                                    }}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText id="switch-list-label-LoginNotifications" primary="Notificações de login" secondary="Notificar quando tentativa de login de outro lugar" />

                                <Switch
                                    edge="end"
                                    onChange={handleToggle('LoginNotifications')}
                                    checked={checked.indexOf('LoginNotifications') !== -1}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-LoginNotifications',
                                    }}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText id="switch-list-label-LoginApprovals" primary="Aprovações de login" secondary="As aprovações não são necessárias ao fazer login em dispositivos não reconhecidos." />

                                <Switch
                                    edge="end"
                                    onChange={handleToggle('LoginApprovals')}
                                    checked={checked.indexOf('LoginApprovals') !== -1}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-LoginApprovals',
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                {/* Dispositivos reconhecidos */}
                <Grid item sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Dispositivos reconhecidos" titleTypographyProps={{ variant: "subtitle1" }} />

                        <Divider />

                        <List>
                            <ListItem >
                                <ListItemText id="switch-list-label-CentDesktop" primary="Cent Desktop" secondary="4351 Deans Lane, Chelmsford" />

                                <Stack display={'flex'} flexDirection={'row'} alignItems={'flex-start'}>
                                    <Dot color={'success'} />

                                    <Typography variant="body1" color="text.secondary">Ativo</Typography>
                                </Stack>
                            </ListItem>

                            <ListItem>
                                <ListItemText id="switch-list-label-ImhoTablet" primary="Imho Tablet" secondary="4185 Michigan Avenue" />

                                <Stack display={'flex'} flexDirection={'row'} alignItems={'flex-start'}>
                                    <Dot color={'warning'} />

                                    <Typography variant="body1" color="text.secondary">Ativo há 5 dias</Typography>
                                </Stack>
                            </ListItem>

                            <ListItem>
                                <ListItemText id="switch-list-label-AlbsMobile" primary="Albs Mobile" secondary="3462 Fairfax Drive, Montcalm" />

                                <Stack display={'flex'} flexDirection={'row'} alignItems={'flex-start'}>
                                    <Dot color={'warning'} />

                                    <Typography variant="body1" color="text.secondary">Ativo há 1 mês</Typography>
                                </Stack>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                {/* Sessões ativas */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Sessões ativas" titleTypographyProps={{ variant: "subtitle1" }} />

                        <Divider />

                        <List>
                            <ListItem >
                                <ListItemText id="switch-list-label-CentDesktop" primary="Cent Desktop" secondary="4351 Deans Lane, Chelmsford" />

                                <Button variant="text">Sair</Button>
                            </ListItem>

                            <ListItem>
                                <ListItemText id="switch-list-label-ImhoTablet" primary="Imho Tablet" secondary="4185 Michigan Avenue" />

                                <Button variant="text">Sair</Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                        {
                            !enableEdit ?
                                <>
                                    <Button variant="outlined" onClick={() => { setEnableEdit(true); setDados(dados) }}>Cancelar</Button>

                                    <Button variant="contained" sx={{ ml: '16px' }} onClick={() => handleSubmit()}>Salvar</Button>
                                </>
                                :
                                <>
                                    <Button variant="contained" onClick={() => setEnableEdit(false)}>Editar</Button>
                                </>
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}