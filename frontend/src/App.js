// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { AllProductsBarChart } from "./components/AllProductsBarChart";
import { FilterProductsBarChart } from "./components/FilterProductsBarChart";
import "./App.css";
function App() {
  // AllProductsBarChart
  // const products = [
  //   {
  //     id: 1,
  //     name: "Iphone 14,Mac Pro",
  //     totalCount: 100,
  //     date: "12:02",
  //   },
  // ];

  // filterBarChart only retrun 1 array database query
  // const products = [
  //   {
  //     id: 1,
  //     name: "Iphone 14",
  //     totalCount: 100,
  //     date: "12:02",
  //   },
  // ];
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
                <h4>Filter by product with in 60 sec</h4>

                <select>
                  <option value="inital-option">--Select Product---</option>
                  <option value="apple">Apple</option>
                  <option value="macPro">Mac Pro</option>
                </select>

                <FilterProductsBarChart />
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
