import { useState } from 'react';
import { Link as RouterLink, Form } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// projeto import
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        usuario: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        usuario: Yup.string().max(32).required('Usuário é obrigatório'),
        password: Yup.string().max(16).required('A senha é obrigatória')
      })}
    >
      {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
        <Form noValidate className='form' method='POST'>
          <Grid container spacing={3}>
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
                <FormHelperText error id="standard-weight-helper-text-usuario-login">
                  {errors.usuario}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Senha</InputLabel>

                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  placeholder="Digite a senha"
                />
              </Stack>

              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Link variant="h6" component={RouterLink} color="text.primary">
                  Esqueceu a senha?
                </Link>
              </Stack>
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Entrar
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}