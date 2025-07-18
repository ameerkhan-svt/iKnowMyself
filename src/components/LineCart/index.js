import { Line } from '@ant-design/plots';
import React from 'react';
import { createRoot } from 'react-dom';

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
    // data: {
    //   type: 'fetch',
    //   value: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
    // },
    data,
    xField: (d) => {console.log("d",d); return new Date(d.year)},
    yField: 'value',
    sizeField: 'value',
    shapeField: 'smooth',
    legend: { size: false },
    colorField: 'year',
  };


//   const config = {
//     data,
//     xField: 'month',
//     yField: 'value',
//     shapeField: 'smooth',
//     scale: {
//       y: {
//         domainMin: 0,
//       },
//     },
//     interaction: {
//       tooltip: {
//         marker: false,
//       },
//     },
//     style: {
//       lineWidth: 2,
//     },
//     colorField: 'year',
//   };
  return <Line {...config} />;
};

export default LineChart;