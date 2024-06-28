import Usuario from "./Usuario";
import Home from "./Home";
import curso from "./instituicao/curso";
import dashboard from "./instituicao/dashboard";
import solicitacao from "./instituicao/solicitacao";
import { administrado } from "./Administrado";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [Usuario, Home, curso, dashboard, solicitacao, administrado]
};

export default menuItems;
