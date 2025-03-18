import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const properties = [
    { id: 1, bhk: "2bhk", location: "mumbai", range: "less than 10,000" , cost:"Rs.9,000"},
    { id: 2, bhk: "3bhk", location: "delhi", range: "less than 20,000", cost:"Rs.16,000" },
    { id: 3, bhk: "hostel", location: "bangalore", range: "less than 50,000", cost:"Rs.38,000" },
    { id: 4, bhk: "rent", location: "hyderabad", range: "greater than 50,000", cost:"Rs.60,000" },
  ];

  const [filters, setFilters] = useState({
    bhk: "",
    location: "",
    price: "",
  });

  const [tempFilters, setTempFilters] = useState({
    bhk: "",
    location: "",
    price: "",
  });

  const handleTempFilterChange = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = properties.filter((property) =>
    Object.entries(filters).every(
      ([key, value]) =>
        !value ||
        String(property[key as keyof typeof property]).toLowerCase() ===
          value.toLowerCase()
    )
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Your Perfect Home
      </motion.h1>

      {/* FILTER BAR*/}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-screen-lg flex flex-wrap items-end gap-4">
        {/* BHK Type */}
        <div className="flex flex-col flex-1">
          <label className="text-white font-medium pb-1">Type</label>
          <select
            onChange={(e) => handleTempFilterChange("bhk", e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select BHK</option>
            <option value="2bhk">2BHK</option>
            <option value="3bhk">3BHK</option>
            <option value="hostel">Hostel</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col flex-1">
          <label className="text-white font-medium pb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            onChange={(e) => handleTempFilterChange("location", e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col flex-1">
          <label className="text-white font-medium pb-1">Price</label>
          <select
            onChange={(e) => handleTempFilterChange("price", e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white w-full focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Price</option>
            <option value="less than 10,000">Less than 10,000</option>
            <option value="less than 20,000">Less than 20,000</option>
            <option value="less than 50,000">Less than 50,000</option>
            <option value="greater than 50,000">Greater than 50,000</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ ...tempFilters })}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-transform hover:scale-105"
        >
          Search
        </button>
      </div>

      {/* PROPERTY LISTING */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <motion.div
  key={property.id}
  className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} 
>
  <h2 className="text-lg font-semibold">{property.bhk.toUpperCase()}</h2>
  <p className="text-gray-400">📍 {property.location}</p>
  <p className="text-blue-400 font-medium">💰 {property.cost}</p>
</motion.div>

          ))
        ) : (
          <motion.p
            className="text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No properties found
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Hero;
