// Import the main React library
import React from 'react';

// Import ReactDOM to render React components into the DOM
import ReactDOM from 'react-dom/client';

// Import global CSS styles
import './index.css';

// Import the main App component
import App from './App';

// Import a utility for measuring performance in the app
import reportWebVitals from './reportWebVitals';

// Create a root container for React to render into
// document.getElementById('root') grabs the <div id="root"></div> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React component tree into the root container
root.render(
  // React.StrictMode is a development tool that helps detect potential problems
  <React.StrictMode>
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);

// Optional: measure performance metrics of your app
// You can pass a function to log results or send them to an analytics endpoint
// Example: reportWebVitals(console.log)
reportWebVitals();
