import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SearchPage from "./pages/SearchPage";

// Arquivo Responsável pelo gerenciamento das rotas!
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    }, {
        path: '/movie/:imdbID',
        element: <MovieDetail/>
    },
    {
        path: 'search',
        element: <SearchPage/>
    }
])

export default router