import { QuestModel } from "../../model/quest/quest_model";
import { UserModel } from "../../model/user/user_model";
import { WeeklyReportModel } from "../../model/weeklyReport/weekly_report_model";
import { HttpError } from "../../pkg/httpError";

const getQuestExp = (difficulty: string, continuationLevel: number) => {
  const baseExp = difficulty === "EASY" ? 10 : difficulty === "NORMAL" ? 20 : difficulty === "HARD" ? 30 : 0;
  return baseExp * continuationLevel;
};

type InputDTO = { id: string; userId: string };

export const finishQuestService = async (inputDTO: InputDTO) => {
  const questModel = new QuestModel();
  const userModel = new UserModel();
  const weeklyReportModel = new WeeklyReportModel();
  const quest = await questModel.getById(inputDTO.id);
  if (!quest) {
    throw new HttpError("指定したidのクエストが存在しません", 400);
  }
  if (quest.state === "ACTIVE") {
    throw new HttpError("すでに終了したクエストです", 400);
  }

  const finishedQuest = await questModel.finishById(inputDTO.id, quest.continuationLevel);
  if (!finishedQuest) {
    throw new HttpError("クエストの完了に失敗しました", 500);
  }
  const targetWeeklyReport = await weeklyReportModel.getByUserId(finishedQuest.userId);
  if (!targetWeeklyReport) {
    throw new HttpError("指定したuserIdの週報が存在しません", 400);
  }

  const index = (new Date().getDay() + 6) % 7; // 0: 月曜日, 1: 火曜日...
  targetWeeklyReport.completedQuestsEachDay[index] += 1;

  //完了したクエスト数とその日の完了クエスト数をインクリメント
  const weeklyReport = await weeklyReportModel.updateById(
    targetWeeklyReport.id,
    1,
    0,
    0,
    targetWeeklyReport.completedQuestsEachDay,
  );
  if (!weeklyReport) {
    throw new HttpError("週報の更新に失敗しました", 500);
  }

  //ユーザーの経験値とレベルを更新
  const user = await userModel.getById(finishedQuest.userId);
  if (!user) {
    throw new HttpError("ユーザーが見つかりません", 400);
  }
  const expIncrement = getQuestExp(finishedQuest.difficulty, finishedQuest.continuationLevel);
  const updatedUser = await userModel.updateExp(finishedQuest.userId, user.exp, expIncrement);
  if (!updatedUser) {
    throw new HttpError("ユーザーの経験値の更新に失敗しました", 500);
  }
  return {
    id: finishedQuest.id,
    title: finishedQuest.title,
    description: finishedQuest.description,
    startsAt: finishedQuest.startsAt,
    startedAt: finishedQuest.startedAt,
    minutes: finishedQuest.minutes,
    tagId: finishedQuest.tagId,
    difficulty: finishedQuest.difficulty,
    state: finishedQuest.state,
    isSucceeded: finishedQuest.isSucceeded,
    continuationLevel: finishedQuest.continuationLevel,
    startDate: finishedQuest.startDate,
    endDate: finishedQuest.endDate,
    days: finishedQuest.days,
    weeklyFrequency: finishedQuest.weeklyFrequency,
    weeklyCompletionCount: finishedQuest.weeklyCompletionCount,
    totalCompletionCount: finishedQuest.totalCompletionCount,
  };
};
