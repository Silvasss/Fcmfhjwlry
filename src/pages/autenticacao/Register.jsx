import { Link, redirect } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';
import { endpoints } from '../../api/menu';
import { registerUser, store } from '../../context/auth';


export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    try {
        const response = await endpoints.customFetch.post('/auth/register', data)

        store.dispatch(registerUser(response.data))

        toast.success('Usuário criado! Redirecionando...')

        return redirect('/auth/login')
    } catch (error) {
        toast.error("Credenciais inválidas")

        return null
    }
}

// ================================|| REGISTER ||================================ //

export default function Register() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Junte-se</Typography>

                        <Typography component={Link} to="/auth/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Já faz parte?
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <AuthRegister />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
