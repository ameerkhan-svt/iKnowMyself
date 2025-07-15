import { Line } from '@ant-design/plots';
import React from 'react';

const LineChart = (props) => {

  const data = [
    {
      "year": "2024",
      "value": 10,
      "month": "Jan"
    },
    {
      "year": "2024",
      "value": 54,
      "month": "Feb"
    },
    {
      "year": "2024",
      "value": 25,
      "month": "March"
    },
    {
      "year": "2024",
      "value": 30,
      "month": "April"
    },
    {
      "year": "2024",
      "value": 0,
      "month": "May"
    },
    {
      "year": "2024",
      "value": 40,
      "month": "Jun"
    },
    {
        "year": "2025",
        "value": 100,
        "month": "Jan"
      },
      {
        "year": "2025",
        "value": 54,
        "month": "Feb"
      },
      {
        "year": "2025",
        "value": 60,
        "month": "March"
      },
      {
        "year": "2025",
        "value": 70,
        "month": "April"
      },
      {
        "year": "2025",
        "value": 40,
        "month": "May"
      },
      {
        "year": "2025",
        "value": 0,
        "month": "Jun"
      },
]

  const config = {
    data,
    theme: {
        color: "#F9F9FA",
    },
    xField: 'month',
    yField: 'value',
    height: 300,
    shapeField: 'smooth',
    scale: {
      y: {
        domainMin: 0,
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    legend: {
        shape: 'circle',
    },
    colorField: 'year',
  
  };
  return <Line {...config} />;
};

export default LineChart;