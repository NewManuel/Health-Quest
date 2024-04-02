// Import the `useParams()` hook
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const History = () => {
  const { thoughtId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId: thoughtId },
  });

  const [selectedOption, setSelectedOption] = useState(""); // State to hold selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="my-3">
      <table className="striped">
        <thead>
          <tr>
            <th>Habit</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Meditate</td>
            <td>Completed</td>
            <td>3/28/2024</td>
          </tr>
          <tr>
            <td>Weight Train</td>
            <td>Failed</td>
            <td>3/28/2024</td>
          </tr>
          <tr>
            <td>Gallon of Water</td>
            <td>Completed</td>
            <td>3/28/2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
