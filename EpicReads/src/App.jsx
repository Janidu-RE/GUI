import React from "react";
import "./App.css";
import Footer from "./Components/Footer/footer.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import Book_shelf from "./Pages/Book_shelf.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Categories from "./Pages/Ebooks/Ebooks.jsx";

const App = () => {
  return (
    <div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Shelf" element={<Book_shelf />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Ebook" element={<Categories />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
