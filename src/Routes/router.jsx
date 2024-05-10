import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main.jsx";
import Login from "../Components/Crediantials/Login.jsx";
import Home from "../Pages/Home.jsx";
import Forgotpage from "../Components/Crediantials/Forgotpage.jsx";
import NewPassworsSet from "../Components/Crediantials/NewPassworsSet.jsx";
import Dashboardskeleton from "../Components/SkeletonDashboard/Dashboardskeleton.jsx";
import InventoryTable from "../Components/InventoryTable/InventoryTable.jsx";
import Nodatafound from "../Components/NoDataFound/Nodatafound.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import SimRequestOrderInfo from "../Components/SimRequest/SimRequestOrderInfo.jsx";
import Register from "../Components/Crediantials/Register.jsx";
import LdashBoard from "../Modules/LandingPage/LdashBoard.jsx";
import LandingRoute from "../Modules/LandingPage/LandingRoute.jsx";
export const router = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        errorElement : <h2 className="text-center">Unexpected Error :</h2>,
        children : [
           
            {
                path : '/',
                element :
                    // <PrivateRoute>
                    <LandingRoute/>
                 // </PrivateRoute> 
            },
            {
                path : '/signing',
                element : <Login></Login>
            },  
             {
                path : '/register',
                element : <Register></Register>
            },
            {
                path : '/forgotpass',
                element : <Forgotpage></Forgotpage>,
            },
            {
                path : '/reset-password/:resetToken',
                element : <NewPassworsSet></NewPassworsSet>
            },{
                path : '/crmdashboard',
                element : <Dashboardskeleton></Dashboardskeleton>
            }

            ]}])