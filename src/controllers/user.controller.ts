import { Request, Response } from "express";
import {
  TUserPartialRequest,
  TUserRequest,
  TUserResponse,
} from "../interfaces/user.interfaces";
import createUserService from "../services/user/createUser.service";
import getAllUsersService from "../services/user/getAllUsers.service";
import getUserProfileService from "../services/user/getUserProfile.service";
import updateUserService from "../services/user/updateUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import activeUserService from "../services/user/activeUser.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser: TUserResponse = await createUserService(userData);
  return res.status(201).json(newUser);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers = await getAllUsersService();
  return res.status(200).json(allUsers);
};

const getUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.token.id;
  const user = await getUserProfileService(userId);
  return res.status(200).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserPartialRequest = req.body;
  const userId: number = Number(req.params.id);
  const newUser: TUserResponse = await updateUserService(userData, userId);
  return res.status(200).json(newUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  await deleteUserService(userId);
  return res.status(204).send();
};

const activeUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const newUser = await activeUserService(userId);
  return res.status(200).json(newUser);
};

export {
  createUserController,
  getAllUsersController,
  getUserProfileController,
  updateUserController,
  deleteUserController,
  activeUserController,
};
