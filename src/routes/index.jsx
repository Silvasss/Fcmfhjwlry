import { createBrowserRouter } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import UsuarioRoutes from './UsuarioRoutes';
import InstituicaoRoutes from './InstituicaoRoutes';
import AdministradoRoutes from './AdministradoRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([HomeRoutes, LoginRoutes, UsuarioRoutes, InstituicaoRoutes, AdministradoRoutes]);

export default router;
