import { Doughnut } from "react-chartjs-2";
const DoughnutChart = () => {
    const labels = ['UPI', 'Debit-card', 'Credit-card', 'Wallet', 'BNPL'];
  
    const growthPercentages = [25.3, 12.4, 15.8, 9.2, 6.7];
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Growth %',
          data: growthPercentages,
          backgroundColor: [
            '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669'
          ],
          borderWidth: 3,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed.toFixed(1)}%`;
            },
          },
        },
      },
      cutout: '70%',
    };
  
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold mb-0.5 text-green-800">
  💳 Growth of Payment Methods Over Time (2024–25)
</h1>


          <Doughnut data={data} options={options} />
        </div>
      );
      
  };
  
  export default DoughnutChart;
  