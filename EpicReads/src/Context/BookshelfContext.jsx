// src/context/BookshelfContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const BookshelfContext = createContext();

export const BookshelfProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [shelves, setShelves] = useState({
    wantToRead: [],
    alreadyRead: [],
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bookshelves");
      if (saved) {
        const parsed = JSON.parse(saved);
        setShelves({
          wantToRead: parsed.wantToRead || [],
          alreadyRead: parsed.alreadyRead || [],
        });
      }
    } catch (error) {
      console.error("Failed to load shelves:", error);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (initialized) {
      try {
        localStorage.setItem("bookshelves", JSON.stringify(shelves));
      } catch (error) {
        console.error("Failed to save shelves:", error);
      }
    }
  }, [shelves, initialized]);

  const addToShelf = (shelf, book) => {
    if (!book.id) return;

    setShelves((prev) => ({
      ...prev,
      [shelf]: [
        ...prev[shelf].filter((b) => b.id !== book.id),
        {
          id: book.id,
          volumeInfo: {
            title: book.volumeInfo?.title,
            authors: book.volumeInfo?.authors,
            imageLinks: book.volumeInfo?.imageLinks,
          },
        },
      ],
    }));
  };

  const removeFromShelf = (shelf, bookId) => {
    setShelves((prev) => ({
      ...prev,
      [shelf]: prev[shelf].filter((book) => book.id !== bookId),
    }));
  };

  return (
    <BookshelfContext.Provider value={{ shelves, addToShelf, removeFromShelf }}>
      {children}
    </BookshelfContext.Provider>
  );
};

export const useBookshelf = () => {
  const context = useContext(BookshelfContext);
  if (!context) throw new Error("useBookshelf used outside Provider");
  return context;
};
