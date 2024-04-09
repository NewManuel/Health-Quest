import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function getColorStyle(grade) {
  let color;

  if (grade <= 60) {
    color = "red";
  } else if (grade <= 75) {
    color = "orange";
  } else if (grade <= 100) {
    color = "green";
  } else {
    // throw new Error("Invalid grade");
    console.log(grade);
  }

  return {
    color: color,
    fontWeight: "bold",
  };
}

export default function EntryTable({ userData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData?.map((data, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data?.date}
              </TableCell>
              <TableCell align="right" style={getColorStyle(data?.total)}>
                {data?.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
