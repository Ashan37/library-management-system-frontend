import { api } from "./api";

type BookData = {
  title: string;
  author: string;
  description: string;
};

export const BooksService = {
  getAll: () => api.get("/api/Book/getAllBooks"),
  getOne: (id: number) => api.get(`/api/Book/getBook/${id}`),
  create: (data: BookData) => api.post("/api/Book/addBook", data),
  update: (id: string | number, data: BookData) =>
    api.put(`/api/Book/updateBook/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/Book/deleteBook/${id}`),
};
