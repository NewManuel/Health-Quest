import Header from "../components/Header";
import Footer from "../components/Footer";
import EntryTable from "../components/EntryTable";

import Auth from "../../src/utils/auth";
import { QUERY_QUESTIONNAIRES } from "../../src/utils/queries";
import { useQuery } from "@apollo/client";

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

  return truePercentage;
}
function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

function getDate(data) {
  const timestamp = data.createdAt;
  const dateString = formatDate(timestamp * 1000);
  console.log(timestamp);
  console.log(dateString);
  return dateString;
}
const PreviousEntries = () => {
  const user = Auth.getProfile();
  const userId = user.data._id;
  const { loading, error, data } = useQuery(QUERY_QUESTIONNAIRES, {
    variables: { userId },
  });
  const userData = data?.questionnaires || [];
  const ques = data?.questionnaires.map((q) => ({
    date: getDate(q),
    total: getGrade(q),
  }));
  console.log(userData);
  return (
    <div className="main">
      <Header />
      <div className="entry-container">
        {userData && <EntryTable userData={ques} />}
      </div>
      <Footer />
    </div>
  );
};

export default PreviousEntries;
