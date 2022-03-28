import React from 'react';
import ReactDOM from 'react-dom';
import { render} from '@testing-library/react';
import MainApp from "./App";

test('renders learn react link', () => {
    const div = document.createElement('div')
  render(<MainApp/>);
    ReactDOM.unmountComponentAtNode(div)
 //const linkElement = screen.getByText(/learn react/i);
 //expect(linkElement).toBeInTheDocument();
});
