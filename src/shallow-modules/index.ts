import fs from "fs";
import path from "path";
import readline from "readline";

type CsvObject = {
  headers: string;
  lines: string[];
};

interface ICsvDataStore {
  readRecordsFromFile: (filePath: string) => Promise<Record<string, string>[]>;
  saveRecordsToFile: (records: Record<string, string>[], filePath: string) => void;
}

class CsvDataStore implements ICsvDataStore {
  async readRecordsFromFile(filePath: string) {
    const readLineInterface = this.openCsvFile(filePath);
    const csvObject = await this.parseCsvFromFile(readLineInterface);
    return this.parseCsvObject(csvObject);
  }

  saveRecordsToFile(records: Record<string, string>[], filePath: string) {
    const csvObject = this.convertRecordsToCsvObject(records);
    return this.saveCsvObjectToFile(csvObject, filePath);
  }

  private openCsvFile(filePath: string): readline.Interface {
    const fileReader = fs.createReadStream(path.resolve(__dirname + filePath));
    return readline.createInterface({
      input: fileReader,
      crlfDelay: Infinity,
    });
  }

  private async parseCsvFromFile(fileInterface: readline.Interface): Promise<CsvObject> {
    let lineCounter = 0;
    let result: CsvObject = {
      headers: "",
      lines: [],
    };

    for await (const line of fileInterface) {
      if (lineCounter === 0) {
        result.headers = line;
      } else {
        result.lines.push(line);
      }

      lineCounter++;
    }

    return result;
  }

  private parseCsvObject(csvObject: CsvObject): Record<string, string>[] {
    const objProperties = csvObject.headers.split(",");
    const records = [];

    for (const line of csvObject.lines) {
      const data = line.split(",");
      const result: { [index: string]: string } = {};

      for (let i = 0; i < objProperties.length; i++) {
        result[objProperties[i]] = Boolean(data[i]) ? data[i] : "";
      }

      records.push(result);
    }

    return records;
  }

  private convertRecordsToCsvObject(records: Record<string, string>[]): CsvObject {
    if (records.length === 0) {
      return {
        headers: "",
        lines: [],
      };
    }
    return {
      headers: Object.keys(records[0]).join(","),
      lines: records.map((record) => Object.values(record).join(",")),
    };
  }

  private saveCsvObjectToFile(csvObject: CsvObject, filePath: string): void {
    const fileWriter = fs.createWriteStream(path.resolve(__dirname + "/" + filePath));

    fileWriter.write(csvObject.headers + "\n");
    fileWriter.write(csvObject.lines.reduce((prev, curr) => `${prev}${curr}\n`, ""));

    fileWriter.close();
  }
}

const csvStore = new CsvDataStore();

csvStore.saveRecordsToFile(
  [
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
  ],
  "customers.csv"
);

export {};
