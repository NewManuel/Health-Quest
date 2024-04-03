import Header from "../components/Header";
import Footer from "../components/Footer";
import EntryTable from "../components/EntryTable";

const PreviousEntries = () => {
  const userData = [
    { date: "2024-03-30", total: 100 },
    { date: "2024-03-31", total: 50 },
  ];
  return (
    <div className="main">
      <Header />
      <div className="entry-container">
        <EntryTable userData={userData} />
      </div>
      <Footer />
    </div>
  );
};

export default PreviousEntries;
