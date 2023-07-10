import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from "./components/Home";
import Login from './components/login/Login';
import Register from './components/login/Register';
import UserInfo from './components/login/UserInfo';
import Profile from './components/user/Profile';
import CreateEvent from './components/vacation/CreateEvent';
import CreateVacation from './components/vacation/CreateVacation';
import EditVacation from './components/vacation/EditVacation';

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
    {
        path: "/Profile",
        element: <Profile />
    },
    {
        path: "/Create",
        element: <CreateVacation />
    },
    {
        path: '/EditVacation',
        element: <EditVacation />
    },
    {
        path: 'CreateEvent',
        element: <CreateEvent />
    },

    //...ApiAuthorzationRoutes
];

export default AppRoutes;
