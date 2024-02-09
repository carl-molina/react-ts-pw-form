import React from "react";
import { test, expect, describe } from "vitest";
import { render } from '@testing-library/react';

import App from './App.js';


describe("App smoke test", function () {
  test('renders without crashing', function () {
    render(<App />);
  });
});


describe("App renders correct data", function () {
  test('contains expected text', function () {
    const res = render(<App />);
    expect(res.queryByText('Welcome back CARL!')).toBeInTheDocument();
    expect(res.queryByText('❌ Include a number')).toBeInTheDocument();
    expect(res.queryByText('❌ Password must match')).toBeInTheDocument();
  });

  test('button attribute set to disabled on initial render', function () {
    const { container, debug } = render(<App />);
    const btn = container.querySelector('button')!;
    expect(btn.getAttribute('disabled')).toBeDefined();
  });
});


describe("App snapshot test", function () {
  test('matches snapshot', function () {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
})
