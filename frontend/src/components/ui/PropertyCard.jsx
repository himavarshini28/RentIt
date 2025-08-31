import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={property.imageUrls || "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{property.name}</h3>
          <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            ${property.price}/mo
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{property.location}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.5-2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v6a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-6z" />
            </svg>
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v1h1a2 2 0 012 2v3.93a3.5 3.5 0 00-1-.6V5a1 1 0 00-1-1h-1v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1.5a3.5 3.5 0 00-1 .18V5a1 1 0 011-1h1V2z" clipRule="evenodd" />
            </svg>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>{property.area} sqft</span>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={`/property/${property._id || property.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-800"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
