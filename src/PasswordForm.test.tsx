import React from "react";
import { test, afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App.js';
import PasswordForm from "./PasswordForm.js";


const handleSave = MockedFunction


// smoke test
test('renders without crashing', function () {
  render(<PasswordForm handleSave={handleSave}/>);
});


// test('contains expected text', function () {
//   const res = render(<App />);
//   expect(res.queryByText('Welcome back CARL!')).toBeInTheDocument();
//   expect(res.queryByText('❌ Include a number')).toBeInTheDocument();
//   expect(res.queryByText('❌ Password must match')).toBeInTheDocument();
// });


// test('button attribute set to disabled on initial render', function () {
//   const { container, debug } = render(<App />);
//   const btn = container.querySelector('button')!;
//   expect(btn.getAttribute('disabled')).toBeDefined();
// });


// // snapshot test
// test('matches snapshot', function () {
//   const { container } = render(<App />);
//   expect(container).toMatchSnapshot();
// });
