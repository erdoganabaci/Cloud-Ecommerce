// import logo from './logo.svg';
import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { AllProductsBarChart } from "./components/AllProductsBarChart";
import { FilterProductsBarChart } from "./components/FilterProductsBarChart";
import "./App.css";
import { Input } from "./components/input";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

export const UrlContext = createContext();

function App() {
  // const backendUrl = "http://localhost:3005";
  const backendUrl = "http://localhost:3005";
  const [inputValue, setInputValue] = useState("inital-option");
  const [filteredResponseTotalSalesData, setFilteredResponseTotalSalesData] =
    useState([]);
  const [allCat, setAllCat] = useState([]);

  // I use the ajax.getJSON function to make a GET request to the specified URL, and
  // Pipe is used in RxJS to chain operators together.
  // Operators are functions that take an Observable as an input and return another Observable.
  // Pipe allows us to chain multiple operators together, creating a flow of data through the operators.
  // This is useful because it allows us to easily transform the data as it flows through the Observable stream.
  // If I wanted to transform the data that is being returned from the fetch request (e.g. by filtering or mapping the data),
  // I could use the pipe operator to chain the appropriate operator(s) to the Observable.

  // The map operator to transform the response data into the desired format.
  // The catchError operator is used to handle any errors that may occur during the request.

  // Lastly, I use the subscribe method to subscribe to the observable and update the state with the transformed data.

  useEffect(() => {
    if (inputValue !== "inital-option") {
      const obserable$ = ajax
        .getJSON(`${backendUrl}/productCategory/${inputValue}`)
        .pipe(
          map((data) => {
            let productData = {};
            const totalCount = data[0]["_sum"].totalCount;
            const category = data[0].category;
            if (!totalCount) {
              productData.totalCount = 0;
              productData.category = category;
              productData.date = "60 Seconds";
            } else {
              productData.totalCount = totalCount;
              productData.category = category;
              productData.date = "60 Seconds";
            }
            return productData;
          }),
          catchError((error) => console.error(error))
        )
        .subscribe((productData) =>
          setFilteredResponseTotalSalesData([productData])
        );
      // clean up function when the component unmounts, which will unsubscribe from the observable.
      return () => {
        obserable$.unsubscribe();
      };
    }
  }, [inputValue]);

  // useEffect(() => {
  //   if (inputValue !== "inital-option") {
  //     fetch(`http://localhost:3005/productCategory/${inputValue}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         let productData = {};
  //         const totalCount = data[0]["_sum"].totalCount;
  //         const category = data[0].category;
  //         if (!totalCount) {
  //           productData.totalCount = 0;
  //           productData.category = category;
  //           productData.date = "60 Seconds";
  //         } else {
  //           productData.totalCount = totalCount;
  //           productData.category = category;
  //           productData.date = "60 Seconds";
  //         }
  //         setFilteredResponseTotalSalesData([productData]);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [inputValue]);

  return (
    <UrlContext.Provider value={{ url: backendUrl }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ShoppingCart />} />
            <Route
              path="/admin"
              element={
                <div className="App-header">
                  <div className="headerAdmin">
                    <a href="/">Crystal Outfit Manager Monitor</a>
                  </div>

                  <h4>All product with in 60 sec</h4>

                  <AllProductsBarChart />
                  <h4>Filter by category with in 60 sec</h4>
                  <Input
                    setAllCat={setAllCat}
                    setInputValue={setInputValue}
                  ></Input>

                  <FilterProductsBarChart
                    filteredResponseTotalSalesData={
                      filteredResponseTotalSalesData
                    }
                    inputValue={inputValue}
                    allCat={allCat}
                  />
                </div>
              }
            />
          </Routes>
        </Router>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    </UrlContext.Provider>
  );
}

export default App;
