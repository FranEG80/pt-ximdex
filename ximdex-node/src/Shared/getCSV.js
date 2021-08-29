import csv from "csv-parser";
import fs from "fs";
import { SEPARATOR_DEFAULT } from "../config/constants";


export default function getCSV(origin, separator) {
  if (!separator) separator = SEPARATOR_DEFAULT
  return fs.createReadStream(origin).pipe(csv({ separator }))
}
