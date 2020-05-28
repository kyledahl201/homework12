const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");




// start with an init

init();

function init() {


    const logoText = logo({ name: "EMployee Manager" }).render();

    console.log(logoText);

    loadMainPrompts();


}


async function loadMainPrompts() {
    const { choice } = await prompt([

            {


                type: "list",
                name: "choice",
                message: "Select an action",
                choices: [
                  {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                  },
                  {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                  },
                  {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                  },
                  {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                  },
                  {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                  },
                  {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                  },
                  {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                  },
                  {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                  },
                  {
                    name: "Add Role",
                    value: "ADD_ROLE"
                  },
                  {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                  },
                  {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                  },
                  {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                  },
                  {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                  },
                  {
                    name: "Quit",
                    value: "QUIT"
                  }]








            }



    ]);




//call a function based on the action selected 

switch (choice) {

    case "VIEW_EMPLOYEES":

    return viewEmployees();
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
         
      return viewEmployeesByDepartment();
    
      case "VIEW_EMPLOYEES_BY_MANAGER":
        
      return viewEmployeesByManager();
    
      case "ADD_EMPLOYEE":
        
      return addEmployee();
    
      case "REMOVE_EMPLOYEE":
        
      return removeEmployee();
    
      case "UPDATE_EMPLOYEE_ROLE":
        
      return updateEmployeeRole();
    
      case "UPDATE_EMPLOYEE_MANAGER":
          
    return updateEmployeeManager();
    
    case "VIEW_DEPARTMENTS":
        
    return viewDepartments();
    
    case "ADD_DEPARTMENT":
        
    return addDepartment();
       
    case "REMOVE_DEPARTMENT":
         
    return removeDepartment();
        
    case "VIEW_ROLES":
          
    return viewRoles();
       
    case "ADD_ROLE":
         
    return addRole();
      
    case "REMOVE_ROLE":
          
    return removeRole();
      
    default:
         
    return quit();


}




}

async function viewEmployees() {

    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);


    loadMainPrompts();



}

async function viewEmployeesByDepartment() {


    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      
        name: name,
     
        value: id

    }
    ));


    const { departmentId } = await prompt([


        {
          type: "list",

          name: "departmentId",

          message: "Which department would you like to see employees for?",

          choices: departmentChoices


        }
      ]);



    
      const employees = await db.findAllEmployeesByDepartment(departmentId);


    
      console.log("\n");

      console.table(employees);
    
      









      loadMainPrompts();
}


//this will view employees by manager 


async function viewEmployeesByManager() {

    const managers = await db.findAllEmployees();


    const managerChoices = managers.map(({ id, first_name, last_name }) =>
     ({
      
        name: `${first_name} ${last_name}`,
      value: id
   
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message: "What employee needs reports?",
        choices: managerChoices
      }


    ]);
  
    const employees = await db.findAllEmployeesByManager(managerId);
  


    console.log("\n");
  
    if (employees.length === 0) {
      console.log("There is nothing here");
    } else {
      console.table(employees);
    }
  
    

    loadMainPrompts();
}


//function to remove emplyee 


async function removeEmployee() {



    const employees = await db.findAllEmployees();


  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => 
    ({
      name: `${first_name} ${last_name}`,
      value: id

    }
    ));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "What employees are being removed?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);
  
    console.log("You have removed empoloyees from thje db");







  
    loadMainPrompts();
  }





  async function updateEmployeeRole() {



    const employees = await db.findAllEmployees();


  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Choose Employee to update",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Chgoose role to be assigned",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("roll has been updated");



  
    loadMainPrompts();
  }


  //this function will update manager for selected employee 



  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Choose employee to update",
        choices: employeeChoices
      }
    ]);
  
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Who will be the new manager?",
        choices: managerChoices
      }
    ]);
  
    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("manager has been updated for employee");
  
    loadMainPrompts();
  }



  async function viewRoles() {

    const roles = await db.findAllRoles();

  
    console.log("\n");
    console.table(roles);



  
    loadMainPrompts();
  }


  async function addRole() {


    const departments = await db.findAllDepartments();



  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }
    ));


  
    const role = await prompt([
      {
        name: "title",
        message: "Please Name the role"
      },
      {
        name: "salary",
        message: "Please name the salary"
      },
      {
        type: "list",
        name: "department_id",
        message: "Please name the department",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);




  
    loadMainPrompts();
  }




  async function removeRole() {


    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id

    }
    ));
  
    const { roleId } = await prompt([

      {
        type: "list",
        name: "roleId",
        message:
          "Name a role to remove",
        choices: roleChoices
      }
    ]);
  
    await db.removeRole(roleId);
  
    console.log("role has been removed");





  
    loadMainPrompts();
  }



  
async function viewDepartments() {


  const departments = await db.findAllDepartments();


  console.log("\n");
  console.table(departments);



  loadMainPrompts();
}


async function addDepartment() {


    const department = await prompt([
      {
        name: "name",
        message: "Name the department"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to db`);



  
    loadMainPrompts();
  }



  async function removeDepartment() {



    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({


      name: name,
      value: id


    }
    
    ));
  
    const { departmentId } = await prompt({
      type: "list",
      name: "departmentId",
      message:
        "Name department to remove",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentId);
  
    console.log(`Removed department from db`);





  
    loadMainPrompts();
  }





  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "First name of employee:"
      },
      {
        name: "last_name",
        message: "Last name of employee:"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id

    }
    ));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "Role of employee:",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({


      name: `${first_name} ${last_name}`,
      value: id
    }
    ));


    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Manager of employee:e",
      choices: managerChoices


    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} to db`
    );
  




    
    loadMainPrompts();
  }







