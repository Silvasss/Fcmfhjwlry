import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

// assets
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';

// projeto import
import Visitante from './Visitante';
import { endpoints } from '../../api/menu';

export const loader = () => async () => {
    try {
        const response = await endpoints.customFetch.get(`/?PageSize=10`)

        const xpagination = JSON.parse(response.headers['x-pagination'])

        const api = response.data

        return { api, xpagination }
    } catch (error) {
        console.log(error)

        return { ok: false }
    }
}

export default function HomeDefault() {
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
            try {
                const response = await endpoints.customFetch.get(`/?PageNumber=${page}&PageSize=${pageSize}`)

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

        window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo da página
    }

    const handlePageSizeChange = (event) => {
        setPagination((prev) => ({ ...prev, pageSize: event.target.value, currentPage: 1 }));

        window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo da página
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

    // Estado do card visitante
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
    }

    // Recebe o index da linha selecionada
    const [cardIndex, setCardIndex] = useState()

    // Recebe o index da linha que o usuário selecionou na tabela
    const handleItemClick = (index) => {
        setCardIndex(data[index].usuario_Id)

        handleClose()
    };

    const theme = useTheme();

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" align='center'>Contas</Typography>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {
                data.map((perfil, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    border: '1px solid',
                                    borderRadius: 2,
                                    borderColor: theme.palette.grey.A800,
                                    boxShadow: 'inherit',
                                    ':hover': {
                                        boxShadow: 'inherit'
                                    },
                                    '& pre': {
                                        m: 0,
                                        p: '16px !important',
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: '0.75rem'
                                    },
                                    height: '100%'
                                }}
                            >
                                <CardHeader
                                    avatar={<Avatar />}
                                    titleTypographyProps={{ variant: 'subtitle1' }}
                                    title={perfil.nome}
                                    subheader={perfil.cargoPrincipal}
                                    sx={{
                                        p: 2.5,
                                        '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
                                    }}
                                />

                                <CardContent>
                                    <Divider sx={{ mb: 2 }} />

                                    <Typography variant="body2">
                                        {perfil.sobreMin}
                                    </Typography>

                                    <Stack direction="row" mt={3} mr={'20%'} justifyContent="space-between" alignItems="flex-start">
                                        <Stack direction="row" spacing={1.25} sx={{ p: 0.5 }}>
                                            <GlobalOutlined />

                                            <Typography color="text.secondary" variant="body1">
                                                {perfil.pais}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={1.25} sx={{ p: 0.5 }}>
                                            <EnvironmentOutlined />

                                            <Typography color="text.secondary" variant="body1">
                                                {perfil.plusCode}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>

                                <CardActions sx={{ justifyContent: 'flex-end', mr: '2%' }}>
                                    <Button variant="outlined" size="small" onClick={() => handleItemClick(index)}>Ver</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })
            }

            <Grid item xs={12} sm={6} md={6} lg={4}>
                {open && <Visitante handleClose={handleClose} open={open} id={cardIndex} endpoints={endpoints} />}
            </Grid>

            <Grid item xs={12}>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Pagination
                        count={pagination.totalPages}
                        page={pagination.currentPage}
                        onChange={handlePageChange}
                    />

                    <Select
                        labelId="page-size-label"
                        value={pagination.pageSize}
                        onChange={handlePageSizeChange}
                        label="Itens por página"
                    >
                        {calculatePageSizeOptions().map(size => (
                            <MenuItem key={size} value={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Grid>
        </Grid >
    )
}
