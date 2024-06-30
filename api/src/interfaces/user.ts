import { $Enums, User } from "@prisma/client";

export interface IUser extends User {}

export type IUserRoles = $Enums.Role;
