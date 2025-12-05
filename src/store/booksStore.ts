import { create } from "zustand";
import { BooksService } from "../services/booksService";

export const useBooksStore = create((set) => ({
  books: [],

  fetchBooks: async () => {
    const res = await BooksService.getAll();
    set({ books: res.data });
  },

  addBook: async (data: any) => {
    await BooksService.create(data);
  },

  updateBook: async (id: string, data: any) => {
    await BooksService.update(id, data);
  },

  deleteBook: async (id: string) => {
    await BooksService.delete(id);
  },
}));
