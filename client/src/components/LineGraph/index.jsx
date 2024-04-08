import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONNAIRES } from '../../utils/queries';
import Auth from '../../utils/auth';
import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineGraph = () => {
  const [chartData, setChartData] = useState({});
  const getUserId = () => {
    return Auth.getProfile().data._id;
  };

  const { loading, error, data, refetch } = useQuery(QUERY_QUESTIONNAIRES, {
    variables: { userId: getUserId() },
    fetchPolicy: 'network-only', // Ensure fresh data is fetched from the network
  });

  useEffect(() => {
    console.log("Data:", data);
    if (data) {
      // Filter the questionnaires to include only those from the past 7 days
      const firstSevenElements = data.questionnaires.slice(0, 7);
      const summedValues = firstSevenElements.map(questionnaire => {
        let sum = 0;
        Object.values(questionnaire).forEach(value => {
          if (typeof value === 'number') {
            sum += value;
          }
        });
        return sum;
      });

      const formattedDates = firstSevenElements.map(questionnaire => {
        const date = new Date(parseInt(questionnaire.createdAt)); // Convert timestamp to milliseconds
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
      }).reverse(); // Reverse the order of the dates

      const processedData = {
        labels: formattedDates,
        datasets: [
          {
            label: 'Sum of Values per Questionnaire',
            data: summedValues.reverse(), // Reverse the order of the summed values to match the dates
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      setChartData(processedData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if chartData contains valid data before rendering the chart
  if (!Object.keys(chartData).length) {
    return <p>No data available.</p>;
  }

  // Custom options for the Y-axis label
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Scores',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Line Graph</h2>
      <div style={{ padding: '0 10px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
