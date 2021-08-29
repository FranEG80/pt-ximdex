import loggerLocal, {
  setLevelTrace,
  setPersistance,
} from "./Logger/logger.local";
import { insertOutput, printOutput } from "./Repositories/output.repository";
import getCommercialData from "./Commercial/Commercial";
import getLogisticData from "./Logistic/logistic";
import { getDateString } from "./Shared/date";
import { toFixNumber } from "./Shared/utils";
import path from "path";
async function getOutput(
  logistic,
  commercial,
  persistence,
  logTrace,
  outputFile
) {
  if (persistence) setPersistance(persistence);
  if (logTrace) setLevelTrace(logTrace);
  try {
    const commercialData = await getCommercialData(commercial);
    const logisticData = await getLogisticData(logistic);

    const output = Object.keys(logisticData).map((product) => {
      let profitPerUnit =
        commercialData?.[product]?.(logisticData[product].cost) ??
        commercialData["*"](logisticData[product].cost);
      let profitsPerProduct = toFixNumber(
        profitPerUnit * logisticData[product].quantity
      );
      return `${product}: ${profitsPerProduct}`;
    });
    dispatch(output, outputFile, logistic, commercial);
  } catch (error) {
    const { message, method } = error;
    if (!message) message = error;
    loggerLocal.error(message, method);
    process.exit(1);
  }
}

const dispatch = (data, outputFile, logisticPath, commercialPath) => {
  const output = data.join("\n");
  printOutput(output);
  if (outputFile) {
    let message = `\n\PROFITS ${getDateString()} ::: Logistic File: ${logisticPath} ::: Commercial File: ${commercialPath}\n`;
    insertOutput(message, outputFile, path.join(__dirname, ".."));
    insertOutput(output, outputFile, path.join(__dirname, ".."));
  }
};

export default getOutput;
