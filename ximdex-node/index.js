
import getOutput from './src/main';

const logistic = process.env.npm_config_logistic
const commercial = process.env.npm_config_commercial
const persistence = process.env.npm_config_persistence ? true : false
const output =  process.env.npm_config_output
  ? process.env.npm_config_output == 'true'
    ? true
    : process.env.npm_config_output
  : false
const logTrace =  process.env.npm_config_logtrace ?? false;

getOutput(logistic, commercial, persistence, logTrace, output)
