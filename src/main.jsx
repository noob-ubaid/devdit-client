import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { router } from "./router/Router.jsx";
import { RouterProvider } from "react-router";
import { AuthContext } from "./contexts/AuthProvider.jsx";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </ThemeProvider>
  </StrictMode>
);
