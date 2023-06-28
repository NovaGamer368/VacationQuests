import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Home } from "./components/Home";
import Login from './components/login/Login';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/Login",
        element: <Login />
    },

   //...ApiAuthorzationRoutes
];

export default AppRoutes;
