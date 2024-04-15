import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Library from "../../features/library/Library";
import HomePage from "../../features/home/HomePage";
import BookDetails from "../../features/library/BookDetails";
import ErrorPage from "../../features/home/ErrorPage";
import ShoppingCartDisplay from "../../features/shoppingCart/ShoppingCartDisplay";
import Checkout from "../../features/checkout/Checkout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'shop', element: <Library />},
            {path: 'shop/:id', element: <BookDetails />},
            {path: 'error', element: <ErrorPage />},
            {path: 'shoppingCart', element: <ShoppingCartDisplay />},
            {path: 'checkout', element: <Checkout />},
            {path: '*', element: <Navigate replace to='/error' />}
        ]
    }
]);