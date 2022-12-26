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

// const products = [
//   {
//     id: 1,
//     name: "Iphone 14,Mac Pro",
//     totalCount: 100,
//     date: "12:02",
//   },
// ];

export const AllProductsBarChart = () => {
  const [responseTotalSalesData, setResponseTotalSalesData] = useState();
  console.log("responseTotalSalesData", responseTotalSalesData);
  useEffect(() => {
    fetch("http://localhost:3001/totalSales")
      .then((res) => res.json())
      .then((data) => {
        let productData = {};
        console.log("data", data);
        const totalCount = data.totalSales["_sum"].totalCount;
        if (!totalCount) {
          productData.totalCount = 0;
          productData.date = "60 Seconds";
        } else {
          productData.totalCount = totalCount;
          productData.date = "60 Seconds";
        }
        setResponseTotalSalesData([productData]);
        console.log("totalCount", totalCount);
        // setResponseTotalSales
        //   {
        //     "_sum": {
        //         "totalCount": null
        //     }
        // }
        // setResponse(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const data = products.map((product) => ({
  //   productName: product.name,
  //   totalCount: product.totalCount,
  //   date: product.date,
  // }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          {/* <p className="label">{getProductName(payload[0].payload, label)}</p> */}
          {/* <p className="intro">
            Product Names: {payload[0].payload.productName}
          </p> */}
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
