import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/ui/PropertyCard';

const Allproperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://rent-it-zv5s.vercel.app/api/property/v1/get-properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">Loading properties...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            All Properties
          </h2>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-4 lg:max-w-none md:grid-cols-2">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No properties found.</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Allproperties;
