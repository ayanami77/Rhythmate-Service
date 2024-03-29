import { prisma } from "../../db/db";
import { QuestModel } from "../../model/quest/quest_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

type InputDTO = { id: string };

export const forceFinishQuestService = async (inputDTO: InputDTO) => {
  return prisma.$transaction(async (tx) => {
    const weeklyReportModel = new WeeklyReportModel();
    const questModel = new QuestModel();

    const quest = await questModel.getById(inputDTO.id);
    if (!quest) {
      throw new HttpError("指定したidのクエストが存在しません", 400);
    }
    if (quest.state === "ACTIVE") {
      throw new HttpError("すでに終了したクエストです", 400);
    }

    const forceFinishedQuest = await questModel.forceFinishByIdWithTx(inputDTO.id, tx);
    if (!forceFinishedQuest) {
      throw new HttpError("クエストの完了に失敗しました", 500);
    }

    const targetWeeklyReport = await weeklyReportModel.getByUserId(forceFinishedQuest.userId);
    if (!targetWeeklyReport) {
      throw new HttpError("指定したuserIdの週報が存在しません", 400);
    }

    // 週次レポートの更新
    const completedQuestsIncrements = 0;
    const failedQuestsIncrements = 1;
    const completedDaysIncrements = 0;

    const weeklyReport = await weeklyReportModel.updateByIdWithTx(
      targetWeeklyReport.id,
      completedQuestsIncrements,
      failedQuestsIncrements,
      completedDaysIncrements,
      targetWeeklyReport.completedQuestsEachDay,
      tx,
    );

    return {
      id: forceFinishedQuest.id,
      title: forceFinishedQuest.title,
      description: forceFinishedQuest.description,
      startsAt: forceFinishedQuest.startsAt,
      startedAt: forceFinishedQuest.startedAt,
      minutes: forceFinishedQuest.minutes,
      tagId: forceFinishedQuest.tagId,
      difficulty: forceFinishedQuest.difficulty,
      state: forceFinishedQuest.state,
      isSucceeded: forceFinishedQuest.isSucceeded,
      continuationLevel: forceFinishedQuest.continuationLevel,
      startDate: forceFinishedQuest.startDate,
      endDate: forceFinishedQuest.endDate,
      days: forceFinishedQuest.days,
      weeklyFrequency: forceFinishedQuest.weeklyFrequency,
      weeklyCompletionCount: forceFinishedQuest.weeklyCompletionCount,
      totalCompletionCount: forceFinishedQuest.totalCompletionCount,
    };
  });
};
