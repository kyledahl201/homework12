const connection = require("./connection");

class DB {

//this references connection 
    constructor(connection) {
        
this.connection = connection;

    }
    
    //this will find connection 

    findAllEmployees() {


        return this.connection.query
    }




}