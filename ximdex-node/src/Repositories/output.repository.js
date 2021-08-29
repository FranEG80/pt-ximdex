import { getDay, getMonth, getYear } from "../Shared/date";
import { insertRow } from "./repository.local";

export const insertOutput = (message, output, pathRoot) => {
  const filename =
    typeof output === "string"
      ? output
      : `profits_output_${getYear()}${getMonth()}${getDay()}.log`;
  insertRow({ filename, pathname: pathRoot, message });
};

export const printOutput = (output) => console.log(output);
