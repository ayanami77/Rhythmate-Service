export type WeeklyReport = {
  id: string;
  completedQuests: number;
  failedQuests: number;
  completedPercentage: number;
  streakDays: number;
  completedQuestsEachDay: number[];
  failedQuestsEachDay: number[];
  feedBack: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
