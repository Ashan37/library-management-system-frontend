import { useForm } from "react-hook-form";
import { useBooksStore } from "../../store/booksStore";
import { useNavigate, Link } from "react-router-dom";
import { BookPlus, ArrowLeft } from "lucide-react";
import { useState } from "react";

type BookFormData = {
  title: string;
  author: string;
  description: string;
  isbn?: string;
};

export default function AddBook() {
  const addBook = useBooksStore((state) => state.addBook);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: BookFormData) => {
    try {
      setIsSubmitting(true);
      await addBook(data);
      navigate("/dashboard/books");
    } catch (error) {
      console.error("Failed to add book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="p-4 mt-10 mb-4 bg-white rounded-lg shadow sm:p-6 sm:mb-6">
          <div className="flex items-center gap-2 mb-2 sm:gap-4">
            <Link
              to="/dashboard/books"
              className="flex-shrink-0 p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
              <BookPlus className="w-6 h-6 text-green-600 sm:w-8 sm:h-8" />
              Add New Book
            </h1>
          </div>
          <p className="ml-0 text-sm text-gray-600 sm:text-base sm:ml-14">
            Fill in the details to add a new book to your library
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                })}
                placeholder="Enter book title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Author <span className="text-red-500">*</span>
              </label>
              <input
                id="author"
                {...register("author", {
                  required: "Author is required",
                  minLength: {
                    value: 2,
                    message: "Author must be at least 2 characters",
                  },
                })}
                placeholder="Enter author name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="isbn"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                ISBN (Optional)
              </label>
              <input
                id="isbn"
                {...register("isbn")}
                placeholder="Enter ISBN number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                placeholder="Enter book description"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 text-white transition-colors bg-green-600 rounded-lg shadow hover:bg-green-700 hover:shadow-md disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Book"}
              </button>
              <Link
                to="/dashboard/books"
                className="flex-1 px-6 py-3 text-center text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
