# employee-tracker
This application allows a user to interface with a console to add departments, roles, and employees to a database to track that information.

## Installations
This application utilizes Node.js, as well as MySQL. To install the node packages run <code>npm i</code> in the console. To intiitalize the database you run <code>SOURCE schema.sql</code> in you MySQL terminal. Optionally, you can seed the database with some data by running <code>SOURCE seeds.sql</code> or create your own data by runnning <code>node index.js</code> to start the application. 

## Usage
If you did not seed the database with the seed data provided, then all of the view all departments, roles, and employees options will not return any information. In order for those to work you must first add a department by using the arrow keys to select the relevant add option. To add a department you select the "add department choice" and are prompted to give the new department a name. After you have done that, you can now add roles into that department by selecting the "add role" option. You will also be prompted to add additional information about the role including the title and salary of the role. After that has been done, you can now add an employee witha  first name, last name, their associated role. It is recommended that you enter a manager first (and hit enter when prompted to select one) as when creating future employees you can then select that individual as a manager. Update role is still in development. Here is a video of the app in use:  https://watch.screencastify.com/v/KU5NyqEDxvmG36cgf6bT

## Credits
I wrote all of the code for this project myself and no stat code was provided to me. 
