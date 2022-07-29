import { readCustomersFromCsv } from "./utils";

type CustomerRawData = {
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
};

const sendEmail = (customer: CustomerRawData) => {
  let emailMessage = "Hello " + customer.name + ",\n";
  emailMessage += "Thank you for subscribing to our newsletter!\n";
  console.log(emailMessage);
};

const sendEmails = async () => {
  const customers = await readCustomersFromCsv();

  customers
    .filter((customer) => Boolean(customer.email))
    .forEach((customer) => sendEmail(customer as CustomerRawData));
};

const displayCustomer = (customer: CustomerRawData) => {
  console.log("---\n");
  console.log(
    `Name: ${customer.name}\nEmail: ${customer.email || "None"}\nPhone: ${
      customer.phone || "None"
    }\n`
  );
};

const displayCustomers = async () => {
  const customers = await readCustomersFromCsv();

  customers.forEach((customer) => displayCustomer(customer as CustomerRawData));
};

sendEmails();
displayCustomers();
