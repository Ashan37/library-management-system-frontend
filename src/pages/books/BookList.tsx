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

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="p-6 mb-6 bg-white rounded-lg shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
                <Book className="w-8 h-8 text-blue-600" />
                Books Collection
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your library books
              </p>
            </div>
            <Link
              to="/books/add"
              className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-green-600 rounded-lg shadow hover:bg-green-700 hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New Book
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
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
              to="/books/add"
              className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg"
              >
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="mb-3 font-medium text-blue-600">
                    by {book.author}
                  </p>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {book.description || "No description available"}
                  </p>

                  {book.isbn && (
                    <p className="mb-4 text-xs text-gray-500">
                      ISBN: {book.isbn}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Link
                      to={`/books/edit/${book.id}`}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
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