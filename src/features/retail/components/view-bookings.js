import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookingsOfUserByIdThunk,
  selectUserBookings,
  selectUserInfo,
} from "../slice";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const userBookings = useSelector(selectUserBookings);

  const userInfo = useSelector(selectUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingsOfUserByIdThunk(userInfo?.id));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient Name</StyledTableCell>
            <StyledTableCell>Mobile</StyledTableCell>
            <StyledTableCell align="right">Vaccine Name</StyledTableCell>
            <StyledTableCell align="right">
              Appointment Location
            </StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Date of Vaccination</StyledTableCell>
            <StyledTableCell align="right">Date of Booking</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userBookings?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.mobile}</StyledTableCell>
              <StyledTableCell align="right">{row.vaccine}</StyledTableCell>
              <StyledTableCell align="right">{row.hospital}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">
                {row.appointmenttime}
              </StyledTableCell>
              <StyledTableCell align="right">{row.bookingtime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
