import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/user/user";

export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const addUserAction = createAction<User>(ADD_USER);
export const editUserAction = createAction<User>(EDIT_USER);
export const deleteUserAction = createAction<number>(DELETE_USER);