import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employees from "./employee.json";


describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });

  employees.forEach((item)=>{  
    test("Can add and delete an employee", async () => {
    await page.addEmployee(item);
    let employee = await page.getCurrentEmployee();
    expect(employee.name).toEqual(item.name);
    expect(employee.phone).toEqual(item.phone);
    expect(employee.email).toEqual(item.email);
    expect(employee.title).toEqual(item.title);
    await page.deleteEmployee(item.name);
    let employeeList = await page.getEmployeeList();
    expect(employeeList).not.toContain(item.name);
  });

  })
  
  test("Can add,search and take screenshot of an employee", async () => {
    let newEmployee = {
      name: "Mahsa",
      phone: 5555555555,
      email: "mahsa@email.com",
      title: "Screenshot",
    };
    
    // Add a new employee
    await page.addEmployee(newEmployee);
    let employee = await page.getCurrentEmployee();
    expect(employee.name).toEqual(newEmployee.name);
    expect(employee.phone).toEqual(newEmployee.phone);
    expect(employee.email).toEqual(newEmployee.email);
    expect(employee.title).toEqual(newEmployee.title);
    let employeeList = await page.getEmployeeList();
    // search for employee:
    await page.searchFor("Screenshot");
    let resultList = await page.getEmployeeList();
    expect(employeeList.length).toBeGreaterThanOrEqual(resultList.length);
    //  take screenshot of employee
    await page.takeScreenshot("screenshot/Mahsapic");
  });

 
      

});
