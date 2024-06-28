import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'

// material-ui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// assets
import PlusOutlined from '@ant-design/icons/PlusOutlined';

// projeto import
import CursoTable from './Curso-table';
import Add from './Add';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';
import Edit from './Edit';
import Delete from './Delete';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['dados'], queryFn: () => endpoints.customFetch.get(`/instituicao/curso`, { headers: { Authorization: `Bearer ${user.token}` } }) })

        const api = response.data

        return { api }
    } catch (error) {
        console.log(error)

        return { ok: false }
    }
}

export default function CursoDefault() {
    const { api } = useLoaderData()

    const [dados, setDados] = useState(api);

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

    const user = store.getState().userState.user

    // Chama novamente o loader após um submit
    const updateDados = async () => {
        const response = await endpoints.customFetch.get(`/instituicao/curso`, { headers: { Authorization: `Bearer ${user.token}` } })

        setDados(response.data)
    }

    // Abrir ou fecha Delete
    const [openDelete, setOpenDelete] = useState(false);

    // Fecho dialog delete
    const handleDeleteMenu = () => {
        setOpenDelete(!openDelete);
    };

    return (
        <Stack spacing={3} mt={'20px'}>
            <Card sx={{ p: 2 }}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                    <Typography variant="subtitle1">Informações cursos</Typography>

                    <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)}>
                        <PlusOutlined />
                    </IconButton>
                </Stack>

                <Divider />

                <CursoTable
                    rows={dados}
                    handleItemClick={handleItemClick}
                />
            </Card >

            <Add handleClose={handleAddMenu} open={open} updateDados={updateDados} user={user} endpoints={endpoints} />

            <Edit handleClose={handleEditMenu} copia={copia} open={openEdit} updateDados={updateDados} user={user} endpoints={endpoints} />

            <Delete handleClose={handleDeleteMenu} copia={copia} open={openDelete} updateDados={updateDados} user={user} endpoints={endpoints} />
        </Stack >
    )
}
