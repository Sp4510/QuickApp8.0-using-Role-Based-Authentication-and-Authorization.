import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import LoginPage from "../pages/public/LoginPage";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./Paths";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";
import AuthGuard from "../auth/AuthGuard";
import { adminAccessRoles, allAccessRoles, managerAccessRoles, ownerAccessRoles } from "../auth/auth.utils";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyLogsPage from "../pages/dashboard/MyLogsPage";
import UserPage from "../pages/dashboard/UserPage";
import AdminPage from "../pages/dashboard/AdminPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage";
import UsersManagementPage from "../pages/dashboard/UsersManagementPage";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage";
import ManagerPage from "../pages/dashboard/ManagerPage";
import OwnerPage from "../pages/dashboard/OwnerPage";

const GlobalRouter = () => {
    return (
        <Routes>
            {/* <Route path='' element /> */}
            <Route element={<Layout />}>
          
                {/* Public routes */}
                <Route index element={<LoginPage />} />
                <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
                <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
                <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />
  
                {/* Protected routes -------------------------------------------------- */}

                <Route element={<AuthGuard roles={allAccessRoles} />}> 
                    <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
                    <Route path={PATH_DASHBOARD.myLogs} element={<MyLogsPage />} />
                    <Route path={PATH_DASHBOARD.user} element={<UserPage />} />
                </Route>

                <Route element={<AuthGuard roles={managerAccessRoles}/>}>
                    <Route path={PATH_DASHBOARD.usersManagement} element={<UsersManagementPage/>}/>
                    <Route path={PATH_DASHBOARD.manager} element={<ManagerPage/>}/>
                </Route>

                <Route element={<AuthGuard roles={adminAccessRoles} />}>
                    <Route path={PATH_DASHBOARD.usersManagement} element={<UsersManagementPage />} />
                    <Route path={PATH_DASHBOARD.updateRole} element={<UpdateRolePage />} />
                    <Route path={PATH_DASHBOARD.systemLogs} element={<SystemLogsPage />} />
                    <Route path={PATH_DASHBOARD.admin} element={<AdminPage />} />
                </Route>

                <Route element={<AuthGuard roles={ownerAccessRoles} />}>
                    <Route path={PATH_DASHBOARD.owner} element={<OwnerPage />} />
                </Route>
                
                <Route>
                    <Route path='*' element={<Navigate to={PATH_DASHBOARD.usersManagement} replace />} />
                </Route>

                {/* Catch all (404) */}
                <Route path={PATH_PUBLIC.notfound} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={PATH_PUBLIC.notfound} replace />} />
            </Route>
        </Routes>
    );
};
  
export default GlobalRouter;