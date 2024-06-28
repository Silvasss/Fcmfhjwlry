import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// terceiros
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);

    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        nome: '',
        usuario: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        nome: Yup.string().max(50).required('Nome é obrigatório'),
        usuario: Yup.string().max(32).required('Usuário é obrigatório'),
        password: Yup.string().max(16).required('A senha é obrigatória')
      })}
    >
      {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
        <Form noValidate className='form' method='POST'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">Nome</InputLabel>

                <OutlinedInput
                  id="nome-login"
                  type="nome"
                  value={values.nome}
                  name="nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nome"
                  fullWidth
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
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Usuário</InputLabel>

                <OutlinedInput
                  id="usuario-login"
                  type="usuario"
                  value={values.usuario}
                  name="usuario"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Usuário"
                  fullWidth
                  error={Boolean(touched.usuario && errors.usuario)}
                />
              </Stack>

              {touched.usuario && errors.usuario && (
                <FormHelperText error id="helper-text-usuario-signup">
                  {errors.usuario}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Senha</InputLabel>

                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  inputProps={{}}
                />
              </Stack>

              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.password}
                </FormHelperText>
              )}

              <FormControl fullWidth sx={{ mt: 2 }}>
                <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>

                  <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                </Stack>
              </FormControl>
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Cadastrar-se
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
