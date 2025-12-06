import { useForm } from "react-hook-form";
import { useBooksStore } from "../../store/booksStore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";

type BookFormData = {
  title: string;
  author: string;
  description: string;
  isbn?: string;
};

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, updateBook } = useBooksStore();
  const book = books.find((b) => b.id === Number(id));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    values: book,
  });

  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data: BookFormData) => {
    try {
      setIsSubmitting(true);
      await updateBook(Number(id), data);
      navigate("/books");
    } catch (error) {
      console.error("Failed to update book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="p-12 text-center bg-white rounded-lg shadow">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-600">
              Book not found
            </h3>
            <p className="mb-6 text-gray-500">
              The book you're looking for doesn't exist
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 mb-6 bg-white rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <Link
              to="/books"
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Edit Book
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Update the book details below</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className="flex-1 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg shadow hover:bg-blue-700 hover:shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Book"}
              </button>
              <Link
                to="/books"
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
