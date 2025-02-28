type CustomerRawData = {
  name: string;
  email?: string;
  phones?: string[];
};

const loadCustomers = (): CustomerRawData[] => {
  return [
    {
      name: "John",
      email: "john@example.com",
    },
    {
      name: "Alice",
      email: "alice@example.com",
    },
    {
      name: "Jane",
    },
    {
      name: "Arthur",
      email: "arthur@example.com",
    },
  ];
};

const sanitizeCustomers = (customers: CustomerRawData[]): CustomerRawData[] => {
  return customers.map((customer) => ({ ...customer, email: customer.email || "None" }));
};

const sendEmails = (customers: CustomerRawData[]) => {
  customers
    .filter((customer) => Boolean(customer.email))
    .forEach((customer) => console.log(`E-mail sent to ${customer.name} : ${customer.email}`));
};

const customers = loadCustomers();

// What happens when we uncomment the following line?
const sanitizedCustomers = sanitizeCustomers(customers);

sendEmails(sanitizedCustomers);

export {};
