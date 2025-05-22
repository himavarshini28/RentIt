import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-cyan-600">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Beautiful modern apartment interior"
        />
        <div
          className="absolute inset-0 bg-cyan-700 mix-blend-multiply"
          aria-hidden="true"
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Perfect Rental
        </h1>
        <p className="mt-6 text-xl text-cyan-100 max-w-3xl">
          RentIt makes it easy to discover your next home with thousands of
          properties available for rent. Browse through our listings and find
          the perfect place that suits your needs.
        </p>

        <div className="mt-10">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="relative">
  <select
    id="location"
    name="location"
    className="block w-full appearance-none rounded-md border border-cyan-500 bg-white py-2 pl-3 pr-10 text-base text-gray-700 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-500 sm:text-sm"
  >
    <option>Any Location</option>
    <option>New York</option>
    <option>Los Angeles</option>
    <option>Chicago</option>
    <option>Miami</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg
      className="h-5 w-5 text-cyan-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 01.707 1.707L6.414 9h7.172l-4.293 4.293A1 1 0 0110 14a1 1 0 01-.707-1.707L13.586 9H6.414l4.293-4.293A1 1 0 0110 3z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>

              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price Range
                </label>
                <select
                  id="price"
                  name="price"
                  className="appearance-none mt-1 block w-full pl-3 pr-10 py-2 text-base border border-cyan-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-600 sm:text-sm rounded-md bg-white text-gray-700"
                >
                  <option>Any Price</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $1,500</option>
                  <option>$1,500 - $2,000</option>
                  <option>$2,000+</option>
                </select>
              </div>

              <div className="flex items-end">
                <Link
                  to="/properties"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Search Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
