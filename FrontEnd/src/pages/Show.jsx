import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";

function Show() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [Alldata, setAllData] = useState([]);

  // Debugging logs
  console.log("Current ID:", id);

  // Fetch all data from API
  async function find() {
    try {
      const res = await fetch("http://localhost:7777/Alldata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const AllDataProduct = await res.json();
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
      console.log("Found Product:", foundProduct);
    }
  }, [id, Alldata]);

  if (!id) {
    return <p className="text-center mt-10 text-2xl font-bold">ID is missing in the URL.</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-2xl font-bold">Loading...</p>;
  }

  return (
    <div className="flex items-center flex-col mt-10 mx-auto w-full max-w-screen-lg px-4 py-6">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">{product.name}</h1>
        <p className="text-lg sm:text-xl font-medium text-center text-gray-500 mb-4">{product.description}</p>
        <img
          className="h-[50vh] w-full max-w-screen-md object-cover rounded-lg shadow-lg mb-4"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="w-full flex flex-col items-center text-center mb-6">
        <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">₹<i>{product.price}</i></p>
        <p className="text-lg sm:text-xl text-gray-600 mb-4">{product.description}</p>
      </div>

      <div className="w-full sm:w-2/3 flex flex-col gap-4 items-center">
        <Link
          to={`/addcard/${id}`}
          className="bg-red-600 text-white py-3 px-8 sm:px-12 text-lg sm:text-xl rounded-lg hover:bg-red-800 cursor-pointer w-full font-semibold transition duration-300 text-center"
        >
          <FontAwesomeIcon icon={faBagShopping} className="mr-3 text-2xl" />
          Add to Cart
        </Link>
        <button className="bg-blue-600 text-white py-3 px-8 sm:px-12 text-lg sm:text-xl rounded-lg hover:bg-blue-800 cursor-pointer w-full mt-3 transition duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Show;
