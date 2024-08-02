import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hooks";
import { AiOutlineHome } from "react-icons/ai";
import Button from "../general/Button";
import { PATH_DASHBOARD } from "../../routes/Paths";


const Header = () => {
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center  h-12 px-4">

      <div className="flex items-center gap-4">
        <AiOutlineHome 
          className="w-8 h-8 text-purple-400 hover:text-purple-600 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div>
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <Button
             label="Dashboard"
             type="button"
             onClick={() => navigate(PATH_DASHBOARD.dashboard)}
             variant="light"
            />
            <Button 
             label='Logout' 
             onClick={logout} 
             type='button' 
             variant='light' 
            />
          </div>
        )}
      </div>
        
    </div>
  );
};

export default Header;