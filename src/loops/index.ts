type CsvObject = {
  headers: string;
  lines: string[];
};

const customer: Record<string, string | undefined> = {
  firstName: "Lauro",
  lastName: "Fialho Müller",
  middleName: undefined,
};

const convertRecordsToCsvObject = (records: Record<string, string | undefined>[]): CsvObject => ({
  headers: Object.keys(records[0] || {}).join(","),
  lines: records.map((record) => Object.values(record).join(",")),
});

console.log(convertRecordsToCsvObject([]));
console.log(
  convertRecordsToCsvObject([
    {
      name: "John",
      dateOfBirth: "1990-01-01",
      email: "john@example.com",
    },
    {
      name: "Jane",
      dateOfBirth: "1992-01-01",
      email: "jane@example.com",
    },
  ])
);

export {};
