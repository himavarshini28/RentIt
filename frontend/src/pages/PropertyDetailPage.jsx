import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePropertyStore from '../store/propertyStore';
import PropertyCard from '../components/ui/PropertyCard';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { fetchPropertyById, properties ,fetchProperties, currentProperty, isLoading, error } = usePropertyStore();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPropertyById(id);
    }
    fetchProperties();
  }, [id, fetchPropertyById, fetchProperties]);
 

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Property not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For demonstration, use placeholder images if property doesn't have images
  const images = currentProperty.images?.length > 0 
    ? currentProperty.images 
    : [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link to="/" className="text-cyan-600 hover:text-cyan-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to listings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Property Images */}
        <div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={images[activeImage]}
              alt={`Property ${activeImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-24 rounded-md overflow-hidden cursor-pointer ${
                  index === activeImage ? 'ring-2 ring-cyan-500' : ''
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{currentProperty.name}</h1>
            <span className="bg-cyan-100 text-cyan-800 text-lg font-semibold px-3 py-1 rounded">
              ${currentProperty.rentAmount}/mo
            </span>
          </div>
          
          <p className="text-lg text-gray-600 mt-2">{currentProperty.location}</p>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <span className="block text-2xl font-semibold">{currentProperty.bedrooms}</span>
              <span className="text-gray-500">Bedrooms</span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <span className="block text-2xl font-semibold">{currentProperty.bathrooms}</span>
              <span className="text-gray-500">Bathrooms</span>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <span className="block text-2xl font-semibold">{currentProperty.area}</span>
              <span className="text-gray-500">Sq Ft</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">
              {currentProperty.description || 'This beautiful property features modern amenities, spacious rooms, and a great location. Perfect for families or professionals looking for a comfortable and convenient living space.'}
            </p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Features</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
              {(currentProperty.features || [
                'Central Air Conditioning',
                'In-unit Washer/Dryer',
                'Hardwood Floors',
                'Stainless Steel Appliances',
                'Dishwasher',
                'Balcony',
                'Fitness Center',
                'Pet Friendly'
              ]).map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8">
            <button className="w-full bg-cyan-600 text-white py-3 px-4 rounded-md font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              Contact Owner
            </button>
          </div>
        </div>
      </div>      {/* Similar Properties */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
        
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
                  <div className="flex space-x-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties && properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;

