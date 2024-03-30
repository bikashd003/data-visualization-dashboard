import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { DataProvider } from "./Context/ContextStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <DataProvider>
          <Dashboard />
        </DataProvider>
      </>
    ),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
