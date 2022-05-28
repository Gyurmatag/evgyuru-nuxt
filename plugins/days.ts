import dayjs from "dayjs";

const commonDateFormat = (date: Date) => {
  return `${dayjs(date).format("YYYY.MM.DD.")}`;
};

const dateIntervalFormat = (dateFrom: string, dateTo: string) => {
  return `${dayjs(dateFrom).format("YYYY.MM.DD.")} - ${dayjs(dateTo).format(
    "YYYY.MM.DD."
  )}`;
};

export default ({ _ }, inject) => {
  inject("dateIntervalFormat", dateIntervalFormat);
  inject("commonDateFormat", commonDateFormat);
};
