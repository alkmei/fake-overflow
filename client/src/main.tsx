import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Welcome from "./routes/Welcome.tsx";
import SignUp from "@/routes/users/SignUp.tsx";
import Login from "@/routes/users/Login.tsx";
import Questions from "@/routes/Questions.tsx";
import Content from "@/Content.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/users/signup", element: <SignUp /> },
      { path: "/users/login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Content />,
    children: [{ path: "/questions", element: <Questions /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
