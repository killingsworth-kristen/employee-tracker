USE employees_db;

INSERT INTO departments (name) 
VALUES
("Human Resources"),
("Legal"),
("Operations"),
("IT");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Hiring Manager",60000.00,1),
("Scheduling",50000.00,1),
("Lawyer",100000.00,2),
("Paralegal",50000.00,2),
("Lead Engineer",100000.00,3),
("Junior Engineer",80000.00,3),
("Systems Administrator",100000.00,4),
("Network Engineer",80000.00,4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
("Kristen","Killingsworth",1,null),
("Corey","Person",5,null),
("Bob","Joey",6,2),
("Julie","Killingsworth",2,1),
("John","Doe",3,null),
("Jane","Doe",4,5),
("Derek","Boyle",7,null),
("Orion","Killingsworth-Person",8,7);