import { Navigate, Outlet } from "react-router-dom";
import AuthSpinner from "../components/general/AuthSpinner";
import useAuth from "../hooks/useAuth.hooks";
import { PATH_PUBLIC } from "../routes/Paths";

// create IProps interface to roles 
interface IProps {
  roles: string[];
}
  
const AuthGuard = ({ roles }: IProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
  //access the requeste page(the page will be rendered in <Outlet />)
  const hasAccess = isAuthenticated && user?.roles?.find((q) => roles.includes(q));
    if (isAuthLoading) {
      return <AuthSpinner />;
    }
  return hasAccess ? <Outlet /> : <Navigate to={PATH_PUBLIC.unauthorized} />;
};

export default AuthGuard;