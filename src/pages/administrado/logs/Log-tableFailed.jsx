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
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

// terceiros
import { format } from 'date-fns';

function Row(props) {
  const { row } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} tabIndex={-1} key={row.id} >
        <TableCell component="th" scope="row" align="center">
          <Link color="secondary"> {row.id}</Link>
        </TableCell>

        <TableCell align="center">{row.messageTemplate.substring(0, 100)}</TableCell>

        <TableCell align="center">
          <Chip
            variant="combined"
            color={row.level === 'Warning' ? 'warning' : 'error'}
            label={row.level}
            size="small"
          />
        </TableCell>

        <TableCell align="center">{format(row.timeStamp, 'dd/MM/yyyy  HH:mm:ss')}</TableCell>

        <TableCell align="right">
          <Stack direction={'row'}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {!open ? <EyeOutlined style={{ color: '#2fa5d1' }} /> : <CloseOutlined style={{ color: 'red' }} />}
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" >
                Exception
              </Typography>

              <Typography variant="body1" gutterBottom>
                {row.exception}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function LogTableFailed({ rows, pagination, handlePageChange, handlePageSizeChange, pageSizeOptions }) {
  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer
          component={Paper}
        >
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center" padding='normal'>Id</TableCell>

                <TableCell align="center" padding='normal'>Message Template</TableCell>

                <TableCell align="center" padding='normal'>Level</TableCell>

                <TableCell align="center" padding='normal'>TimeStamp</TableCell>

                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .map((row, index) => {
                  return (
                    <Row key={index} row={row} />
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box >

      <Divider />

      <TablePagination
        component="div"
        count={pagination.totalPages} //
        page={pagination.totalPages > 0 ? pagination.currentPage : 0 } //
        onPageChange={handlePageChange}
        rowsPerPage={pagination.pageSize} //
        onRowsPerPageChange={handlePageSizeChange} //
        rowsPerPageOptions={pageSizeOptions()} //
      />
    </>
  );
}

LogTableFailed.propTypes = {
  rows: PropTypes.array,
  pagination: PropTypes.object,
  handlePageChange: PropTypes.any,
  handlePageSizeChange: PropTypes.any,
  pageSizeOptions: PropTypes.any
};
