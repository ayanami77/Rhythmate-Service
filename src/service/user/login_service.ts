import { UserModel } from "../../model/user/user_model";
import bcrypt from "bcrypt";
import { HttpError } from "../../pkg/httpError";

export const loginService = async (inputDTO: { email: string; password: string }) => {
  const userModel = new UserModel();

  const user = await userModel.getByEmail(inputDTO.email);
  if (!user) {
    throw new HttpError("メールアドレスかパスワードが間違っています。", 400);
  }

  const compared = await bcrypt.compare(inputDTO.password, user.passwordHash);

  if (!compared) {
    throw new HttpError("メールアドレスかパスワードが間違っています。", 400);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    level: user.email,
  };
};
