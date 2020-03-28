import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, TableFooter, TablePagination } from '@material-ui/core';
import { Paper } from '@material-ui/core';

import ListTablePaginationActions from './listTablePagination';
import { ListHeaderCell } from './listHeaderCell';
import { DenyApplicationModal } from '../../dashboard/denyModal/index';

import { rows } from '../../_data/approvals'; // remove when API is ready

const listTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  striped0: {
    backgroundColor: 'rgb(246,246,246)'
  },
  striped1: {
    backgroundColor: 'rgb(255,255,255)'
  }
});

export default function ListTable() {
  const classes = listTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        stickyHeader aria-label="sticky header pagination table">
        <TableHead>
          <TableRow>
            <ListHeaderCell>Company</ListHeaderCell>
            <ListHeaderCell align="left">Name</ListHeaderCell>
            <ListHeaderCell align="left">APOR Type</ListHeaderCell>
            <ListHeaderCell align="center">Approval Action</ListHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={row.company} className={classes[`striped${(index % 2)}`]}>
              <TableCell component="th" scope="row">
                {row.company}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="center">
                {/* TODO: Approve, Deny, View Detail buttons */}
                <DenyApplicationModal />
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={ListTablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
