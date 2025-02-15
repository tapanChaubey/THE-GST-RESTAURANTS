import React, { useEffect, useState } from "react";
import Hero from "../assets/Hero.png";
import Card from "../components/Card";
import { CiSearch } from "react-icons/ci";
import FoodItemCard from "../components/FoodItemCard";
import useAPI from "../hooks/useAPI";

function Home() {
  const api = useAPI();
  const [Alldata, setAllData] = useState([]);

  async function find() {
    const AllDataProduct = await api.get("Alldata");
    setAllData(AllDataProduct);
  }

  useEffect(() => {
    find();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center w-full h-[50vh] md:h-[60vh] bg-cover bg-center bg-no-repeat px-6 md:px-0"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <h1 className="text-2xl sm:text-5xl md:text-5xl font-extrabold text-center text-[#392E2D] px-6 leading-snug drop-shadow-lg">
          Order food. Discover the best <br className="hidden sm:block" /> <i>restaurants. Chaubey Food Hub!</i>
        </h1>

        {/* Search Bar */}
        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-lg w-[90%] sm:w-[80%] md:w-[50%] mx-auto border border-gray-300">
          <CiSearch size={24} className="text-gray-500" />
          <input
            type="text"
            name="name"
            className="outline-none px-2 py-2 w-full text-lg bg-transparent placeholder-gray-500"
            placeholder="Search for your favourite food items..."
          />
        </div>
      </section>

      {/* Categories Scrollable List */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-12">
        <div className="py-6 flex gap-4 overflow-x-auto w-full border-b no-scrollbar scroll-smooth">
          {Alldata.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
