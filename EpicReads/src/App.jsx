// src/App.js
import React from "react";
import "./App.css";
import Footer from "./Components/Footer/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookshelfProvider } from './Context/BookshelfContext.jsx';
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Categories from "./Pages/Ebooks/Ebooks.jsx";
import Search from "./Pages/Search-Results/Search.jsx";
import Viewer from "./Components/Viewer/Viewer.jsx";
import AllBooks from "./Pages/AllBooks/AllBooks.jsx";
import BookShelf from "./Pages/BookShef/BookShelf.jsx"

const App = () => {
  return (
    <BookshelfProvider>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Ebook" element={<Categories />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/viewer/:volumeId" element={<Viewer />} />
            <Route path="/AllBooks" element={<AllBooks />} />
            <Route path="/bookshelf" element={<BookShelf />} />
          </Routes>
        </div>
        <Footer />
    </BookshelfProvider>
  );
};

export default App;