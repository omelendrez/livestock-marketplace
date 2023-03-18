import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserContext } from "./context";
import { KEYS, SP } from "./services/session";
import './App.css';
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const session = new SP();
  const currentUser = session.get(KEYS.user) || null;
  const [user, setUser] = useState(currentUser);
  const contextValues = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={contextValues}>
      {user?.id && <Navbar />}
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
