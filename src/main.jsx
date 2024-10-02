/* eslint-disable no-unused-vars */

import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import App from './App.jsx'
import Categories from './components/categories.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const router = createMemoryRouter([
  { path: "/", element: <App /> },
  { path: "/categories", element: <Categories /> }
]);

createRoot(document.getElementById('root')).render(
  <App />


)