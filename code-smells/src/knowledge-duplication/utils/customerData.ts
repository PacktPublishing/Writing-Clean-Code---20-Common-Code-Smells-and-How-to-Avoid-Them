import fs from "fs";
import path from "path";
import readline from "readline";

export const readCustomersFromCsv = async (): Promise<string[]> => {
  const fileReader = fs.createReadStream(path.resolve(__dirname + "/customerData.csv"));
  const lineReader = readline.createInterface({
    input: fileReader,
    crlfDelay: Infinity,
  });
  let lineCounter = 0;
  const customerLines: string[] = [];

  for await (const l of lineReader) {
    if (lineCounter > 0) {
      customerLines.push(l);
    }

    lineCounter++;
  }

  return customerLines;
};

export const readCustomerProperties = async (): Promise<string[]> => {
  const fileReader = fs.createReadStream(path.resolve(__dirname + "/customerData.csv"));
  const lineReader = readline.createInterface({
    input: fileReader,
    crlfDelay: Infinity,
  });
  let lineCounter = 0;
  const customerProperties: string[] = [];

  for await (const l of lineReader) {
    if (lineCounter === 0) {
      customerProperties.push(...l.split(","));
    }

    lineCounter++;
  }

  return customerProperties;
};

export const parseCustomerData = (customerLines: string[], customerProperties: string[]) => {
  const customers = [];

  for (const line of customerLines) {
    const customer: { [index: string]: string | undefined } = {};
    const customerData = line.split(",");

    for (let i = 0; i < customerProperties.length; i++) {
      customer[customerProperties[i]] = Boolean(customerData[i]) ? customerData[i] : undefined;
    }

    customers.push(customer);
  }

  return customers;
};
