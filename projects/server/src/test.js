import { format, endOfDay, startOfDay } from "date-fns";
import moment from "moment";

const endDate = "Sun Jul 16 2023 00:00:00 GMT+0700 (Waktu Indochina)";
const endOfDayUTC = endOfDay(endDate);
const endDatePlus7HoursAnd1Second = moment(endOfDayUTC).add({
  hours: 8,
  seconds: 3,
});
formattedEndDate = moment(
  endDatePlus7HoursAnd1Second.format("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
);
console.log(formattedEndDate);
