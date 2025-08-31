import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/userStore';

const CallToAction = () => {
  const { isAuthenticated } = useUserStore();
  return (
    <section className="bg-cyan-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {isAuthenticated ? (
            <span className="block text-cyan-200">Discover your perfect rental property.</span>
          ) : (
            <span className="block text-cyan-200">Join RentIt today.</span>
          )}
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/property"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-white hover:bg-cyan-50"
            >
              Browse Properties
            </Link>
          </div>
          {!isAuthenticated && (
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-500"
              >
                Sign Up Now
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/user/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-500"
              >
                View Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
