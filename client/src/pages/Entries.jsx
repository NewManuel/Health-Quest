import Header from "../components/Header";
import Footer from "../components/Footer";
import UserDataTable from "../components/EntryTable";

const PreviousEntries = () => {
  const userData = [
    { date: "2024-03-30", total: 100 },
    { date: "2024-03-31", total: 150 },
  ];
  return (
    <div className="main">
      <Header />
      <div className="entry-container">
        <UserDataTable userData={userData} />
      </div>
      <Footer />
    </div>
  );
};

export default PreviousEntries;
