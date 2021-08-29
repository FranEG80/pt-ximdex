import { DEFAULT_TRACE, TRACE } from "../config/constants";
import { getDateString } from "../Shared/date"
import { insertLog } from './logger.repository';

let _trace = DEFAULT_TRACE
let _persistance = false;

const LOGGER_LEVEL = {
  [TRACE.VERBOSE]:  (message, type) => dispatch(message),
  [TRACE.INFO]: (message, type) => {
    if (type === TRACE.INFO) dispatch(message)
  },
  [TRACE.DEBUG]: (message, type) => {
    if (type === TRACE.DEBUG) dispatch(message)
  },
  [TRACE.ERROR]: (message, type) => {
    if (type === TRACE.ERROR) dispatch(message)
  }
}

const templateMessage = (message, type, method) => `[${getDateString()}] ::: ${type} ::: ${method ? `METHOD '${method}' ::: ` : ''}${JSON.stringify(message)} \n`

const logger = (message, type, method) => {
  let traceMessage = templateMessage(message, type, method)
  return LOGGER_LEVEL[_trace] ? LOGGER_LEVEL[_trace](traceMessage, type) : LOGGER_LEVEL[DEFAULT_TRACE](traceMessage, type)
}

const dispatch = message => {
  if (_persistance) return insertLog(message)
  console.log(message)
}

export const setLevelTrace = level => _trace = level
export const setPersistance = value => _persistance = value

const info = (message, method) => logger(message, TRACE.INFO, method)
const debug = (message, method) => logger(message, TRACE.DEBUG, method)
const error = (message, method) => logger(message, TRACE.ERROR, method)

export default { info, debug, error }

