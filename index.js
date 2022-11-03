// importing required packages/files
const inquirer = require(`inquirer`);
const mysql = require(`mysql2`);
const cTable = require(`console.table`);

// connect sql database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// Inquirer functions
const main = () => {
    inquirer.prompt([
        {
            type: `list`,
            name: `main`,
            message: `what would you like to do?`,
            choices: [`View All Departments`,`View All Roles`,`View All Employees`,`Add a Department`,`Add a Role`,`Add an Employee`,`Update an Employee's Role`,`Quit`]
        }
    ]).then((answers)=> {
        if (answers.main === `View All Departments`) {
            console.log(answers.main)
            db.query(`SELECT * FROM departments`, function (err, results) {
                console.log(``);
                console.table(results);
              });
            //   needs to wait for db.query to finish before calling main
            main();
        } else if (answers.main === `View All Roles`) {
            console.log(answers.main)
            db.query(`SELECT roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles LEFT JOIN departments ON departments.id = roles.department_id`, function (err, results) {
                console.log(``);
                console.table(results);
              });
              //   needs to wait for db.query to finish before calling main
            main();
        } else if (answers.main === `View All Employees`) {
            console.log(answers.main)
            db.query(`SELECT * FROM employees`, function (err, results) {
                console.log(``);
                console.table(results);
              });
            //   needs to wait for db.query to finish before calling main
            main();
        } else if (answers.main === `Add a Department`) {
            addDepartment();
        } else if (answers.main === `Add a Role`) {
            addRole();
        } else if (answers.main === `Add an Employee`) {
            addEmployee();
        } else if (answers.main === `Update an Employee's Role`) {
            updateEmployeeRole();
        } else {
            db.end()
            return;
        }
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is the name of the department you would like to add?`
        }
    ]).then((answers)=>{
        // add to database table
        db.query(`INSERT INTO departments (name) VALUES (?)`, [`${answers.name}`], function (err, results) {
            console.log(``);
            console.log(`New Department Added!`);
          });
        //   needs to wait for db.query to finish before calling main
        main();
    })
}

const addRole = ()  => {
    const departmentsArr = [];
    db.query(`SELECT name FROM departments`, function (err, results) {
    for (i = 0; i < results.length; i++) {
        departmentsArr.push(results[i]['name'])
        }
    });
       inquirer.prompt([
            {
                type: `input`,
                name: `title`,
                message: `What is the job title for this role?`
            },
            {
                type: `input`,
                name: `salary`,
                message: `What is the salary for this position?`
            },
            {
                type: `list`,
                name: `department`,
                message: `What department is this role assigned to?`,
                choices: departmentsArr
            }
        ]).then((answers)=>{
            db.query(`SELECT id FROM departments WHERE name=?`,[answers.department], function (err, depResults) {
                console.log(depResults[0].id);
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,[`${answers.title}`,`${answers.salary}`,`${depResults[0].id}`], function (err, newRole) {
                    console.log(`New Role Added!`);
                    main();
                });
            });
        });
    }

const addEmployee = () => {
    const rolesArr = [];
    db.query(`SELECT title FROM roles`, function (err, results) {
        for (i = 0; i < results.length; i++) {
            rolesArr.push(results[i]['title'])
        }
    });
    db.query(`SELECT CONCAT (first_name," ",last_name) FROM employees AS Name`, function (err, results) {
        const employeesArr = [];
        console.log(results)
        for (i = 0; i < results.length; i++) {
            employeesArr.push(results[i][`CONCAT (first_name," ",last_name)`])
        }
        inquirer.prompt([
            {
                type: `input`,
                name: `firstName`,
                message: `What is this employee's first name?`
            },
            {
                type: `input`,
                name: `lastName`,
                message: `What is this employee's last name?`
            },
            {
                type: `list`,
                name: `role`,
                message: `What is this employee's job title (role)?`,
                choices: rolesArr
            },
            {
                type: `list`,
                name: `manager`,
                message: `Who is this employee's maanager?`,
                choices: employeesArr
            }
        ]).then((answers)=>{
            db.query(`SELECT id FROM roles WHERE title=?`,[answers.role], function (err, roleResults) {
                console.log(roleResults[0].id);
                db.query(`SELECT id FROM employees WHERE CONCAT (first_name," ",last_name)=?`,[answers.manager], function (err, managerResults) {
                    console.log(managerResults[0].id);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [`${answers.firstName}`,`${answers.lastName}`,`${roleResults[0].id}`,`${managerResults[0].id}`], function (err, results) {
                        console.log(``);
                        console.log(answers.firstName, answers.lastName, roleResults[0].id, managerResults[0].id)
                        console.log(`New Employee Added!`);
                        main();
                    });
                });
            });
        });
    })
}


const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: `list`,
            name: `employeeSelection`,
            message: `Which employee would you like to edit the role of?`,
            choices: [`${employeesArr}`]
        },
        {
            type: `list`,
            name: `newRole`,
            message: `What is this employee's new position (role)?`,
            choices: [`${rolesArr}`]
        }
    ]).then((answers)=>{
        console.log(answers)
        main();
    })
}

main()