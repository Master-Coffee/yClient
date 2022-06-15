import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

import usePalette from "../../../hooks/usePalette";



const AreaChart = () => {
  const palette = usePalette();

  const data = [
    {
      name: "series1",
      data:[
        [1417564800,30.95],
        [1327446000,31.34],
        [1327532400,31.18],
        [1327618800,31.05],
        [1327878000,31.00],
        [1327964400,30.95],
      ]
    },

  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: [
      palette.info,  
      palette.primary, 
      palette.success, 
      palette.warning, 
      palette.danger,   
    ],
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title tag="h5">Area Chart</Card.Title>
        <h6 className="card-subtitle text-muted">
          Area charts are used to represent quantitative variations.
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="chart w-100">
          <Chart options={options} series={data} type="area" height="700" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default AreaChart;
