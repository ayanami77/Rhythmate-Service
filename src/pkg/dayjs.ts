import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export const now = () => {
  return dayjs().format();
};

export const formatDateTime = (dateTimeString: string) => {
  return dayjs(dateTimeString).format("YYYY-MM-DD HH:mm:ss");
};

export const formatDateTimeWithAddMinutes = (dateTimeString: string, minutes: number) => {
  return dayjs(dateTimeString).add(minutes, "m").format("YYYY-MM-DD HH:mm:ss");
};

export const formatDateTimeWithSubtractMinutes = (dateTimeString: string, minutes: number) => {
  return dayjs(dateTimeString).subtract(minutes, "m").format("YYYY-MM-DD HH:mm:ss");
};

export const formatDateTimeOnlyTime = (dateTimeString: string) => {
  return dayjs(dateTimeString).format("HH:mm");
};

export const formatDateInJapanese = (dateTimeString: string) => {
  return dayjs(dateTimeString).format("YYYY年MM月DD日");
};

export const getDayOfWeek = () => {
  return dayjs().format("ddd");
};
