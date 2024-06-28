import { useState } from 'react';
import { useLoaderData } from 'react-router-dom'

// material-ui
import Divider from '@mui/material/Divider';

// projeto import
import SolicitacaoTable from './Solicitacao-table';
import MainCard from "../../../components/MainCard";
import MuiTab from "./MuiTab";
import Edit from './Edit';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';
import Ver from './Ver';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/instituicao/solicitacao/index/${0}`, { headers: { Authorization: `Bearer ${user.token}` } })

        const api = response.data

        return { api }
    } catch (error) {
        console.log(error)

        return { ok: false }
    }
}

export default function SolicitacaoDefault() {
    const { api } = useLoaderData()

    const [dados, setDados] = useState(api)

    // Abrir ou fecha Edit
    const [openEdit, setOpenEdit] = useState(false);

    // Fecho dialog edit
    const handleEditMenu = () => {
        setOpenEdit(!openEdit);
    };

    // Recebe o objeto da linha selecionada para edição
    const [copia, setCopia] = useState()

    // Recebe o index da linha que o usuário selecionou na tabela
    const handleItemClick = (index) => {
        setCopia(dados.solicitacoes[index])

        // Qual dialog deve abrir baseado no valor da tab selecionada
        valueTab === 0 ? setOpenEdit(!openEdit) : setOpenVer(!openVer)
    };
    
    const user = store.getState().userState.user

    // Chama novamente o loader após um submit
    const updateDados = async (newValue) => {
        const response = await endpoints.customFetch.get(`/instituicao/solicitacao/index/${newValue ? newValue : valueTab}`, { headers: { Authorization: `Bearer ${user.token}` } })

        setDados(response.data)
    }

    // Tab
    const [valueTab, setValueTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        updateDados(newValue)

        setValueTab(newValue);
    };

    // Abrir ou fecha Ver
    const [openVer, setOpenVer] = useState(false);

    // Fecho dialog ver
    const handleVerDialog = () => {
        setOpenVer(!openVer);
    };

    return (
        <MainCard>
            <MuiTab pendentes={dados.pendentes} recusadas={dados.recusadas} value={valueTab} handleChange={handleChangeTab} />

            <Divider sx={{ mb: '1%' }} />

            <SolicitacaoTable
                rows={dados.solicitacoes}
                handleItemClick={handleItemClick}
                origem={valueTab}
            />

            {openEdit && <Edit handleClose={handleEditMenu} copia={copia} open={openEdit} updateDados={updateDados} user={user} endpoints={endpoints} />}

            {openVer && <Ver handleClose={handleVerDialog} copia={copia} open={openVer} user={user} endpoints={endpoints} />}
        </MainCard>
    )
}
