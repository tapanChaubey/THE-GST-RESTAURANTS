import React, { useEffect, useState } from "react";
import Hero from "../assets/Hero.png";
import Card from "../components/Card";
import { CiSearch } from "react-icons/ci";
import FoodItemCard from "../components/FoodItemCard";
import useAPI from "../hooks/useAPI";

function Home() {
  const api = useAPI();
  const [Alldata, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]);

  async function find() {
    const AllDataProduct = await api.get("Alldata");
    setAllData(AllDataProduct);
    setFilteredData(AllDataProduct);
  }

  useEffect(() => {
    find();
  }, []);

  // Function to filter the data based on search input, ignoring spaces
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().replace(/\s+/g, ""); // Remove spaces from query
    setSearchQuery(e.target.value);

    if (query === "") {
      setFilteredData(Alldata);
    } else {
      const filtered = Alldata.filter((item) =>
        item.name.toLowerCase().replace(/\s+/g, "").includes(query) // Ignore spaces in product name
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center w-full h-[50vh] md:h-[70vh] bg-cover bg-center bg-no-repeat px-6 md:px-10 lg:px-20 text-center"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#392E2D] leading-snug drop-shadow-lg">
          Order food. Discover the best <br className="hidden sm:block" />
          <i>restaurants. Chaubey Food Hub!</i>
        </h1>

        {/* Search Bar */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-xl w-[95%] sm:w-[80%] md:w-[60%] lg:w-[50%] border border-gray-300">
          <CiSearch size={26} className="text-gray-500" />
          <input
            type="text"
            name="name"
            value={searchQuery}
            onChange={handleSearch}
            className="outline-none px-3 py-2 w-full text-lg bg-transparent placeholder-gray-500"
            placeholder="Search for your favourite food items..."
          />
        </div>
      </section>

      {/* Categories Scrollable List */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-16">
        <div className="py-6 flex gap-6 overflow-x-auto w-full border-b-2 border-gray-300 no-scrollbar scroll-smooth">
          {filteredData.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-16 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredData.map((item, idx) => (
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
