## Developers
* Armend Hyseni - 03/08/2020


## Technologies ##
* Node JS: [https://nodejs.org/](https://nodejs.org/)
* PostgresSQL: [https://www.postgresql.org//](https://www.postgresql.org/)


## Setup


### Server Configuration
First you have to install the node modules in root directory via:
npm install


#### Config Database
In file **/config/config.json** put your postgres server information and create blank database. 
After that **run npx sequelize-cli db:migrate** to create database structure.

#### Run Application
After that you can start the server development mode via **npm run start:dev**
