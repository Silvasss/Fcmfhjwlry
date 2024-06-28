import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import MainCard from '../../../components/MainCard';
import InstituicaoTable from './Instituicao-table';
import Add from './Add';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';
import Delete from './Delete';

// assets
import PlusOutlined from '@ant-design/icons/PlusOutlined';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/admin/instituicoes?PageSize=10`, { headers: { Authorization: `Bearer ${user.token}` } })

        const xpagination = JSON.parse(response.headers['x-pagination'])

        const api = response.data

        return { api, xpagination }
    } catch (error) {
        toast.warn(error.code)

        console.log(error)

        return { ok: false }
    }
}

export default function InstituicoesPage() {
    const { api, xpagination } = useLoaderData()

    const [data, setData] = useState(api)

    const [pagination, setPagination] = useState({
        totalCount: xpagination.TotalCount,
        pageSize: xpagination.PageSize,
        currentPage: xpagination.CurrentPage,
        totalPages: xpagination.TotalPages
    })

    useEffect(() => {
        const fetchData = async (page = 1, pageSize = 10) => {
            const user = store.getState().userState.user

            try {
                const response = await endpoints.customFetch.get(`/admin/instituicoes?PageNumber=${page}&PageSize=${pageSize}`, { headers: { Authorization: `Bearer ${user.token}` } })

                const paginationData = JSON.parse(response.headers['x-pagination'])

                setPagination({
                    totalCount: paginationData.TotalCount,
                    pageSize: paginationData.PageSize,
                    currentPage: paginationData.CurrentPage,
                    totalPages: paginationData.TotalPages
                })

                setData(response.data)
            } catch (error) {
                console.error('Fetch error:', error)
            }
        };

        fetchData(pagination.currentPage, pagination.pageSize)
    }, [pagination.currentPage, pagination.pageSize])

    const handlePageChange = (event, value) => {
        setPagination((prev) => ({ ...prev, currentPage: value }))
    }

    const handlePageSizeChange = (event) => {
        setPagination((prev) => ({ ...prev, pageSize: event.target.value, currentPage: 1 }));
    };

    // Quantidade máxima de itens
    const calculatePageSizeOptions = () => {
        const options = []

        const maxItems = pagination.totalCount

        for (let i = 10; i <= maxItems; i *= 2) {
            options.push(i)
        }

        return options
    }

    const [openAdd, setOpenAdd] = useState(false);

    const handleAddMenu = () => {
        setOpenAdd(!openAdd);
    };

    const updateDados = async () => {
        const user = store.getState().userState.user

        const response = await endpoints.customFetch.get(`/admin/instituicoes`, { headers: { Authorization: `Bearer ${user.token}` } })

        setData(response.data)
    }

    // Recebe o index da linha selecionada
    const [tableIndex, setTableIndex] = useState()

    // Recebe o index da linha que o usuário selecionou na tabela
    const handleItemClick = (index) => {
        setTableIndex(data[index].instituicao_Id)

        setOpenDelete(!openDelete)
    };

    // Abrir ou fecha Delete
    const [openDelete, setOpenDelete] = useState(false);

    // Fecho dialog delete
    const handleDeleteMenu = () => {
        setOpenDelete(!openDelete);
    };

    return (
        <Stack spacing={3} mt={'20px'}>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
                <Button startIcon={<PlusOutlined />} variant="contained" onClick={() => handleAddMenu()}>Add</Button>
            </Stack>

            <MainCard sx={{ mt: 2 }} content={false}>
                <InstituicaoTable rows={data} handleItemClick={handleItemClick} pagination={pagination} handlePageChange={handlePageChange} handlePageSizeChange={handlePageSizeChange} pageSizeOptions={calculatePageSizeOptions} />
            </MainCard>

            {openAdd && <Add handleClose={handleAddMenu} open={openAdd} updateDados={updateDados} />}

            {openDelete && <Delete handleClose={handleDeleteMenu} id={tableIndex} open={openDelete} updateDados={updateDados} />}
        </Stack >
    )
}
