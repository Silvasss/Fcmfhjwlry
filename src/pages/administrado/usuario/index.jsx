import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

// terceiros
import { toast } from 'react-toastify';

// projeto import
import MainCard from '../../../components/MainCard';
import UsuarioTable from './Usuario-table';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';
import Delete from './Delete';
import Edit from './Edit';

// assets
import InsertRowBelowOutlined from '@ant-design/icons/InsertRowBelowOutlined';
import Add from './Add';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/admin/usuarios?PageSize=10`, { headers: { Authorization: `Bearer ${user.token}` } })

        const xpagination = JSON.parse(response.headers['x-pagination'])

        const api = response.data

        return { api, xpagination }
    } catch (error) {
        toast.warn(error.code)

        console.log(error)

        return { ok: false }
    }
}

export default function UsuarioPage() {
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
                const response = await endpoints.customFetch.get(`/admin/usuarios?PageNumber=${page}&PageSize=${pageSize}`, { headers: { Authorization: `Bearer ${user.token}` } })

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

    const [openEdit, setOpenEdit] = useState(false);

    const handleEditMenu = () => {
        setOpenEdit(!openEdit);
    };

    const user = store.getState().userState.user

    const updateDados = async () => {
        const response = await endpoints.customFetch.get(`/admin/usuarios?PageNumber=${pagination.currentPage}&PageSize=${pagination.pageSize}`, { headers: { Authorization: `Bearer ${user.token}` } })

        const paginationData = JSON.parse(response.headers['x-pagination'])

        setPagination({
            totalCount: paginationData.TotalCount,
            pageSize: paginationData.PageSize,
            currentPage: paginationData.CurrentPage,
            totalPages: paginationData.TotalPages
        })

        setData(response.data)
    }

    // Recebe o index da linha selecionada
    const [tableIndex, setTableIndex] = useState()

    // Recebe o index da linha que o usuário selecionou na tabela
    const handleItemClick = (index, apagar) => {
        setTableIndex(data[index].usuario_Id)

        apagar ? setOpenDelete(!openDelete) : setOpenEdit(!openEdit)
    };

    // Abrir ou fecha Delete
    const [openDelete, setOpenDelete] = useState(false);

    // Fecho dialog delete
    const handleDeleteMenu = () => {
        setOpenDelete(!openDelete);
    };

    // Abrir ou fecha Add
    const [openAdd, setOpenAdd] = useState(false);

    // Fecho dialog Add
    const handleAddMenu = () => {
        setOpenAdd(!openAdd);
    };

    return (
        <Stack spacing={3} mt={'20px'}>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
                <IconButton aria-label="expand row" size="medium" onClick={() => setOpenAdd(!openAdd)}>
                    <InsertRowBelowOutlined />
                </IconButton>
            </Stack>

            <MainCard sx={{ mt: 2 }} content={false}>
                <UsuarioTable rows={data} handleItemClick={handleItemClick} pagination={pagination} handlePageChange={handlePageChange} handlePageSizeChange={handlePageSizeChange} pageSizeOptions={calculatePageSizeOptions} />
            </MainCard>

            {openDelete && <Delete handleClose={handleDeleteMenu} id={tableIndex} open={openDelete} updateDados={updateDados} user={user} endpoints={endpoints} />}

            {openEdit && <Edit handleClose={handleEditMenu} id={tableIndex} open={openEdit} updateDados={updateDados} user={user} endpoints={endpoints} />}

            <Add handleClose={handleAddMenu} open={openAdd} updateDados={updateDados} user={user} endpoints={endpoints} />
        </Stack >
    )
}
