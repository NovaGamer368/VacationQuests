import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Home } from "./components/Home";
import Login from './components/login/Login';
import Register from './components/login/Register';
import UserInfo from './components/login/UserInfo';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/Register",
        element: <Register />
    },
    {
        path: "/Register/User-Info",
        element: <UserInfo />
    },

   //...ApiAuthorzationRoutes
];

export default AppRoutes;
