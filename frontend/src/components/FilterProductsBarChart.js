import React from "react";
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

const products = [
  {
    id: 1,
    name: "Iphone 14,Mac Pro",
    totalCount: 100,
    date: "12:02",
  },
];

export const FilterProductsBarChart = () => {
  const data = products.map((product) => ({
    productName: product.name,
    totalCount: product.totalCount,
    date: product.date,
  }));

  //   const getProductName = (data, index) => {
  //     // Find the product object with the matching id
  //     const product = products.find((product) => product.id === data.id);
  //     // Return the product name
  //     return product.name;
  //   };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log("payload[0]", payload[0]);
      return (
        <div className="custom-tooltip">
          {/* <p className="label">{getProductName(payload[0].payload, label)}</p> */}
          <p className="intro">
            Product Names: {payload[0].payload.productName}
          </p>
          <p className="intro">Total Count: {payload[0].payload.totalCount}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart
        data={data}
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
        <Bar dataKey="totalCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
