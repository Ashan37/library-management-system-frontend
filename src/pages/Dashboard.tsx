import { Link } from "react-router-dom";
import { BookOpen, Plus, List} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mt-10 mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
            Library Management System
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage your book collection efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/dashboard/books"
            className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 transition-opacity duration-300 bg-blue-600 opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex flex-col items-center justify-center h-48 p-6">
              <div className="p-4 mb-4 transition-colors duration-300 bg-blue-100 rounded-full group-hover:bg-white/20">
                <List className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-white">
                View All Books
              </h3>
              <p className="mt-2 text-sm text-center text-gray-500 transition-colors duration-300 group-hover:text-blue-50">
                Browse your collection
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard/books/add"
            className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 transition-opacity duration-300 bg-green-600 opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex flex-col items-center justify-center h-48 p-6">
              <div className="p-4 mb-4 transition-colors duration-300 bg-green-100 rounded-full group-hover:bg-white/20">
                <Plus className="w-8 h-8 text-green-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-white">
                Add New Book
              </h3>
              <p className="mt-2 text-sm text-center text-gray-500 transition-colors duration-300 group-hover:text-green-50">
                Expand your library
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard/books"
            className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 transition-opacity duration-300 bg-purple-600 opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex flex-col items-center justify-center h-48 p-6">
              <div className="p-4 mb-4 transition-colors duration-300 bg-purple-100 rounded-full group-hover:bg-white/20">
                <BookOpen className="w-8 h-8 text-purple-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-white">
                Manage Books
              </h3>
              <p className="mt-2 text-sm text-center text-gray-500 transition-colors duration-300 group-hover:text-purple-50">
                Edit or delete books
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
