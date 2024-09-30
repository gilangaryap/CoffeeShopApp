import { createBrowserRouter } from "react-router-dom";
import Layout from "./page/Layout";
import Home from "./page/Home";
import Login from "./page/Login";
import Product from "./page/Product";
import Profile from "./page/Profile";
import Register from "./page/Register";
import PrivateRoute from "./components/PrivateRouter";
import CheckoutProduct from "./page/CheckoutProducts";
import DetailProduct from "./page/DetailProduct";
import HistoryOrder from "./page/HistoryOrder";
import { Admin } from "./page/Admin";
import { AddProduct } from "./page/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute to={"/login"}>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "history-order",
        element: (
          <PrivateRoute to={"/login"}>
            <HistoryOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "checkout",
        element:(
          <PrivateRoute to={"/login"}>
            <CheckoutProduct />
          </PrivateRoute>
        ),
      },
      {
        path:"detailproduct/:uuid",
        element: <DetailProduct/>
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register/>
  },
  {
    path:"/admin",
    element:<Admin/>,
    errorElement:<h1>Error</h1>,
    children:[
      {
        path:"add-product",
        element:<AddProduct/>
      }
    ]
  }
]);
