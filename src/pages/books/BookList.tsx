import { useEffect, useState } from "react";
import { useBooksStore } from "../../store/booksStore";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Book } from "lucide-react";

export default function BooksList() {
  const { books, fetchBooks, deleteBook } = useBooksStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      await fetchBooks();
      setIsLoading(false);
    };
    loadBooks();
  }, [fetchBooks]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="mx-auto max-w-7xl">
        <div className="p-4 mt-10 mb-4 bg-white rounded-lg shadow sm:p-6 sm:mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl" style={{ color: '#5E2A2B' }}>
                <Book className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#5E2A2B' }} />
                Books Collection
              </h1>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Manage your library books
              </p>
            </div>
            <Link
              to="/dashboard/books/add"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-lg shadow sm:px-6 sm:py-3 sm:text-base hover:shadow-md"
              style={{ backgroundColor: '#5E2A2B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A1F20'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5E2A2B'}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add New Book
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-b-2 rounded-full animate-spin" style={{ borderColor: '#5E2A2B' }}></div>
          </div>
        ) : books.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg shadow">
            <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-600">
              No books yet
            </h3>
            <p className="mb-6 text-gray-500">
              Start by adding your first book to the library
            </p>
            <Link
              to="/dashboard/books/add"
              className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg"
              >
                <div className="p-4 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="mb-3 font-medium text-blue-600">
                    by {book.author}
                  </p>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {book.description || "No description available"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t sm:gap-3" style={{ borderColor: '#C9A99A' }}>
                    <Link
                      to={`/dashboard/books/edit/${book.id}`}
                      className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm transition-colors rounded-lg sm:gap-2 sm:px-4 sm:text-base"
                      style={{ backgroundColor: '#F5F3EF', color: '#5E2A2B' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C9A99A'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F5F3EF'}
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Edit</span>
                      <span className="xs:hidden">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-sm text-white transition-colors rounded-lg sm:gap-2 sm:px-4 sm:text-base"
                      style={{ backgroundColor: '#5E2A2B' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A1F20'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5E2A2B'}
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Delete</span>
                      <span className="xs:hidden">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!isLoading && books.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Total: {books.length} book(s)
          </div>
        )}
      </div>
    </div>
  );
}