const connection = require("./connection");

class DB {

//this references connection 
    constructor(connection) {
        
this.connection = connection;

    }
    
    //this will find connection 

    findAllEmployees() {


        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );

    }


    //this will create an employee

    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?",
        employee);
    }


    // this will remove an employee

    removeEmployee(employeeId) {
        return this.connection.query(
            "DELETE id FROM employee WHERE id = ?",
            employeeId
        )
    }

//update employee role


updateEmployeeRoll(employeeId, roleId) {
    return this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]

    );
}







    // this will update the manager

    updateEmployeeManager(employeeId, managerId) {

            return this.connection.query(
                "UPDATE employee SET manager_id = ? WHERE id = ?",
                [managerId, employeeId]
            );


    }

    // thius will find rolls and join with depoartments 



findAllRoles(){
    return this.connection.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = document.id;"

    );
}




}