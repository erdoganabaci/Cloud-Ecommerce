import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const AllProductsBarChart = () => {
  const [responseTotalSalesData, setResponseTotalSalesData] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/totalSales")
      .then((res) => res.json())
      .then((data) => {
        let productData = {};
        const totalCount = data.totalSales["_sum"].totalCount;
        if (!totalCount) {
          productData.totalCount = 0;
          productData.date = "60 Seconds";
        } else {
          productData.totalCount = totalCount;
          productData.date = "60 Seconds";
        }
        setResponseTotalSalesData([productData]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="intro">Total Count: {payload[0].payload.totalCount}</p>
        </div>
      );
    }

    return null;
  };
  if (!responseTotalSalesData) return <h1>...Loading</h1>;
  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart
        data={responseTotalSalesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="totalCount" fill="#8884d8" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};
