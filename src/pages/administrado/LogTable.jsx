import PropTypes from 'prop-types';

// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// terceiros
import { format } from 'date-fns';

// ==============================|| LOG TABLE ||============================== //

export default function LogTable({ dados }) {
  return (
    <Box>
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

              <TableCell align="center" padding='normal'>Message Template</TableCell>

              <TableCell align="center" padding='normal'>Level</TableCell>

              <TableCell align="center" padding='normal'>TimeStamp</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dados.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary"> {row.id}</Link>
                  </TableCell>

                  <TableCell align="center">{row.messageTemplate}</TableCell>

                  <TableCell align="center">
                    <Chip
                      variant="combined"
                      color={row.level === 'Warning' ? 'warning' : 'error'}
                      label={row.level}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">{format(row.timeStamp, 'dd/MM/yyyy  HH:mm:ss')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

LogTable.propTypes = {
  dados: PropTypes.array,
};