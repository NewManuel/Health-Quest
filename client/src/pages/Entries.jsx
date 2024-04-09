import Header from "../components/Header";
import Footer from "../components/Footer";
import EntryTable from "../components/EntryTable";
import GoBackButton from "../components/GoBackButton";

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

  const roundedScore = Math.round(truePercentage);

  return roundedScore;
}

function getDate(data) {
  const date = new Date(parseInt(data.createdAt));
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  console.log(formattedDate);
  return formattedDate;
}
const PreviousEntries = () => {
  const user = Auth.getProfile();
  const userId = user.data._id;
  const { loading, error, data, refetch } = useQuery(QUERY_QUESTIONNAIRES, {
    variables: { userId },
    fetchPolicy: 'network-only'
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
      <div className="go-back-container">
        <GoBackButton />
      </div>
      <Footer />
    </div>
  );
};

export default PreviousEntries;
