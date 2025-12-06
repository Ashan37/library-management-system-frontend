import { create } from "zustand";
import { BooksService } from "../services/bookService";

type Book = {
  id: string | number;
  title: string;
  author: string;
  description: string;
  isbn?: string;
};

type BooksState = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (data: Omit<Book, "id">) => Promise<void>;
  updateBook: (id: string | number, data: Omit<Book, "id">) => Promise<void>;
  deleteBook: (id: string | number) => Promise<void>;
};

export const useBooksStore = create<BooksState>((set) => ({
  books: [],

  fetchBooks: async () => {
    const res = await BooksService.getAll();
    set({ books: res.data });
  },

  addBook: async (data) => {
    await BooksService.create(data);
  },

  updateBook: async (id, data) => {
    await BooksService.update(id, data);
  },

  deleteBook: async (id) => {
    await BooksService.delete(id);
  },
}));
