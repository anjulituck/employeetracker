const express = require('express');
const db =require('.db/connection');
const inquirer = require('inquirer');
const cT = require('console.table');
// const routes = require('./routes');

//middleware for express
app.use(express.urlencoded({extended:flase}));
app.use(express.json());

// 404 request for other request
app.use((req,res) =>{
    res.status(404).end();
});

//start server after database connection 
db.connect(er => {
    if (err) throw err;
    console.log('DB connected.');
    startMenu();
    app.listen(PORT,() =>{
        console.log(`Server running on port ${PORT}`);
    });
});

// start prompt menu 
function startMenu() {
    inquirer.prompt({
        type:"list",
        name:"start",
        message:"What would you like to do in the employee tracker?",
        choices:[
            "View Employees",
            "View Positions",
            "View Departments",
            "Add Employee",
            "Add Position",
            "Add Department",
            "Update Employee Position",
            "Quit"
        ]
    })
    .then((answer) => {
        switch(answer.start) {

        case "View Employees":
                viewEmployees();
                break;

            case "View Positions":
                viewPositions();
                break;

            case "View Departments":
                viewDeparments();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Position":
                addPosition();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update Employee Position":
                updateEmployeePosition();
                break;
            case "Quit":
                db.end();
                //console.log('Connection ending to employee tracker database');
                return;
            default:
                break;

    }});
}


// view all employees 

function viewEmployees (){
    const query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, position.title, position.salary, position.id, department.id FROM employee LEFT JOIN role ON employee.position_id = position.id LEFT JOIN department ON position.department_id = department.id";
    db.query(query, function(err,res){
        if(err) return err;
        console.table(res);
        startMenu();

    });
}

// view all positions 

function viewPositions (){
    const query = "SELECT employee.first_name, employee.last_name, position.title FROM employee JOIN position ON employee.role_id = position.id";
    db.query(query, function(err,res){
        if(err) return err;
        console.table(res);
        startMenu();

    });
}

// view all departments 


function viewDepts (){
    const query = "SELECT employee.first_name, employee.last_name, department.department_name FROM employee JOIN role ON employee.position_id = position.id JOIN department ON position.department_id = department.id ORDER BY employee.id";
    db.query(query, function(err,res){
        if(err) return err;
        console.table(res);
        startMenu();

    });
}

// add employee 
function addEmployee (){
    const query = "SELECT * FROM employee";
    db.query(query, function(err,res){
        inquirer.prompt([
            {
                type:'input',
                name:'firstName',
                messaage:'What is the employee\'s first name?'
            },
            {
                type:'input',
                name:'lastName',
                messaage:'What is the employee\'s last name?'
            },
            {
                type:'list',
                name:'position',
                messaage:'What\'s the employee\'s position title? ',
                choices:[
                    "Singer",
                    "Performer",
                    "Entertainer",
                    "Comedian",
                    "Athlete",
                    "Dancer"

                ]
            },
            {
                //need to double check on input since the manager column takes integers
                type:"input",
                name:"manager"
                message:"Who is the new employee\'s manager?"
            }
        ])
        .then((?){
            const query ="INSERT INTO employee SET?";
            db.query(query, function(err,response)(
                first_name:response.firstName,
                last_name:response.lastName, 
                position_id:response.position,
                manager_id:response.manager,
            ),
            (err,res) => {
                startMenu();
            }

        )})
    })
}