import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css'
const VibrationPieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Get the canvas element to render the chart
    const canvas = chartRef.current;

    if (canvas) {
      // Check if a chart instance already exists and destroy it
      if (canvas.chart) {
        canvas.chart.destroy();
      }

      // Convert the vibration data into a format suitable for the pie chart
      const vibrationData = {
        labels: ['Vibration 1', 'Vibration 2'],
        datasets: [
          {
            data: [/* Use your data here */],
            backgroundColor: ['red', 'green'],
          },
        ],
      };

      // Create a new pie chart
      canvas.chart = new Chart(canvas, {
        type: 'pie',
        data: vibrationData,
        options: {
          // Your chart options here
        },
      });
    }

    return () => {
      // Cleanup: Destroy the chart when the component unmounts
      if (canvas && canvas.chart) {
        canvas.chart.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <canvas ref={chartRef} />;
};

export default VibrationPieChart;
