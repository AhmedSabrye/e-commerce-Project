import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import TokenContext from "./context/TokenContext";
import CartContextProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import WishlistContext from "./context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const reactQuearyConfig = new QueryClient();

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            { path: "signin", element: <Signin /> },
            { path: "Register", element: <Register /> },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "products",
                element: (
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                ),
            },
            {
                path: "brands",
                element: (
                    <ProtectedRoute>
                        <Brands />
                    </ProtectedRoute>
                ),
            },
            {
                path: "categories",
                element: (
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                ),
            },
            { path: "*", element: <Notfound /> },
        ],
    },
]);

export default function App() {
    return (
        <QueryClientProvider client={reactQuearyConfig}>
            <CartContextProvider>
                <WishlistContext>
                    <TokenContext>
                        <RouterProvider router={router} />
                        <Toaster />
                    </TokenContext>
                </WishlistContext>
            </CartContextProvider>
        </QueryClientProvider>
    );
}
