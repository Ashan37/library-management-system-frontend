import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import BooksList from "../pages/books/BooksList";
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/books", element: <BooksList /> },
  { path: "/books/add", element: <AddBook /> },
  { path: "/books/edit/:id", element: <EditBook /> },
]);
