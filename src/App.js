import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { UserContext } from "./context";
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const contextValues = {
    user,
    setUser
  };
  return (
    <UserContext.Provider value={contextValues}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
