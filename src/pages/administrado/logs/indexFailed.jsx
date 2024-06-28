import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// projeto import
import MainCard from '../../../components/MainCard';
import LogTable from './Log-tableFailed';
import { endpoints } from '../../../api/menu';
import { store } from '../../../context/auth';

export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.customFetch.get(`/admin/log?PageSize=10`, { headers: { Authorization: `Bearer ${user.token}` } })

        const xpagination = JSON.parse(response.headers['x-pagination'])

        const api = response.data

        return { api, xpagination }
    } catch (error) {
        console.log(error)

        return { ok: false }
    }
}

// ________________Páginação utilizando o "TablePagination" não funciona com o retorno da páginação da api ____________________________________
// ________________https://github.com/mui/mui-x/issues/11247___________________________________________________________________________________
// ________________https://github.com/mui/material-ui/issues/15616_____________________________________________________________________________
// ________________"Warning: Failed prop type: MUI: The page prop of a TablePagination is out of range (0 to 0, but page is 1).________________

export default function LogsSistemaPage() {
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
                const response = await endpoints.customFetch.get(`/admin/log?PageNumber=${page}&PageSize=${pageSize}`, { headers: { Authorization: `Bearer ${user.token}` } })

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

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Serilog</Typography>
                    </Grid>

                    <Grid item />
                </Grid>

                <MainCard sx={{ mt: 2 }} content={false}>
                    <LogTable rows={data} pagination={pagination} handlePageChange={handlePageChange} handlePageSizeChange={handlePageSizeChange} pageSizeOptions={calculatePageSizeOptions} />
                </MainCard>
            </Grid>
        </Grid>
    )
}
