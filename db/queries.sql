USE employees_db;

-- INSERT INTO roles (title, salary, department_id)
-- VALUES 
-- ("Marketing Manager",100000.00,5);

-- SELECT roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles
-- LEFT JOIN departments ON departments.id = roles.department_id;

-- SELECT employees.id AS Employee ID, employees.first_name AS First Name, employees.last_name AS Last Name, oles.title AS Role, employees.first_name AS Manager FROM employees
-- LEFT JOIN roles ON roles.id = employees.role_id;

SELECT CONCAT(employees.first_name, ` `, employees.last_name) AS Name, role.title AS Title, departments.name AS Department_Name, CONCAT(manager.first_name, ` `, manager.last_name) AS Manager FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS manager ON employees.manager.manager_id = manager.id;