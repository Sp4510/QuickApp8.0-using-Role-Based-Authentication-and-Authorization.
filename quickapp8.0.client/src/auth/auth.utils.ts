import { IAuthUser, RolesEnum } from '../types/auth.types';
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
  
export const getSession = () => {
  return localStorage.getItem('accessToken');
};
  
export const allAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER];
export const ownerAccessRoles = [RolesEnum.OWNER];
export const adminAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN];
export const managerAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.MANAGER];

  
  
// We need to specify which Roles can be updated by Logged-in user
export const allowedRolesForUpdateArray = (loggedInUser?: IAuthUser): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.OWNER)
  ? [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER]
  : [RolesEnum.MANAGER, RolesEnum.USER];
};
  
  // Owner not change owner role
  // Admin not change owner role and admin role
export const isAuthorizedForUpdateRole = (loggedInUserRole: string, selectedUserRole: string) => {
  let result = true;
  if (loggedInUserRole === RolesEnum.OWNER && selectedUserRole === RolesEnum.OWNER) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.OWNER || selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.MANAGER &&
    (selectedUserRole === RolesEnum.OWNER || selectedUserRole === RolesEnum.ADMIN || selectedUserRole === RolesEnum.MANAGER || selectedUserRole === RolesEnum.USER)
  ) {
    result = false;
  }

  return result;
};
// Owner not delete Owner role
// Admin not delete Owner role and Admin role
export const isAuthorizedForDeleteRole = (loggedInUserRole: string, selectedUserRole: string) => {
  let result = true;
  if (loggedInUserRole === RolesEnum.OWNER && selectedUserRole === RolesEnum.OWNER) {
    result = false;
  } else if (loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.OWNER || selectedUserRole === RolesEnum.ADMIN)
  ){
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.MANAGER &&
    (selectedUserRole === RolesEnum.OWNER || selectedUserRole === RolesEnum.ADMIN || selectedUserRole === RolesEnum.MANAGER || selectedUserRole === RolesEnum.USER)
  ){
    result = false;
  }
  return result;
};