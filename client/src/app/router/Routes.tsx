import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Library from "../../features/library/Library";
import HomePage from "../../features/home/HomePage";
import BookDetails from "../../features/library/BookDetails";
import ErrorPage from "../../features/home/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'shop', element: <Library />},
            {path: 'shop/:id', element: <BookDetails />},
            {path: 'error', element: <ErrorPage />},
            {path: '*', element: <Navigate replace to='/error' />}
        ]
    }
]);