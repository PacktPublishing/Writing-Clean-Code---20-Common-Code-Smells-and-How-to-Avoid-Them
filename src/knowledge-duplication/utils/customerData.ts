import fs from "fs";
import path from "path";
import readline from "readline";

export const readCustomersFromCsv = async (): Promise<Record<string, string | undefined>[]> => {
  const fileReader = fs.createReadStream(path.resolve(__dirname + "/customerData.csv"));
  const lineReader = readline.createInterface({
    input: fileReader,
    crlfDelay: Infinity,
  });
  let lineCounter = 0;
  const customerEntries: string[] = [];
  const customerProperties = [];

  for await (const l of lineReader) {
    if (lineCounter === 0) {
      customerProperties.push(...l.split(","));
    } else {
      customerEntries.push(l);
    }

    lineCounter++;
  }

  const customers = [];

  for (const entry of customerEntries) {
    const customer: { [index: string]: string | undefined } = {};
    const customerData = entry.split(",");

    for (let i = 0; i < customerProperties.length; i++) {
      customer[customerProperties[i]] = Boolean(customerData[i]) ? customerData[i] : undefined;
    }

    customers.push(customer);
  }

  return customers;
};
