import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";

function Show() {
  const { id } = useParams();
  const api = useAPI();
  const [product, setProduct] = useState(null);
  const [Alldata, setAllData] = useState([]);

  async function find() {
    try {
      const AllDataProduct = await api.get("Alldata");
      setAllData(AllDataProduct);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    find();
  }, []);

  useEffect(() => {
    if (id && Alldata.length > 0) {
      const foundProduct = Alldata.find((item) => item._id == id);
      setProduct(foundProduct || null);
    }
  }, [id, Alldata]);

  if (!id) {
    return (
      <p className="text-center mt-10 text-2xl font-bold text-red-600">
        ID is missing in the URL.
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-2xl font-bold text-gray-600">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 mx-auto w-full max-w-6xl px-4 sm:px-8 md:px-12 lg:px-16 py-6">
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-2">
        {product.name}
      </h1>

      {/* Product Description */}
      <p className="text-lg sm:text-xl text-gray-500 text-center mb-6">
        {product.description}
      </p>

      {/* Product Image */}
      <img
        className="h-[50vh] w-full max-w-screen-md object-cover rounded-lg shadow-xl mb-6"
        src={product.image}
        alt={product.name}
      />

      {/* Price Section */}
      <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        ₹<span className="italic">{product.price}</span>
      </p>

      {/* Buttons Section */}
      <div className="w-full sm:w-2/3 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          to={`/addcard/${id}`}
          className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-6 sm:px-8 md:px-12 text-lg sm:text-xl rounded-lg hover:bg-red-800 shadow-md transition-all duration-300 w-full sm:w-auto"
        >
          <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
          Add to Cart
        </Link>

        <Link
  to={`/addOrder/${id}`}
  className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 sm:px-8 md:px-12 text-lg sm:text-xl rounded-lg hover:bg-blue-800 shadow-md transition-all duration-300 w-full sm:w-auto text-center"
>
🛒 Order Now
</Link>
      </div>
    </div>
  );
}

export default Show;
