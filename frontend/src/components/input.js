import React, { useState, useEffect } from "react";

export const Input = (props) => {
  const [selectedValue, setSelectedValue] = useState("inital-option");
  const [optionVal, setOptionVal] = useState([]);

  useEffect(() => {
    // get request http://localhost:3001/productCategories
    // get all categories for displaying in select option
    fetch("http://localhost:3001/productCategories")
      .then((res) => res.json())
      .then((data) => {
        const catArr = data.map((item) => item.category);
        setOptionVal(catArr);
        props.setAllCat(catArr);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    setSelectedValue(event.target.value);
    props.setInputValue(event.target.value);
  }
  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="inital-option">---Select Category---</option>
      {optionVal.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
