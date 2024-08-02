import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.hooks";
import { useNavigate } from "react-router-dom";
import { RolesEnum } from "../../types/auth.types";
import Button from "../general/Button";
import { PATH_DASHBOARD } from "../../routes/Paths";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const { user } = useAuth();
  const [visibleButtons, setVisibleButtons] = useState({
    usersManagement: false,
    allLogs: false,
    ownerPage: false,
    adminPage: false,
    managerPage: false,
    userPage: false
  });
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    navigate(url);
  };
    
  const userRolesLabelCreator = () => {
    if (user) {
      let result = '';
      user.roles.forEach((role, index) => {
      result += role;
        if (index < user.roles.length - 1) {
          result += ', ';
        }
      });
      return result;
    }
    return '--';
  };

  useEffect(() => {
    if (user) {
      const roles = user.roles;
      setVisibleButtons({
        usersManagement: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.MANAGER) || roles.includes(RolesEnum.ADMIN),
        allLogs: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN),
        ownerPage:roles.includes(RolesEnum.OWNER),
        adminPage: roles.includes(RolesEnum.ADMIN) || roles.includes(RolesEnum.OWNER),
        managerPage: roles.includes(RolesEnum.MANAGER) || roles.includes(RolesEnum.ADMIN) || roles.includes(RolesEnum.OWNER),
        userPage: true  //all authenticated users access the user page
      });
    }
  }, [user]);
  
  return (
    <div className='shrink-0 bg-[#754eb4] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>

      <div className='self-center flex flex-col items-center'>
        <CiUser className='w-10 h-10 text-white' />
          <h4 className='text-white'>
            {user?.fullName}
          </h4>
          <h1 className="text-white text-center ">
            UserName: {user ? user.userName : '--'}
          </h1>
          <h1 className="text-white text-center">
            UserRoles: {userRolesLabelCreator()}
          </h1>  
      </div>
  
      {visibleButtons.usersManagement &&  (
        <Button
         label='Users Management'
         onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
         type='button'
         variant='secondary'
        />
      )}
      {visibleButtons.allLogs && (
        <Button
         label='All Logs'
         onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
         type='button'
         variant='secondary'
        />
      )}
      <Button
       label='My Logs'
       onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
       type='button'
       variant='secondary'
      />
      <hr />
      {visibleButtons.ownerPage && (
        <Button
         label="Owner Page"
         onClick={() => handleClick(PATH_DASHBOARD.owner)}
         type='button'
         variant='secondary'
        />
      )}
      {visibleButtons.adminPage && (
        <Button
         label='Admin Page'
         onClick={() => handleClick(PATH_DASHBOARD.admin)}
         type='button'
         variant='secondary'
        />
      )}
      {visibleButtons.managerPage && (
        <Button
         label="Manager Page"
         onClick={() => handleClick(PATH_DASHBOARD.manager)}
         type='button'
         variant='secondary'
        />
      )}
      {visibleButtons.userPage && (
        <Button
         label='User Page'
         onClick={() => handleClick(PATH_DASHBOARD.user)}
         type='button'
         variant='secondary'
        />
      )}
    </div>
  );
};

export default Sidebar;
