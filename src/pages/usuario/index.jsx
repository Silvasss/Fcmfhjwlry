import { useState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';

// projeto import
import MainCard from '../../components/MainCard';
import MuiTab from './MuiTab';
import Pessoal from './Pessoal';
import Inicio from './Inicio';
import ContaUsuario from './ContaUsuario';
import ConfiguracaoUsuario from './ConfiguracaoUsuario';
import AlterarSenhaUsuario from './AlterarSenhaUsuario';
import Graduacoes from './graduacao';
import Experiencia from './experincia';

const typeToComponentMap = {
  0: Inicio,
  1: Pessoal,
  2: Experiencia,
  3: Graduacoes,
  4: ContaUsuario,
  5: AlterarSenhaUsuario,
  6: ConfiguracaoUsuario
}

export default function UsuarioPage() {
  const { id } = useParams(); // Desestrutura o parâmetro 'id' da URL
  
  // Tab
  const [valueTab, setValueTab] = useState(parseInt(id));

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const DynamicComponent = () => {
    const Component = typeToComponentMap[valueTab];

    return <Component />
  }

  return (
    <MainCard>
      <MuiTab value={valueTab} handleChange={handleChangeTab} />

      <Divider sx={{ mb: '1%' }} />

      <DynamicComponent />
    </MainCard>
  );
}