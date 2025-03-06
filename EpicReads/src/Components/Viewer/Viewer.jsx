// Viewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Viewer.css'

const Viewer = () => {
  const { volumeId } = useParams();
  const viewerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [retryCount, setRetryCount] = useState(0);
  const googleBooksScriptLoaded = useRef(false);

  // Known working test ID: 'zyTCAlFPjgYC' (Pride and Prejudice)
  const loadViewer = async () => {
    try {
      setStatus('loading');

      // 1. Ensure DOM container exists
      if (!viewerRef.current) {
        throw new Error('Viewer container not found');
      }

      // 2. Load Google Books API script with callback handling
      if (!window.google?.books?.DefaultViewer) {
        await new Promise((resolve, reject) => {
          if (googleBooksScriptLoaded.current) return resolve();

          const script = document.createElement('script');
          script.src = 'https://www.google.com/books/jsapi.js';
          script.async = true;
          
          // Initialize Google Books API callback handler
          window.google = window.google || {};
          window.google.books = window.google.books || {
            _callbacks: [],
            load: function() { 
              this._callbacks.forEach(cb => cb()); 
            },
            setOnLoadCallback: function(callback) {
              this._callbacks.push(callback);
            }
          };

          script.onload = () => {
            googleBooksScriptLoaded.current = true;
            window.google.books.setOnLoadCallback(resolve);
            window.google.books.load();
          };

          script.onerror = (err) => {
            googleBooksScriptLoaded.current = false;
            reject(err);
          };

          document.body.appendChild(script);
        });
      }

      // 3. Initialize viewer with proper dimensions
      const viewer = new window.google.books.DefaultViewer(
        viewerRef.current,
        {
          width: viewerRef.current.clientWidth,
          height: viewerRef.current.clientHeight,
          embed_chrome_restricted: 'true' // CORS workaround
        }
      );

      // 4. Load the book content
      viewer.load(
        `id:${volumeId}`,
        () => {
          console.log('Viewer loaded successfully');
          setStatus('loaded');
        },
        (error) => {
          console.error('Viewer load failed:', error);
          setStatus('error');
        }
      );

    } catch (error) {
      console.error('Viewer initialization error:', error);
      if (retryCount < 2) {
        setTimeout(() => setRetryCount(c => c + 1), 2000);
      } else {
        setStatus('error');
      }
    }
  };

  useEffect(() => {
    loadViewer();

    // Cleanup function
    return () => {
      if (viewerRef.current) {
        viewerRef.current.innerHTML = '';
      }
    };
  }, [volumeId, retryCount]);

  return (
    <div className="viewer-container">
      {/* Loading state */}
      {status === 'loading' && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Initializing book viewer...</p>
          {retryCount > 0 && (
            <p>Retry attempt {retryCount}/3</p>
          )}
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="error-overlay">
          <h3>Failed to load preview</h3>
          <p>Possible solutions:</p>
          <ul>
            <li>Enable third-party cookies in browser settings</li>
            <li>Disable ad-blockers for this site</li>
            <li>Try a different browser</li>
          </ul>
          <a
            href={`https://books.google.com/books?id=${volumeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            Open in Google Books
          </a>
          <button 
            onClick={() => {
              setRetryCount(0);
              setStatus('loading');
            }}
            className="retry-button"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* Viewer container */}
      <div
        ref={viewerRef}
        id="viewerCanvas"
        style={{
          width: '100%',
          height: '80vh',
          minHeight: '600px',
          visibility: status === 'loaded' ? 'visible' : 'hidden'
        }}
      />
    </div>
  );
};

export default Viewer;