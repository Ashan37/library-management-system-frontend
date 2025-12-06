import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import BooksList from "../pages/books/BookList";
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "books", element: <BooksList /> },
      { path: "books/add", element: <AddBook /> },
      { path: "books/edit/:id", element: <EditBook /> },
    ],
  },
]);
