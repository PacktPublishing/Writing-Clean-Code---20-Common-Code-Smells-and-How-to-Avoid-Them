import { parseCustomerData, readCustomerProperties, readCustomersFromCsv } from "./utils";

const sendEmails = async () => {
  const customerLines = await readCustomersFromCsv();
  const customerProperties = await readCustomerProperties();
  const customers = parseCustomerData(customerLines, customerProperties);

  for (const customer of customers) {
    if (Boolean(customer.email)) {
      let emailMessage = "Hello " + customer.name + ",\n";
      emailMessage += "Thank you for subscribing to our newsletter!\n";

      console.log(emailMessage);
    }
  }
};

const displayCustomers = async () => {
  const customerLines = await readCustomersFromCsv();
  const customerProperties = await readCustomerProperties();
  const customers = parseCustomerData(customerLines, customerProperties);

  for (const customer of customers) {
    console.log("---\n");
    console.log(
      `Name: ${customer.name}\nEmail: ${customer.email || "None"}\nPhone: ${
        customer.phone || "None"
      }\n`
    );
  }
};

sendEmails();
displayCustomers();
