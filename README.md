## Developers
* Armend Hyseni - 03/08/2020


## Technologies ##
* Node JS: [https://nodejs.org/](https://nodejs.org/)
* PostgresSQL: [https://www.postgresql.org//](https://www.postgresql.org/)


## Setup

### Server Configuration
Install **Node JS** and **PostgresSQL** in your local machine

After that you have to install the node modules in root directory via: **npm install**


#### Config Database
Two seperate databases must be created, one for test and one for development purposes. 
Names of databases are predefined as (poviolabs_dev) and (poviolabs_test). In order to change your local database credentials, modify the file: **/config/config.json**


#### Running migration
Migrate database structures with this command: **npm run db:migrate**


#### Run Application
You can start the server development mode via: **npm run dev**


#### Run Tests
You can run tests via this command: **npm run tests**







