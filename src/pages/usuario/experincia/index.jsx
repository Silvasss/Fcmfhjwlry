import { useState, useEffect } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// assets
import PlusOutlined from '@ant-design/icons/PlusOutlined';

// projeto import
import ExperienciaTable from './Experiencia-table';
import Edit from './Edit';
import Add from './Add';
import Delete from './Delete';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';

export default function Experiencia() {
    const [dados, setDados] = useState()
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchData = async () => {
            try {
                const user = store.getState().userState.user

                const response = await endpoints.customFetch.get(`/usuario/experiencia`, { headers: { Authorization: `Bearer ${user.token}` } })

                setDados(response.data);
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    // Abrir ou fecha Add
    const [open, setOpen] = useState(false);

    // Fecha dialog add
    const handleAddMenu = () => {
        setOpen(!open);
    };

    // Abrir ou fecha Edit
    const [openEdit, setOpenEdit] = useState(false);

    // Fecho dialog edit
    const handleEditMenu = () => {
        setOpenEdit(!openEdit);
    };

    // Recebe o objeto da linha selecionada para edição
    const [copia, setCopia] = useState()

    // Recebe o index da linha que o usuário selecionou na tabela
    const handleItemClick = (index, apagar) => {
        setCopia(dados[index])

        apagar ? setOpenDelete(!openDelete) : setOpenEdit(!openEdit)
    };

    // Chama novamente o loader após um submit
    const updateDados = async () => {
        const user = store.getState().userState.user

        const response = await endpoints.customFetch.get(`/usuario/experiencia`, { headers: { Authorization: `Bearer ${user.token}` } })

        setDados(response.data)
    }

    // Abrir ou fecha Delete
    const [openDelete, setOpenDelete] = useState(false);

    // Fecho dialog delete
    const handleDeleteMenu = () => {
        setOpenDelete(!openDelete);
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
        return <div>Erro: {erro}</div>;
    }

    return (
        <Stack spacing={3} mt={'20px'}>
            <Card sx={{ p: 2 }}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                    <Typography variant="subtitle1">Informações profissionais</Typography>

                    <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)}>
                        <PlusOutlined />
                    </IconButton>
                </Stack>

                <Divider />

                <ExperienciaTable
                    rows={dados}
                    handleItemClick={handleItemClick}
                />
            </Card >

            <Add handleClose={handleAddMenu} open={open} updateDados={updateDados} />

            <Edit handleClose={handleEditMenu} copia={copia} open={openEdit} updateDados={updateDados} />

            <Delete handleClose={handleDeleteMenu} copia={copia} open={openDelete} updateDados={updateDados} />
        </Stack >
    )
}