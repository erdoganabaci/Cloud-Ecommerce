import React, { useEffect, useState, useContext } from "react";
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
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { UrlContext } from "../App";

export const AllProductsBarChart = () => {
  const backendUrl = useContext(UrlContext);
  const [responseTotalSalesData, setResponseTotalSalesData] = useState();

  useEffect(() => {
    const obserable$ = ajax
      .getJSON(`${backendUrl.url}/totalSales`)
      .pipe(
        map((res) => {
          let productData = {};
          const totalCount = res.totalSales["_sum"].totalCount;
          if (!totalCount) {
            productData.totalCount = 0;
            productData.date = "60 Seconds";
          } else {
            productData.totalCount = totalCount;
            productData.date = "60 Seconds";
          }
          return productData;
        }),
        catchError((error) => console.error(error))
      )
      .subscribe((productData) => setResponseTotalSalesData([productData]));
    // clean up function when the component unmounts, which will unsubscribe from the observable.
    return () => {
      obserable$.unsubscribe();
    };
  }, [backendUrl.url]);

  // useEffect(() => {
  //   fetch("http://localhost:3005/totalSales")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let productData = {};
  //       const totalCount = data.totalSales["_sum"].totalCount;
  //       if (!totalCount) {
  //         productData.totalCount = 0;
  //         productData.date = "60 Seconds";
  //       } else {
  //         productData.totalCount = totalCount;
  //         productData.date = "60 Seconds";
  //       }
  //       setResponseTotalSalesData([productData]);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

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
