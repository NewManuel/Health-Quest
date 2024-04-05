import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Auth from "../../utils/auth";
import { QUERY_QUESTIONNAIRES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

function getColorStyle(grade) {
  let color;

  if (grade <= 60) {
    color = "red";
  } else if (grade <= 75) {
    color = "yellow";
  } else if (grade <= 100) {
    color = "green";
  } else {
    throw new Error("Invalid grade");
  }

  return {
    color: color,
    fontWeight: "bold",
  };
}

function getGrade(data) {
  // Get all the boolean values from the data object
  const values = Object.values(data);

  // Filter out non-boolean values
  const booleanValues = values.filter((value) => typeof value === "number");

  // Calculate the total count of true values
  const trueCount = booleanValues.filter((value) => value === 1).length;

  // Calculate the total count of false values
  const falseCount = booleanValues.filter((value) => value === 0).length;

  // Calculate the percentage of true values
  const truePercentage = (trueCount / booleanValues.length) * 100;

  // console.log(booleanValues);
  // console.log(trueCount);
  // console.log(falseCount);
  // console.log(truePercentage);
  // Return the grade based on the true percentage
  if (truePercentage <= 60) {
    return "F";
  } else if (truePercentage <= 70) {
    return "D";
  } else if (truePercentage <= 80) {
    return "C";
  } else if (truePercentage <= 90) {
    return "B";
  } else {
    return "A";
  }
}

async function getUserData() {
  try {
    const user = Auth.getProfile();
    const userId = user.data._id;
    const { loading, error, data } = await useQuery(QUERY_QUESTIONNAIRES, {
      variables: { userId },
    });
    if (loading) {
      console.log("Loading...");
    }
    console.log(data.questionnaires);
    console.log(getGrade(data.questionnaires[0]));
    return data.questionnaires;
  } catch (error) {
    console.log(error);
  }
}

export default function EntryTable({ userData }) {
  getUserData();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((data) => (
              <TableRow
                key={data.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.date}
                </TableCell>
                <TableCell align="right" style={getColorStyle(data.total)}>
                  {data.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
