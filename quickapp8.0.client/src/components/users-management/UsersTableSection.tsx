import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hooks";
import { IAuthUser, RolesEnum } from "../../types/auth.types";
import Button from "../general/Button";
import { isAuthorizedForDeleteRole, isAuthorizedForUpdateRole } from "../../auth/auth.utils";
import { useState } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { PATH_PUBLIC } from "../../routes/Paths";
import axiosInstance from "../../utils/axiosInstance";
import { DELETE_ROLE_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";

interface IProps {
    usersList: IAuthUser[];
}

const UsersTableSection = ({usersList}:IProps) => {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const RoleClassNameCreator = (Roles:string[]) => {
    let className = "px-3 py-1 text-white rounded-3xl";
    if (Roles.includes(RolesEnum.OWNER)) {
        className += " bg-gray-400";
    } else if (Roles.includes(RolesEnum.ADMIN)) {
        className += " bg-blue-500";
    } else if (Roles.includes(RolesEnum.MANAGER)) {
        className += " bg-blue-400";
    } else if (Roles.includes(RolesEnum.USER)) {
        className += " bg-blue-300";
    }
    return className;
  };

  const handleDelete = (id: any) => {
    axiosInstance.delete(`${DELETE_ROLE_URL}/${id}`)
    .then((response) => navigate(`/dashboard/uers-management`))
    .catch((error) => toast.error("Failed to delete user"))
    toast.success("User has been deleted successfully..");
  };
  
  return (
    <div className="bg-white p-2 rounded-md">
        <div className="flex justify-between items-center">
            <div className="relative">
                <input 
                 type="text"
                 className="text-[#000] border-1 border-[#000] hover:shadow-[0_0_5px_2px_#000] w-96 h-7 pl-10 pr-2 rounded-2xl duration-200" 
                 placeholder="Search Username..."
                 onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute top-0 bottom-0 flex items-center pl-3">
                    <FaSearch className="text-gray-400"/>
                </div>
            </div>

            <h1 className="flex">
                <Link
                 className="text-[#000] border-1 border-[#000] hover:shadow-[0_0_5px_2px_#000] px-3 rounded-2xl h-7 duration-200"
                 to={PATH_PUBLIC.register}
                >
                    <div className="flex items-center text-xl font-bold">
                        <FaUserPlus className="text-2xl" />
                        <span>New User</span>
                    </div>
                </Link>
            </h1>
        </div>
        <div className="grid grid-cols-6 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
            <div>No</div>
            <div>Username</div>
            <div>Email</div>
            <div className="flex justify-center">Roles</div>
            <div className="flex justify-center">Operations</div>
            <div className="flex justify-center">Actions</div>
        </div>

        {usersList.filter((usersList) => {
            return search.toLowerCase() === ""
            ? usersList 
            : usersList.userName.toLowerCase().includes(search.toLowerCase());
        }).map((user, index) => (
            <div key={index} className="grid grid-cols-6 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200">
                <div className="flex items-center">{index + 1}</div>
                <div className="flex items-center font-semibold">{user.userName}</div>
                <div className="flex items-center font-semibold">{user.email}</div>
                <div className="flex justify-center items-center">
                    <span className={RoleClassNameCreator(user.roles)}>{user.roles}</span>
                </div>
                <div className="flex justify-center items-center">
                    <Button
                     type="button"
                     label="Update"
                     variant="secondary"
                     onClick={() => navigate(`/dashboard/update-role/${user.userName}`)}
                     disabled={ !isAuthorizedForUpdateRole(loggedInUser!.roles[0],user.roles[0])}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <Button
                     label="Delete"
                     onClick={() => handleDelete(user.id)}
                     type="button"
                     variant="danger"
                     disabled={!isAuthorizedForDeleteRole(loggedInUser!.roles[0],user.roles[0])}
                    />
                </div>
            </div>
        ))}
    </div>
  );
};

export default UsersTableSection;