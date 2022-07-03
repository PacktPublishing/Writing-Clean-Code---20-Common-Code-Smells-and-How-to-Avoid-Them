type Customer = {
  name: string;
  email?: string;
};

const loadCustomers = (): Customer[] => {
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

const sanitizeCustomers = (customers: Customer[]) => {
  customers
    .filter((customer) => !Boolean(customer.email))
    .forEach((customer) => (customer.email = "None"));
};

const sendEmails = (customers: Customer[]) => {
  customers
    .filter((customer) => Boolean(customer.email))
    .forEach((customer) => console.log(`E-mail sent to ${customer.name} : ${customer.email}`));
};

const customers = loadCustomers();

// What happens when we uncomment the following line?
// sanitizeCustomers(customers);

sendEmails(customers);

export {};
