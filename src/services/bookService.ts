import { api } from "./api";

type BookData = {
  title: string;
  author: string;
  description: string;
  isbn?: string;
};

export const BooksService = {
  getAll: () => api.get("/books"),
  create: (data: BookData) => api.post("/books", data),
  update: (id: string | number, data: BookData) => api.put(`/books/${id}`, data),
  delete: (id: string | number) => api.delete(`/books/${id}`),
};