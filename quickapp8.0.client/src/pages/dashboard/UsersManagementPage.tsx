import { useEffect, useState } from "react";
import { IAuthUser } from "../../types/auth.types";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import AuthSpinner from "../../components/general/AuthSpinner";
import UsersTableSection from "../../components/users-management/UsersTableSection";
import UserChartSection from "../../components/users-management/UserChartSection";


const UsersManagementPage = () => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      const {data} = response;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('An Error occurred. Please Contact admins');
      setLoading(false);
    }
  };

  useEffect(() =>{
    getUsersList();
  },[]);

  if (loading) {
    return(
      <div className="w-full">
        <AuthSpinner />
      </div>
    );
  }
  return (
    <div className="pageTemplate2">
      <h1 className='text-2xl font-bold'>Users Management</h1>
      <div className="grid grid-cols-1">
        <UserChartSection usersList={users}/>
      </div>
      <UsersTableSection usersList={users} />
    </div>
  );
};

export default UsersManagementPage;