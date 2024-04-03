import React from "react";

function UserDataTable({ userData }) {
  return (
    <div>
      <h2>Previous Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDataTable;
