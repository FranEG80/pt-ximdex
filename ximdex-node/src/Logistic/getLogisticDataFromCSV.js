
import { CURRENCY_DEFAULT, INITIAL_ROW } from '../config/constants';
import { parseQuantity, parseCurrency } from '../Shared/utils';


const getLogisticDataFromCSV = csv => {
  let products = {}
  let line = INITIAL_ROW;
  
  return new Promise((resolve, reject) => {
    const handleErrors = (error) => reject({message: error, method: 'getLogisticDataFromCSV' })
    csv
      .on("data", row => {
        const { category, data } = parseRowData(row, line)
        if (!data) {
          csv.destroy(`Fail parse cost number, check the row '${line}' in ${origin}`, handleErrors)
        }
        
        products[category] = {
          quantity: (products?.[category]?.quantity ?? 0) + data.quantity,
          cost: data.cost,
          currency: data.currency
        }
        line += 1
      })
      .on("end", () => resolve(products))
      .on("error", handleErrors);
  })
}

const parseRowData = row => {
  const currency = CURRENCY_DEFAULT
  const { COST, CATEGORY, QUANTITY } = row
  let output = { category: CATEGORY , data: false}
  const cost = parseCurrency(COST, currency)
  if (!isNaN(cost)) {
    output.data = {
      quantity: parseQuantity(QUANTITY),
      cost,
      currency
    }
  }
  return output
}

export default getLogisticDataFromCSV