export default function Footer() {
  return (
    <footer className="bg-blue-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">About Us</h3>
            <p className="text-gray-600">
              ShopEase is your one-stop destination for quality products at great prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-700">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© 2025 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}