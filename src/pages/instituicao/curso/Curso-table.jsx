import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

// projeto import
import Label from '../../../components/label/index';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

export default function CursoTable({ rows, handleItemClick }) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);

    setRowsPerPage(parseInt(event.target.value, 10));
  };

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
                <TableCell align="center">Id</TableCell>

                <TableCell align="center">Nome</TableCell>

                <TableCell align="center">Status</TableCell>

                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="center">{row.curso_Id}</TableCell>

                      <TableCell align="center">{row.nome}</TableCell>

                      <TableCell align="center">
                        <Label color={(row.ativo && 'success') || 'primary'}>{row.ativo ? 'true' : 'false'}</Label>
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction={'row'} alignContent={`center`} justifyContent={`center`}>
                          <IconButton onClick={() => handleItemClick(index, false)}>
                            <EditOutlined style={{ color: '#2fa5d1' }} />
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

      <TablePagination
        component="div"
        count={rows.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25]}
      />
    </>
  );
}

CursoTable.propTypes = { rows: PropTypes.array, handleItemClick: PropTypes.any };

