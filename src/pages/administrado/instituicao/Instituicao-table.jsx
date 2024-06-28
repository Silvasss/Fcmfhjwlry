import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

// terceiros
import { format } from 'date-fns';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

export default function InstituicaoTable({ rows, handleItemClick, pagination, handlePageChange, handlePageSizeChange, pageSizeOptions }) {
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
                <TableCell align="center" padding='normal'>Id</TableCell>

                <TableCell align="center" padding='normal'>Nome</TableCell>

                <TableCell align="center" padding='normal'>Plus-Code</TableCell>

                <TableCell align="center" padding='normal'>Ativo</TableCell>

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
                        <Link color="secondary"> {row.instituicao_Id}</Link>
                      </TableCell>

                      <TableCell align="center">{row.nome}</TableCell>

                      <TableCell align="center">{row.plusCode}</TableCell>

                      <TableCell align="center">
                        <Chip
                          variant="combined"
                          color={row.ativo ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>

                      <TableCell align="center">{format(row.createdAt, 'dd/MM/yyyy')}</TableCell>

                      <TableCell align="center">
                        <IconButton onClick={() => handleItemClick(index, true)}>
                          <DeleteOutlined style={{ color: '#f5554a' }} />
                        </IconButton>
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

InstituicaoTable.propTypes = {
  rows: PropTypes.array,
  handleItemClick: PropTypes.func,
  pagination: PropTypes.object,
  handlePageChange: PropTypes.any,
  handlePageSizeChange: PropTypes.any,
  pageSizeOptions: PropTypes.any
};
