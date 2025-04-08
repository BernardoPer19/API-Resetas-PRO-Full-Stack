import { loginUser, registerRequest } from "../api/Auth";
import { UserLoginType, UserType } from "../types/UserType";
import handleError from "./ErrorServices";

export const registerService = async (user: UserType): Promise<UserType> => {
  try {
    const result = await registerRequest(user);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw handleError(error);
  }
};

export const loginService = async (user: UserLoginType): Promise<UserType> => {
  try {
    const result = await loginUser(user);

    return result;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw handleError(error);
  }
};
