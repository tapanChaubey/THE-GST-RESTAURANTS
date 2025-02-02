import React, { useEffect, useState } from "react";
import Hero from "../assets/Hero.png";
import Card from "../components/Card";
import { CiSearch } from "react-icons/ci";
import FoodItemCard from "../components/FoodItemCard";

function Home() {
  const [Alldata, setAllData] = useState([]);

  async function find() {
    const res = await fetch("http://localhost:7777/Alldata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const AllDataProduct = await res.json();
    setAllData(AllDataProduct);
  }

  useEffect(() => {
    find();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center bg-no-repeat px-4 md:px-0"
        style={{ backgroundImage: `url(${Hero})`, backgroundSize: "cover" }}
      >
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-center leading-tight text-[#392E2D] px-4">
          Order food. Discover the best <br className="hidden sm:block" /> restaurants. The GST!
        </h1>

        {/* Search Bar */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg text-black w-[90%] sm:w-[80%] md:w-[50%] mx-auto border border-gray-300">
          <CiSearch size={22} className="text-gray-500" />
          <input
            type="text"
            name="name"
            className="outline-none px-2 py-2 w-full text-lg bg-transparent"
            placeholder="Search for your favourite food items"
          />
        </div>
      </section>

      {/* Categories Scrollable List */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 mt-10">
        <div className="py-6 flex gap-4 overflow-x-auto w-full border-b no-scrollbar">
          {Alldata.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 mt-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Alldata.map((item, idx) => (
            <FoodItemCard key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Hide Scrollbar CSS */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  );
}

export default Home;
