const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <div>
          <h2 className="text-2xl font-bold">RentIt</h2>
          <p className="text-gray-400">Find your perfect rental home easily!</p>
        </div>

        <ul className="flex gap-4">
          <li><a href="/" className="hover:text-blue-400">Home</a></li>
          <li><a href="/listings" className="hover:text-blue-400">Listings</a></li>
          <li><a href="/post" className="hover:text-blue-400">Post a Property</a></li>
          <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
        </ul>

        <div className="text-gray-400">
          <p>📧 support@rentit.com</p>
          <p>📞 +91 XXXXXXXXXX</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} RentIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
