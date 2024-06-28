import { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import { endpoints } from '../../api/menu';
import { store } from '../../context/auth';

export default function ConfiguracaoUsuario() {
    const [dados, setDados] = useState()
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const user = store.getState().userState.user

                const response = await endpoints.customFetch.get(`/usuario/configuracoes`, { headers: { Authorization: `Bearer ${user.token}` } })

                setDados(response.data.configuracoesConta ? response.data.configuracoesConta : []);
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleToggle = (value) => () => {
        const currentIndex = dados.indexOf(value);

        const newdados = [...dados];

        if (currentIndex === -1) {
            newdados.push(value);
        } else {
            newdados.splice(currentIndex, 1);
        }

        setDados(newdados);
    };

    const handleSubmit = async () => {
        const user = store.getState().userState.user

        try {
            await endpoints.customFetch.put('/usuario/configuracoes', dados, { headers: { Authorization: `Bearer ${user.token}` } })

            const response = await endpoints.customFetch.get(`/usuario/configuracoes`, { headers: { Authorization: `Bearer ${user.token}` } })

            setDados(response.data.configuracoesConta)
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
                <Grid item sm={6} xs={12}>
                    <Grid container spacing={3}>
                        {/* Configurações de e-mail */}
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Configurações de e-mail" titleTypographyProps={{ variant: "subtitle1" }} />

                                <Divider />

                                <CardContent>
                                    <Stack display={'flex'} flexDirection={'column'}>
                                        <Typography variant="subtitle1">Configurar notificação por e-mail</Typography>

                                        <List>
                                            <ListItem>
                                                <ListItemText id="switch-list-label-emailNotification" primary={<Typography variant="body1" color="text.secondary">Notificação de Email</Typography>} />

                                                <Switch
                                                    edge="end"
                                                    onChange={handleToggle("emailNotification")}
                                                    checked={dados.indexOf("emailNotification") !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-emailNotification',
                                                    }}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText id="switch-list-label-sendCopyEmail" primary={<Typography variant="body1" color="text.secondary">Enviar cópia para e-mail pessoal</Typography>} />

                                                <Switch
                                                    edge="end"
                                                    onChange={handleToggle('sendCopyEmail')}
                                                    checked={dados.indexOf('sendCopyEmail') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-sendCopyEmail',
                                                    }}
                                                />
                                            </ListItem>
                                        </List>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Atualizações da notificação do sistema */}
                        <Grid item xs={12}>
                            <Card mt={2}>
                                <CardHeader title="Atualizações da notificação do sistema" titleTypographyProps={{ variant: "subtitle1" }} />

                                <Divider />

                                <CardContent>
                                    <Stack display={'flex'} flexDirection={'column'}>
                                        <Typography variant="subtitle1">Email para você com?</Typography>

                                        <List>
                                            <ListItem>
                                                <ListItemText id="switch-list-label-PCTthemes" primary={<Typography variant="body1" color="text.secondary">Notícias sobre produtos com temas PCT e atualizações de recursos</Typography>} />

                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle('PCTthemes')}
                                                    checked={dados.indexOf('PCTthemes') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-PCTthemes',
                                                    }}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText id="switch-list-label-TipsGetting" primary={<Typography variant="body1" color="text.secondary">Dicas para aproveitar melhor os temas PCT</Typography>} />

                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle('TipsGetting')}
                                                    checked={dados.indexOf('TipsGetting') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-TipsGetting',
                                                    }}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText id="switch-list-label-ThingsMissed" primary={<Typography variant="body1" color="text.secondary">Coisas que você perdeu desde a última vez que fez login nos temas PCT</Typography>} />

                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle('ThingsMissed')}
                                                    checked={dados.indexOf('ThingsMissed') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-ThingsMissed',
                                                    }}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText id="switch-list-label-NewsProducts" primary={<Typography variant="body1" color="text.secondary">Notícias sobre produtos e outros serviços</Typography>} />

                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle('NewsProducts')}
                                                    checked={dados.indexOf('NewsProducts') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-NewsProducts',
                                                    }}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText id="switch-list-label-TipsDocument" primary={<Typography variant="body1" color="text.secondary">Dicas e documentos de produtos comerciais</Typography>} />

                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle('TipsDocument')}
                                                    checked={dados.indexOf('TipsDocument') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-TipsDocument',
                                                    }}
                                                />
                                            </ListItem>
                                        </List>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <Grid container spacing={3}>
                        {/* Emails relacionados a atividades*/}
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Emails relacionados a atividades" titleTypographyProps={{ variant: "subtitle1" }} />

                                <Divider />

                                <CardContent>
                                    <Stack>
                                        <Typography variant="subtitle1">Quando enviar e-mail?</Typography>

                                        <List>
                                            <ListItem>
                                                <ListItemText id="switch-list-label-newNotifications" primary={<Typography variant="body1" color="text.secondary">Tenha novas notificações</Typography>} />

                                                <Switch
                                                    edge="end"
                                                    onChange={handleToggle('newNotifications')}
                                                    checked={dados.indexOf('newNotifications') !== -1}
                                                    inputProps={{
                                                        'aria-labelledby': 'switch-list-label-newNotifications',
                                                    }}
                                                />
                                            </ListItem>
                                        </List>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                        <Button variant="contained" sx={{ ml: '16px' }} onClick={() => handleSubmit()}>Salvar</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box >
    )
}