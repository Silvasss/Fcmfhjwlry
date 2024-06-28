import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import TableContainer from '@mui/material/TableContainer';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// terceiros
import { format } from 'date-fns';

// assets
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

export default function UsuarioTable({ rows, handleItemClick, pagination, handlePageChange, handlePageSizeChange, pageSizeOptions }) {
  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center" padding='normal'>Auth_Id</TableCell>

                <TableCell align="center" padding='normal'>Id</TableCell>

                <TableCell align="center" padding='normal'>Nome</TableCell>

                <TableCell align="center" padding='normal'>Plus-Code</TableCell>

                <TableCell align="center" padding='normal'>Criado</TableCell>

                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="center">
                        <Link color="secondary"> {row.auth_Id}</Link>
                      </TableCell>

                      <TableCell align="center">
                        <Link color="secondary"> {row.usuario_Id}</Link>
                      </TableCell>

                      <TableCell align="center">{row.nome}</TableCell>

                      <TableCell align="center">{row.plusCode}</TableCell>

                      <TableCell align="center">{format(row.createdAt, 'dd/MM/yyyy')}</TableCell>

                      <TableCell align="center">
                        <Stack direction={'row'} alignContent={`center`} justifyContent={`center`}>
                          <IconButton onClick={() => handleItemClick(index, false)}>
                            <UsergroupAddOutlined style={{ color: '#b33232' }} />
                          </IconButton>

                          <IconButton onClick={() => handleItemClick(index, true)}>
                            <DeleteOutlined style={{ color: '#f5554a' }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box >

      <Divider />

      <Stack display={"flex"} flexDirection={"row"} justifyContent={"right"} alignItems={"center"} sx={{ p: 1.5 }}>
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
          disableUnderline
          variant="standard"
        >
          {pageSizeOptions().map(size => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
}

UsuarioTable.propTypes = {
  rows: PropTypes.array,
  handleItemClick: PropTypes.func,
  pagination: PropTypes.object,
  handlePageChange: PropTypes.any,
  handlePageSizeChange: PropTypes.any,
  pageSizeOptions: PropTypes.any
};