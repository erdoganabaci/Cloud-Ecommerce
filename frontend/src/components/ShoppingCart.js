import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShoppingCart() {
  // Declare state variables for the products in the cart and the quantity and price of each product
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [prices, setPrices] = useState({});
  const [isPurchased, setIsPurchased] = useState(false);
  const [isErrorPurchased, setIsErrorPurchased] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  // Navigate to page
  const navigate = useNavigate();

  const clearState = () => {
    setCart([]);
    setQuantity({});
    setPrices({});
  };
  // Function to add a product to the cart
  const addToCart = (productName, price) => {
    // Check if the product is already in the cart
    const index = cart.indexOf(productName);
    if (index === -1) {
      // If the product is not in the cart, add it to the cart and set its quantity and price to 1
      setCart([...cart, productName]);
      setQuantity({ ...quantity, [productName]: 1 });
      setPrices({ ...prices, [productName]: price });
    } else {
      // If the product is already in the cart, increment its quantity
      setQuantity({ ...quantity, [productName]: quantity[productName] + 1 });
      // Update the price of the product in the prices object
      setPrices({
        ...prices,
        [productName]: price * (quantity[productName] + 1),
      });
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    // Check if the product is in the cart
    const index = cart.indexOf(product);
    if (index !== -1) {
      // If the product is in the cart, remove it from the cart
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      // Remove the product from the quantity and prices objects as well
      const newQuantity = { ...quantity };
      delete newQuantity[product];
      setQuantity(newQuantity);
      const newPrices = { ...prices };
      delete newPrices[product];
      setPrices(newPrices);
    }
  };

  // Function to handle the purchase button click
  const handlePurchase = () => {
    if (Object.keys(quantity).length > 0) {
      let postData = [];
      for (const [key, value] of Object.entries(quantity)) {
        const productCategory = products.find(
          (product) => product.name === key
        ).type;
        postData.push({
          name: key,
          category: productCategory,
          totalCount: value,
        });
      }
      fetch("http://localhost:3001/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsPurchased(true);
          clearState();
          setTimeout(() => {
            setIsPurchased(false);
          }, 5000);
          // setResponse(data);
        })
        .catch((error) => {
          setIsErrorPurchased(true);
          setErrorMessage(error.message);
          setTimeout(() => {
            setIsErrorPurchased(false);
          }, 5000);
          console.error(error);
        });
    }
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  // An array of objects representing the products in the store
  const products = [
    {
      id: 1,
      name: "Iphone 14",
      price: 900,
      image: "assets/iphone14.jpeg",
      type: "phone",
    },
    {
      id: 2,
      name: "Mac Pro",
      price: 2500,
      image: `assets/macPro.jpeg`,
      type: "computer",
    },
    {
      id: 3,
      name: "Apple iPad Pro 5.Generation",
      price: 1100,
      image: "assets/ipadProM1.jpeg",
      type: "tablet",
    },
    {
      id: 4,
      name: "Samsung Galaxy Z Fold 4",
      price: 1541,
      image: "assets/samungZfold.jpg",
      type: "phone",
    },
    {
      id: 5,
      name: "Apple Watch",
      price: 1000,
      image: "assets/appleWatch.jpeg",
      type: "watch",
    },
    {
      id: 6,
      name: "Apple Airpods Pro 2",
      price: 300,
      image: "assets/appleAirpod2.jpeg",
      type: "earphone",
    },
    {
      id: 7,
      name: "Dyson v15 Vacuum Cleaner",
      price: 600,
      image: "assets/dysonV15.jpg",
      type: "home electronics",
    },
    {
      id: 8,
      name: "Razer Enki Gaming Chair",
      price: 400,
      image: "assets/razerEnki.jpg",
      type: "chair",
    },
  ];

  return (
    <div className="container">
      <div className="header">Crystal Outfit Online Market</div>
      {isPurchased && (
        <div className="purchaseComplete">Thank you for your purchase!</div>
      )}

      {isErrorPurchased && (
        <div className="purchaseError">
          Purchase couldnt completed! {errorMessage}{" "}
        </div>
      )}

      <div className="products">
        {/* Display a list of products that a user can add to their cart */}
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <br />
            {product.name} - {product.price}€
            <br />
            <button onClick={() => addToCart(product.name, product.price)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <div className="shopping-cart">
        {/* Display the user's shopping cart */}
        <table>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{product}</td>
                <td>{quantity[product]}</td>
                <td>{prices[product]}€</td>
                <td>
                  <button onClick={() => removeFromCart(product)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display the purchase button */}
        <div className="buttonGroup">
          <button onClick={handlePurchase}>Purchase</button>

          <button onClick={handleAdminClick}>Go to Admin</button>
        </div>
      </div>
    </div>
  );
}
