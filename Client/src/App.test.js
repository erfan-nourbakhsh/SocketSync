// Import render and screen utilities from React Testing Library
// - render(): Renders a React component into a virtual DOM for testing
// - screen: Provides queries to find elements in the rendered output
import { render, screen } from '@testing-library/react';

// Import the App component that we want to test
import App from './App';

// Define a test case with a description
test('renders learn react link', () => {
  // Render the <App /> component into the testing environment
  render(<App />);

  // Query the rendered DOM for an element that contains the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

  // Assert (expect) that the queried element exists in the document
  expect(linkElement).toBeInTheDocument();
});
