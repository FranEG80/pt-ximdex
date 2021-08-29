import { getDay, getMonth, getYear } from "../Shared/date";
import { insertRow } from "./../Repositories/repository.local";
import path from "path";

export const insertLog = (message) => {
  const pathname = path.join(__dirname, "../logs");
  const filename = `profits_logs_${getYear()}${getMonth()}${getDay()}.log`;
  insertRow({ filename, pathname, message });
};
