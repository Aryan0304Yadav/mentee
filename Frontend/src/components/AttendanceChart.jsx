import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/AttendanceChart.css';

const AttendanceChart = ({ prn }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);
  const [chartType, setChartType] = useState('bar');
  const [attendanceType, setAttendanceType] = useState('theory');
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance data when PRN changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mentee/attendance-fetch/${prn}`);
        const fetchedData = response.data.attendance || [];
        setAttendanceData(fetchedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setAttendanceData([]);
      }
    };

    if (prn) {
      fetchData();
    }
  }, [prn]);

  // Render or update the chart
  useLayoutEffect(() => {
    const initializeChart = () => {
      if (!chartRef.current) {
        console.warn('Chart reference is not ready.');
        return;
      }

      // Destroy the existing chart instance
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      // Filter attendance data based on type (Theory or Lab)
      const filteredData = attendanceData.filter((item) => {
        if (attendanceType === 'theory') {
          return !item.subject.toLowerCase().includes('lab');
        }
        if (attendanceType === 'lab') {
          return item.subject.toLowerCase().includes('lab');
        }
        return false;
      });

      // Prepare chart data
      const subjects = filteredData.length > 0 ? filteredData.map((item) => item.subject) : [];
      const attendanceValues = filteredData.length > 0 ? filteredData.map((item) => item.average_attendance) : [];

      // Generate a random color for each subject dynamically
      const backgroundColors = subjects.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
      const borderColors = backgroundColors.map((color) => color.replace('0.5', '1'));

      // Prepare the datasets for each subject with individual color mapping
      const datasets = subjects.map((subject, index) => ({
        label: subject, // Each subject is its own label
        data: [attendanceValues[index]], // Attendance value for the current subject
        backgroundColor: backgroundColors[index], // Unique color for each subject
        borderColor: borderColors[index],
        borderWidth: 1,
      }));

      const ctx = chartRef.current.getContext('2d');
      myChartRef.current = new Chart(ctx, {
        type: chartType,
        data: {
          labels: [''], // A single empty label, as subjects are now the individual dataset labels
          datasets: datasets, // Array of datasets for each subject
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top', // Position the legend at the top
            },
          },
        },
      });
    };

    initializeChart();

    // Cleanup chart instance on unmount or re-render
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [attendanceType, chartType, attendanceData]);

  // Handle attendance type change
  const handleAttendanceTypeChange = (e) => {
    setAttendanceType(e.target.value);
  };

  return (
    <div className="chart">
      <div className="dropdowns">
        <label>
          Attendance Type:
          <select value={attendanceType} onChange={handleAttendanceTypeChange}>
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
          </select>
        </label>

        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
            <option value="radar">Radar</option>
          </select>
        </label>
      </div>

      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

AttendanceChart.propTypes = {
  prn: PropTypes.string.isRequired,
};

export default AttendanceChart;
