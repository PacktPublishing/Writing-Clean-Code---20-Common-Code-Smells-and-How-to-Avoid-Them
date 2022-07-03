import fs from "fs";
import path from "path";
import readline from "readline";

const sendEmails = async () => {
  const fileReader = fs.createReadStream(path.resolve(__dirname + "/utils/customerData.csv"));
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

  const customersWithEmail = customers.filter((cust) => Boolean(cust.email));

  for (let i = 0; i < customersWithEmail.length; i++) {
    let emailMessage = "Hello " + customersWithEmail[i].name + ",\n";
    emailMessage += "Thank you for subscribing to our newsletter!\n";

    console.log(emailMessage);
  }
};

sendEmails();
