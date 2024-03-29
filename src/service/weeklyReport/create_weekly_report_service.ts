import { prisma } from "../../db/db";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

export const createWeeklyReportService = async (inputDTO: {
  completedQuests: number;
  failedQuests: number;
  completedDays: number;
  completedQuestsEachDay: number[];
  startDate: Date;
  endDate: Date;
  userId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    const model = new WeeklyReportModel();

    const weeklyReport = await model.createWithTx(
      inputDTO.completedQuests,
      inputDTO.failedQuests,
      inputDTO.completedDays,
      inputDTO.completedQuestsEachDay,
      inputDTO.userId,
      tx,
    );
    if (weeklyReport === null) {
      throw new HttpError("週次レポートの作成に失敗しました", 500);
    }

    return {
      id: weeklyReport.id,
      completedQuests: weeklyReport.completedQuests,
      failedQuests: weeklyReport.failedQuests,
      completedPercentage: weeklyReport.completedPercentage,
      completedDays: weeklyReport.completedDays,
      completedQuestsEachDay: weeklyReport.completedQuestsEachDay,
      startDate: weeklyReport.startDate,
      endDate: weeklyReport.endDate,
      userId: weeklyReport.userId,
    };
  });
};
