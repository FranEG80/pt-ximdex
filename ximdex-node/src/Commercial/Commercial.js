import loggerLocal from "../Logger/logger.local";
import getJson from "../Shared/getJson";
import getFormules from "./getFormules";

export default async function getCommercialData(origin) {
  loggerLocal.info(`INIT Handler of commercial data from ${origin}`);
  try {
    const { categories } = await getJson(origin);
    const profitsFormules = getFormules(categories);
    loggerLocal.info(`END Handler of commercial data from ${origin}`);
    return profitsFormules;
  } catch (error) {
    let _error = { message: error.message, method: "getCommercialData" };
    throw Error(JSON.stringify(_error));
  }
}
