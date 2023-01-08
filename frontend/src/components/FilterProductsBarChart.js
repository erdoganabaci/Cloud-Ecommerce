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

// const products = [
//   {
//     id: 1,
//     name: "Iphone 14,Mac Pro",
//     totalCount: 100,
//     date: "12:02",
//   },
// ];

export const FilterProductsBarChart = (props) => {
  const backendUrl = useContext(UrlContext);

  const [responseTotalSalesData, setResponseTotalSalesData] = useState();

  useEffect(() => {
    if (props.inputValue !== "inital-option") {
      setResponseTotalSalesData(props.filteredResponseTotalSalesData);
    }
  }, [props.filteredResponseTotalSalesData, props.inputValue]);

  useEffect(() => {
    if (props.inputValue === "inital-option" && props.allCat.length > 0) {
      const obserable$ = ajax
        .getJSON(`${backendUrl.url}/totalSales`)
        .pipe(
          map((res) => {
            let productData = {};
            const totalCount = res.totalSales["_sum"].totalCount;
            if (!totalCount) {
              productData.totalCount = 0;
              productData.category =
                props.allCat.length < 3
                  ? props.allCat.join(",")
                  : props.allCat.slice(0, 2) + " ...";
              productData.date = "60 Seconds";
            } else {
              productData.totalCount = totalCount;
              productData.category =
                props.allCat.length < 3
                  ? props.allCat.join(",")
                  : props.allCat.slice(0, 2) + " ...";
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
    }
  }, [backendUrl.url, props.allCat, props.inputValue]);

  // useEffect(() => {
  //   if (props.inputValue === "inital-option" && props.allCat.length > 0) {
  //     fetch("http://localhost:3005/totalSales")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         let productData = {};
  //         const totalCount = data.totalSales["_sum"].totalCount;
  //         if (!totalCount) {
  //           productData.totalCount = 0;
  //           productData.category =
  //             props.allCat.length < 3
  //               ? props.allCat.join(",")
  //               : props.allCat.slice(0, 2) + " ...";
  //           productData.date = "60 Seconds";
  //         } else {
  //           productData.totalCount = totalCount;
  //           productData.category =
  //             props.allCat.length < 3
  //               ? props.allCat.join(",")
  //               : props.allCat.slice(0, 2) + " ...";
  //           productData.date = "60 Seconds";
  //         }
  //         setResponseTotalSalesData([productData]);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [props.allCat, props.inputValue]);

  // const data = products.map((product) => ({
  //   productName: product.name,
  //   totalCount: product.totalCount,
  //   date: product.date,
  // }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="intro">
            Product Categories: {payload[0].payload.category}
          </p>
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
