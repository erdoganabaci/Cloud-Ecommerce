// import logo from './logo.svg';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { AllProductsBarChart } from "./components/AllProductsBarChart";
import { FilterProductsBarChart } from "./components/FilterProductsBarChart";
import "./App.css";
import { Input } from "./components/input";
function App() {
  const [inputValue, setInputValue] = useState("inital-option");
  const [filteredResponseTotalSalesData, setFilteredResponseTotalSalesData] =
    useState([]);
  const [allCat, setAllCat] = useState([]);

  useEffect(() => {
    if (inputValue !== "inital-option") {
      fetch(`http://localhost:3001/productCategory/${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
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
          setFilteredResponseTotalSalesData([productData]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inputValue]);

  return (
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
  );
}

export default App;
