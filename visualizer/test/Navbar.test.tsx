import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../src/components/Navbar';

describe('It renders Navbar component', () => {
  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  test('Navbar component is rendered', () => {
    render(<Navbar />);
    expect(screen.getByText('back')).toBeInTheDocument();
  });
});
