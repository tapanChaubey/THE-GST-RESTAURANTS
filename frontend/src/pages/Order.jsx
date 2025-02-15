import React, { useContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/useUserContext";

function Order() {


  const navigator = useNavigate();

  const [Alldata, setAllData] = useState([]);
  const [msg, setMsg] = useState("");
  const { userId } = useContext(UserContext);
  const [Product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMode, setpaymentMode] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const { id } = useParams();
  const api = useAPI();

  async function findData() {
    const AllProduct = await api.get("Alldata");
    setAllData(AllProduct);
  }

  useEffect(() => {
    findData();
  }, []);

  useEffect(() => {
    if (id && Alldata.length > 0) {
      const foundProduct = Alldata.find((item) => item._id == id);
      setProduct(foundProduct || null);
    }
  }, [id, Alldata]);

  useEffect(() => {
    if (Product) {
      setTotalAmount(Product.price * quantity);
    }
  }, [Product, quantity]);

  const handleProductChange = (e) => {
    const selectedProduct = Alldata.find((item) => item._id === e.target.value);
    setProduct(selectedProduct || null);
    setQuantity(1);
  };

  function increaseQuantity() {
    if (Product) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  }

  function decreaseQuantity() {
    if (Product && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!Product) return;
    const payload = {
      productId: Product._id,
      userId: userId,
      address: address,
      location: location,
      quantity: quantity,
      paymentMode: paymentMode,
      totalAmount: totalAmount,
    };

    api.post("placeOrder", payload).then((res) => {
      console.log(res);
      setMsg(res.message);
      console.log(res.client_secret);

      if (res.client_secret) {
        navigator("/payment?client_secret=" + res.client_secret)
      }

      setTimeout(() => setMsg(""), 5000); // Flash message disappears after 5 seconds
    });

    // alert(paymentMode);
  };

  if (!Alldata.length) {
    return <p className="text-center mt-10 text-2xl font-bold text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Product Selection & Image */}
        <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col">
          <label className="block text-gray-800 font-semibold mb-3">Select Product</label>
          <select
            onChange={handleProductChange}
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition mb-5"
            defaultValue={Product?._id || ""}
          >
            {Alldata.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - ₹{item.price}
              </option>
            ))}
          </select>

          {Product && (
            <div className="flex-grow">
              <img
                src={Product.image}
                alt={Product.name}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Right Side - Order Details */}
        <div className="md:w-1/2 p-6 flex flex-col bg-white">
          {Product && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{Product.name}</h2>
              <p className="text-lg font-semibold text-green-600 mb-4">
                ₹{Product.price} x {quantity} = <span className="font-bold">₹{totalAmount}</span>
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center md:justify-start mb-5">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400 transition"
                >
                  -
                </button>
                <span className="px-6 py-2 border bg-white text-xl font-semibold">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400 transition"
                >
                  +
                </button>
              </div>

              {/* Address Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                    required
                  />
                </div>

                {/* Payment Options */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                  <select
                    className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                    onChange={(e) => setpaymentMode(e.target.value)}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">Credit/Debit Card</option>
                    <option value="NB">Net Banking</option>
                  </select>
                </div>

                {/* Order Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
               >
                  Place Order
                </button>
              </form>

              {/* Flashing Message */}
              {msg && (
                <p
                  className={`text-center mt-4 text-lg font-bold p-3 rounded-md shadow-md animate-pulse ${
                    msg.includes("success") ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"
                  }`}
                >
                  {msg}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
