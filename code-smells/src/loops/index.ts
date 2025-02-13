type CsvObject = {
  headers: string;
  lines: string[];
};

const convertRecordsToCsvObject = (records: Record<string, string | undefined>[]): CsvObject => {
  if (records.length === 0) {
    return {
      headers: "",
      lines: [],
    };
  }

  let headers = "";

  for (const key of Object.keys(records[0])) {
    headers += `${key},`;
  }

  headers = headers.slice(0, -1);

  const lines = [];

  for (const record of records) {
    let line = "";

    for (const value of Object.values(record)) {
      line += `${value},`;
    }

    line = line.slice(0, -1);
    lines.push(line);
  }

  return {
    headers,
    lines,
  };
};

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
