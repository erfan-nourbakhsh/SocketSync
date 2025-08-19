// Define a function to report web vitals
// onPerfEntry: a callback function that receives performance metrics
const reportWebVitals = (onPerfEntry) => {
  // Check if onPerfEntry exists and is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each metric function and pass the callback to handle the results

      getCLS(onPerfEntry);  // Cumulative Layout Shift: measures visual stability
      getFID(onPerfEntry);  // First Input Delay: measures interactivity
      getFCP(onPerfEntry);  // First Contentful Paint: measures loading performance
      getLCP(onPerfEntry);  // Largest Contentful Paint: measures perceived load speed
      getTTFB(onPerfEntry); // Time to First Byte: measures server responsiveness
    });
  }
};

// Export the function to use elsewhere in the app
export default reportWebVitals;
