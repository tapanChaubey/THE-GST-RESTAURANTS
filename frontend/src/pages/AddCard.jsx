import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../contexts/useUserContext";
import useAPI from "../hooks/useAPI";

function AddCard() {
  const { userId } = useContext(UserContext);
  const api = useAPI();
  const { id } = useParams();
  const [currentCart, setCurrentCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [allData, setAllData] = useState([]);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      navigation(`/login?next=${location.pathname}`);
    }
  }, [userId]);

  async function find() {
    try {
      const res = await api.get("Alldata");
      setAllData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    find();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      const foundProduct = allData.find((item) => String(item._id) === String(id));
      setProduct(foundProduct || null);
    }
  }, [id, allData]);

  useEffect(() => {
    const { cart } = JSON.parse(localStorage.getItem(userId)) || {};
    setCurrentCart(cart || []);
  }, []);

  useEffect(() => {
    if (product) {
      setCurrentCart((prevCart) => {
        const isProductInCart = prevCart?.some((item) => item._id === product._id);
        if (!isProductInCart) {
          const updatedCart = [...prevCart, product];
          let prevLocalData = JSON.parse(localStorage.getItem(userId));
          prevLocalData = { ...prevLocalData, cart: updatedCart };
          localStorage.setItem(userId, JSON.stringify(prevLocalData));
          return updatedCart;
        }
        return prevCart;
      });
    }
  }, [product]);

  function removeFromCart(productId) {
    const updatedCart = currentCart.filter((item) => item._id !== productId);
    let prevLocalData = JSON.parse(localStorage.getItem(userId));
    prevLocalData = { ...prevLocalData, cart: updatedCart };
    localStorage.setItem(userId, JSON.stringify(prevLocalData));
    setCurrentCart(updatedCart);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>

      {currentCart?.length > 0 ? (
        currentCart.map((item, idx) => (
          <div
            key={idx}
            className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row items-center p-5 mb-6 transform transition-all duration-300 hover:shadow-lg"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full max-w-xs md:max-w-md h-auto object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-4 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-900">{item.name}</h2>
              <p className="text-lg text-gray-700 mt-1">₹{item.price}</p>
              <p className="text-gray-600 mt-2">{item.description}</p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-5">
                <Link
                  to={`/addOrder/${item._id}`}
                  className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
                >
                  🛒 Order Now
                </Link>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-full md:w-auto bg-red-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-300"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl font-semibold text-gray-600 mt-10">
          🛍️ Your cart is empty!
        </p>
      )}
    </div>
  );
}

export default AddCard;
