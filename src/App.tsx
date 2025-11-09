import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold text-blue-600">Go</span>
              <span className="text-2xl font-bold text-orange-500">Stay</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Search
              </Link>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">GoStay</p>
            <p className="text-gray-400 text-sm">
              Go Anywhere. Stay Everywhere.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              &copy; {new Date().getFullYear()} GoStay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
