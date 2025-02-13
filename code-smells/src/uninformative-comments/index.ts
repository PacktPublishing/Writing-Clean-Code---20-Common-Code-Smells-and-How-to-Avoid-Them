import fs from "fs";
import path from "path";
import readline from "readline";

const fetchCustomers = async () => {
  // Creates file and line readers
  const fileReader = fs.createReadStream(path.resolve(__dirname + "/utils/customerData.csv"));
  const lineReader = readline.createInterface({
    input: fileReader,
    crlfDelay: Infinity,
  });
  let lineNumber = 0;
  // Initializes the customer properties and customers arrays
  const customerProperties: string[] = [];
  const customers = [];

  // Iterates over the lines of the csv file and adds the individual customers to the customers array.
  for await (const line of lineReader) {
    if (lineNumber === 0) {
      customerProperties.push(...line.split(","));
    } else {
      const customer: Record<string, string | undefined> = {};
      const customerData = line.split(",");

      for (let i = 0; i < customerProperties.length; i++) {
        customer[customerProperties[i]] = Boolean(customerData[i]) ? customerData[i] : undefined;
      }

      customers.push(customer);
    }

    lineNumber++;
  }

  return customers;
};

// Fetches and prints the customers on the screen
fetchCustomers().then((res) => console.log(res));
