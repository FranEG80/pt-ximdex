import loggerLocal from "../Logger/logger.local";
import getCSV from "../Shared/getCSV";
import getLogisticDataFromCSV from "./getLogisticDataFromCSV";

export default async function getLogisticData(origin, separator) {
  loggerLocal.info(`INIT Handler of logistic data from ${origin}`)
  const csv =  getCSV(origin, separator)
  const data = getLogisticDataFromCSV(csv)
  loggerLocal.info(`END Handler of Logistic data from ${origin}`)
  return data
}
