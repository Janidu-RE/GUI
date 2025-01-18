import React from "react";
import Grid from "../../Components/Grid/Grid";
import "./Home.css";

const Home = () => {
    const genres = [
        "Fiction",
        "Science",
        "Fantasy",
        "Biography",
        "History",
        "Mystery",
        "Romance",
        "Horror",
    ];

    return (
        <div className="books-page">
            <h1 className="page-title">Books by Genre</h1>
            <div className="genres-container">
                {genres.map((genre, index) => (
                    <div key={index} className="genre-section">
                        <h2 className="genre-title">{genre}</h2>
                        <Grid index={8} /> {}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;