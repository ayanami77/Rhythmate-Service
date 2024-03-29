import { admin } from "../../firebase/config";
import { prisma } from "../../db/db";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id_token: string };

export const authService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const userModel = new UserModel();
    const weeklyReportModel = new WeeklyReportModel();

    // id_tokenを検証する
    const decodeValue = await admin.auth().verifyIdToken(inputDTO.id_token);
    if (!decodeValue) {
      throw new HttpError("認証に失敗しました。", 401);
    }

    const verifiedUser = await admin.auth().getUser(decodeValue.uid);
    const name = verifiedUser.displayName;
    const email = verifiedUser.email;
    if (!name || !email) {
      throw new HttpError("認証に失敗しました。", 401);
    }

    const user = await userModel.getByEmail(email);
    if (user) {
      return {
        id: user.id,
        email: user.email,
      };
    }

    const newUser = await userModel.createWithTx(name, email, tx);
    const newWeeklyReport = await weeklyReportModel.createWithTx(0, 0, 0, [0, 0, 0, 0, 0, 0, 0], newUser.id, tx);

    return {
      id: newUser.id,
      email: newUser.email,
    };
  });
};
