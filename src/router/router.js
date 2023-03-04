import { createBrowserRouter } from "react-router-dom";
import { Home } from '../components';
import { Login } from '../components';
import { Register } from '../components';

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
]);
