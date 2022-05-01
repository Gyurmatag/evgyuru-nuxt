import dayjs from "dayjs";

const dateIntervalFormat = (dateFrom: string, dateTo: string) => {
  return `${dayjs(dateFrom).format("YYYY.MM.DD.")} - ${dayjs(dateTo).format(
    "YYYY.MM.DD."
  )}`;
};

export default ({ _ }, inject) => {
  inject("dateIntervalFormat", dateIntervalFormat);
};
