import { Link, redirect } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { endpoints } from '../../api/menu';
import { loginUser, store } from '../../context/auth';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    try {
        const response = await endpoints.customFetch.post('/auth/login', data)

        store.dispatch(loginUser(response.data))

        toast.success('Login efetuado! Redirecionando...')

        if (response.data.role === 'admin') return redirect('/admin/default')
            
        if (response.data.role === 'instituicao') return redirect('/instituicao/default')

        return redirect('/perfil/conta/0')
    } catch (error) {
        toast.error("Credenciais inválidas")

        return null
    }
}

// ================================|| LOGIN ||================================ //

export default function Login() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Entrar</Typography>

                        <Typography component={Link} to="/auth/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Ainda não possui uma conta? Cadastrar-se
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <AuthLogin />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
