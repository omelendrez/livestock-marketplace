import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register } from '../pages';
import { NotFound } from '../components';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
