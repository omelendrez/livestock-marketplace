
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Register, Dashboard } from '../pages';
import { NotFound } from '../components';
import { useContext } from "react";
import { UserContext } from "../context";

const ProtectedRoute = ({ user, children }) => {
  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute user={user}>
          <Dashboard />
        </ProtectedRoute>}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
