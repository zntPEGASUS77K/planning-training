import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {AgendaPage} from "./pages/agenda/AgendaPage.tsx";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <AgendaPage />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
