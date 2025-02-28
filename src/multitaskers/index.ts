import fs from "fs";
import path from "path";
import readline from "readline";

const readCustomersFromCsv = async (relativePath: string) => {
  const fileReader = fs.createReadStream(path.resolve(__dirname + relativePath));
  const lineReader = readline.createInterface({
    input: fileReader,
    crlfDelay: Infinity,
  });
  let lineNumber = 0;
  const customerProperties: string[] = [];
  const customers = [];

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

const hasEmail = (customer: Record<string, string | undefined>) => Boolean(customer.email);

const sendEmailToCustomer = (customer: Record<string, string | undefined>) => {
  let emailMessage = "Hello " + customer.name + ",\n";
  emailMessage += "Thank you for subscribing to our newsletter!\n";

  console.log(emailMessage);
};

const sendEmails = async () => {
  const customers = await readCustomersFromCsv("/utils/customerData.csv");

  customers.filter(hasEmail).forEach(sendEmailToCustomer);
};

sendEmails();
