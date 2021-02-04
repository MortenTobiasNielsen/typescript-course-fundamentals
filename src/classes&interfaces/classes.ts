abstract class Department {
  //   private readonly id: string;
  //   private name: string;
  //   private employees: string[] = [];

  constructor(
    protected readonly id: string, // readonly can be used to ensure that it is never changed
    public name: string,
    private employees: string[]
  ) {
    // you can cut away the repetition buy using this syntax.
    // this.name = n;
    // this.id = id;
    // this employees = employees;
  }

  // Dummy example of a static method
  static createEmployee(name: string) {
    return { name: name };
  }

  // This will force all classes extending this class to implement this function
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  changeId() {
    //   this.id = 2; // This will fail due to readonly
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const employee = Department.createEmployee("Morten");
console.log(employee);

// // This can not be done on an abstract class
// const accounting = new Department("1", "Accounting", ["Morten", "Bolette"]);

// console.log(accounting);

// accounting.describe();

// accounting.addEmployee("Morten");
// accounting.addEmployee("Bolette");

// // accounting.employees[2] = "Test"; // You should not allow things like this

// accounting.describe();
// accounting.printEmployeeInformation();

// const accountingCopy = { name: "Dummy data", describe: accounting.describe };

// // accountingCopy.describe(); // This will only work if the object has all the right properties

class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, "IT", []); // Should always be set as the first thing
  }

  printAdmins() {
    console.log(this.admins);
  }

  describe() {
    console.log("IT Department ID: " + this.id);
  }
}

const IT = new ITDepartment("2", ["Morten"]);
console.log(IT);
IT.printAdmins();

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    // You can have the same name for getters and setters
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.lastReport = value;
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting", []); // Should always be set as the first thing
    this.lastReport = reports[0];
  }

  describe() {
    console.log("Accounting Department ID: " + this.id);
  }

  // This will overwrite the method in the parent class
  addEmployee(name: string) {
    if (name === "Morten") {
      return;
    }

    // This will not work given that the property is private
    // But it can be made available if private is changed to protected
    //   this.employees(name);
  }

  printReports() {
    console.log(this.reports);
  }
}

const NewAccountingDepartment = new AccountingDepartment("3", [
  "Analytics report",
]);

NewAccountingDepartment.printReports();

// These will cause errors
// NewAccountingDepartment.mostRecentReport = "";
// console.log(NewAccountingDepartment.mostRecentReport);

NewAccountingDepartment.mostRecentReport = "Business Report";
console.log(NewAccountingDepartment.mostRecentReport); // Now the last report will be Business Report

// Example of a singleton
class AnalyticsDepartment extends Department {
  private static instance: AnalyticsDepartment;

  private constructor(id: string, private Analyses: string[]) {
    super(id, "Analytics", []); // Should always be set as the first thing
  }

  get allAnalyses() {
    return this.Analyses;
  }

  // There can only be one instance of AnalyticsDepartment
  static getInstance() {
    if (AnalyticsDepartment.instance) {
      return this.instance;
    }

    this.instance = new AnalyticsDepartment("3", ["Stock Analysis"]);
    return this.instance;
  }

  describe() {
    console.log("IT Department ID: " + this.id);
  }
}

// This will be the same object
const Analytics1 = AnalyticsDepartment.getInstance();
const Analytics2 = AnalyticsDepartment.getInstance();

console.log(Analytics1, Analytics2);
