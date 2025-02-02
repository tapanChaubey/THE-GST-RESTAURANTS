import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AddCard() {
  const { id } = useParams();
  const [currentCart, setCurrentCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [Alldata, setAllData] = useState([]);

  // Fetch all data from API
  async function find() {
    try {
      const res = await fetch("http://localhost:7777/Alldata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const AllDataProduct = await res.json();
      setAllData(AllDataProduct);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch API data once
  useEffect(() => {
    find();
  }, []);

  // Find the product once Alldata is fetched
  useEffect(() => {
    if (Alldata.length > 0) {
      const foundProduct = Alldata.find((item) => String(item._id) === String(id));
      setProduct(foundProduct || null);
    }
  }, [id, Alldata]);

  // LocalStorage se cart ko seedha load karo bina kisi condition ke
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCurrentCart(cart);
  }, []);

  // Sirf naye product ko add karne ka logic alag rakho
  useEffect(() => {
    if (product) {
      setCurrentCart((prevCart) => {
        const isProductInCart = prevCart.some((item) => item._id === product._id);
        if (!isProductInCart) {
          const updatedCart = [...prevCart, product];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }
        return prevCart;
      });
    }
  }, [product]);

  // Remove specific product from cart
  function removeFromCart(productId) {
    const updatedCart = currentCart.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    setCurrentCart(updatedCart); // Update component state to re-render
  }

  // Confirm button action
  function handleConfirm(productId) {
    console.log(`Confirmed product: ${productId}`);
  }

  return (
    <div className="flex flex-col items-center p-2">
      {currentCart.length > 0 ? (
        currentCart.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-4 mb-6 max-w-4xl"
          >
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full max-h-84 object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-xl text-gray-600 mt-2">₹{item.price}</p>
                <p className="text-gray-700 mt-4">{item.description}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <button
                  onClick={() => handleConfirm(item._id)}
                  className="w-full md:w-auto bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  Confirm The Item
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-full md:w-auto bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
                >
                  Remove The Item
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl font-semibold">
          No items in the cart
        </p>
      )}
    </div>
  );
}

export default AddCard;
