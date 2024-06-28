import { useState, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// terceiros
import { format } from 'date-fns';

// assets
import MailOutlined from '@ant-design/icons/MailOutlined';
import AimOutlined from '@ant-design/icons/AimOutlined';
import TwitterOutlined from '@ant-design/icons/TwitterOutlined';
import FacebookOutlined from '@ant-design/icons/FacebookOutlined';
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';

// projeto import
import { endpoints } from '../../api/menu';
import { store } from '../../context/auth';
import { twitterColor, facebookColor, linkedInColor } from '../../config';

export default function Inicio() {
  const [api, setApi] = useState()
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar dados da API
    const fetchData = async () => {
      try {
        const user = store.getState().userState.user

        const response = await endpoints.customFetch.get(`/usuario`, { headers: { Authorization: `Bearer ${user.token}` } })

        setApi(response.data);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <Box mt={'20px'}>
      <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', width: 'calc(100% + 24px)' }}>
        {/* Card esquerdo */}
        <Grid item xl={3} md={4} sm={5} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Stack>
                          <Avatar
                            alt="Anshan H."
                            src="https://lordicon.com/icons/system/solid/2-accessibility.svg"
                            sx={{ height: '80px', width: '80px' }}
                          />
                        </Stack>

                        <Stack>
                          <Typography variant="h5" align='center'>{api.nome}</Typography>

                          <Typography variant="body1" color="text.secondary" align='center'>{api.cargoPrincipal}</Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>

                    <Grid item xs={12}>
                      <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                        <TwitterOutlined style={{ color: twitterColor }} />

                        <FacebookOutlined style={{ color: facebookColor }} />

                        <LinkedinOutlined style={{ color: linkedInColor }} />
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider />
                    </Grid>

                    <Grid item xs={12}>
                      <List >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          <ListItem disableGutters secondaryAction={<Typography variant="body1" align='right'>{api.email}</Typography>}>
                            <ListItemIcon sx={{ fontSize: 20 }}>
                              <MailOutlined style={{ fontSize: '16px' }} />
                            </ListItemIcon>
                          </ListItem>

                          <ListItem disableGutters secondaryAction={<Typography variant="body1" align='right'>{api.pais}</Typography>}>
                            <ListItemIcon sx={{ fontSize: 20 }}>
                              <AimOutlined style={{ fontSize: '16px' }} />
                            </ListItemIcon>
                          </ListItem>

                          <ListItem disableGutters secondaryAction={<Typography variant="body1" align='right'>{api.portfolioURL}</Typography>}>
                            <ListItemIcon sx={{ fontSize: 20 }}>
                              <EnvironmentOutlined style={{ fontSize: '16px' }} />
                            </ListItemIcon>
                          </ListItem>
                        </List>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Card direita */}
        <Grid item xs={12} sm={7} md={8} xl={9}>
          <Grid container spacing={3}>
            {/* Sobre mim */}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Sobre mim" />

                <Divider />

                <CardContent>
                  <Stack mt={2}>
                    <Stack spacing={1.25} sx={{ p: 0.5 }}>
                      <Typography variant="body1" color="text.secondary">
                        {api.sobreMin}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Detalhes pessoais */}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Detalhes pessoais" />

                <Divider />

                <CardContent>
                  <List>
                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <Typography color="text.secondary" variant="body1">
                              Nome completo
                            </Typography>

                            <Typography variant="body1">
                              {api.nome}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <Typography color="text.secondary" variant="body1">
                              País
                            </Typography>

                            <Typography variant="body1">
                              {api.pais}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>

                    <Divider />

                    <ListItem>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack>
                            <Typography color="text.secondary" variant="body1">
                              E-mail
                            </Typography>

                            <Typography variant="body1">
                              {api.email}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack>
                            <Typography color="text.secondary" variant="body1">
                              Plus code
                            </Typography>

                            <Typography variant="body1">
                              {api.plusCode}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Educação */}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Educação" />

                <Divider />

                <CardContent>
                  <List>
                    {api.educacao
                      .map((elem, index) => {
                        return (
                          <Box key={index}>
                            <ListItem >
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                  <Stack>
                                    <Typography color="text.secondary" variant="body1">
                                      {elem.tipo}
                                    </Typography>

                                    <Typography variant="body1">
                                      {format(elem.inicio, 'yyyy')} - {elem.fim ? format(elem.fim, 'yyyy') : 'Atual'}
                                    </Typography>
                                  </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <Stack>
                                    <Typography color="text.secondary" variant="body1">
                                      Instituição
                                    </Typography>

                                    <Typography variant="body1">
                                      {elem.instituicaoNome}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </ListItem>

                            <Divider />
                          </Box>
                        )
                      })
                    }
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Emprego */}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Emprego" />

                <Divider />

                <CardContent>
                  <List>
                    {api.emprego
                      .map((elem, index) => {
                        return (
                          <Box key={index}>
                            <ListItem>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                  <Stack>
                                    <Typography color="text.secondary" variant="body1">
                                      {elem.funcao}
                                    </Typography>

                                    <Typography variant="body1" mt={'4px'}>
                                      {format(elem.inicio, 'yyyy')} - {elem.fim ? format(elem.fim, 'yyyy') : 'Atual'}
                                    </Typography>
                                  </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <Stack>
                                    <Typography color="text.secondary" variant="body1">
                                      Responsabilidade de trabalho
                                    </Typography>

                                    <Typography variant="body1" mt={'4px'}>
                                      {elem.responsabilidade}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </ListItem>

                            <Divider />
                          </Box>
                        )
                      })
                    }
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Skills */}
            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardHeader titleTypographyProps={{ variant: 'subtitle1' }} title="Skills" />

                <Divider />

                <CardContent>
                  <Box>
                    <ListItem sx={{ flexWrap: 'wrap' }}>
                      <Chip label={'Codeigniter'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                      <Chip label={'HTML'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                      <Chip label={'Prototyping'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                      <Chip label={'Mobile App'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                      <Chip label={'Figma'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary", mr: 0.5 }} />

                      <Chip label={'Angular'} variant="outlined" size="small" sx={{ borderRadius: 1, color: "text.secondary" }} />
                    </ListItem>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </Box>
  );
}