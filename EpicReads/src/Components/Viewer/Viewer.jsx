import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewer.css"

const BookViewer = () => {
  const { volumeId } = useParams();

  useEffect(() => {
    const loadGoogleBooksAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/books/jsapi.js";
      script.onload = () => {
        window.google.books.load();
        window.google.books.setOnLoadCallback(() => {
          const viewer = new window.google.books.DefaultViewer(
            document.getElementById("viewerCanvas")
          );
          viewer.load(volumeId);
        });
      };
      document.body.appendChild(script);
    };

    loadGoogleBooksAPI();
  }, [volumeId]);

  return (
    <div>
      <h2 className="viewer_title">Book Preview</h2>
      <div id="viewerCanvas" style={{ width: "100%", height: "600px", margin: "auto" }}></div>
    </div>
  );
};

export default BookViewer;
