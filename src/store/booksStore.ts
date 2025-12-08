import { create } from "zustand";
import { BooksService } from "../services/bookService";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface BooksState {
  books: Book[];
  fetchBooks: () => Promise<void>;
  getBook: (id: number) => Promise<Book | null>;
  addBook: (data: Omit<Book, "id">) => Promise<void>;
  updateBook: (id: number, data: Omit<Book, "id">) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
}

export const useBooksStore = create<BooksState>((set) => ({
  books: [],

  fetchBooks: async () => {
    const res = await BooksService.getAll();
    set({ books: res.data });
  },

  getBook: async (id) => {
    const res = await BooksService.getOne(id);
    return res.data;
  },

  addBook: async (data) => {
    const res = await BooksService.create(data);
    set((state) => ({
      books: [...state.books, res.data],
    }));
  },

  updateBook: async (id, data) => {
    await BooksService.update(id, data);
    set((state) => ({
      books: state.books.map((b) => (b.id === id ? { ...b, ...data } : b)),
    }));
  },

  deleteBook: async (id) => {
    await BooksService.delete(id);
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    }));
  },
}));
