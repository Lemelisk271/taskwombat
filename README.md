# TaskWombat

## Description
Checkout a live version of TaskWombat here: [TaskWombat Live](https://taskwombat.onrender.com/)

TaskWombat is a clone of the TaskRabbit website. The backend is built with express in a PostgreSQL database. The frontend rendering is handled with React.

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Technologies

Backend Dependencies:
- @faker-js/faker
- bcryptjs
- cookie-parser
- cors
- csurf
- dotenv
- express
- express-async-errors
- express-validator
- helmet
- jsonwebtoken
- morgan
- per-env
- pg
- sequelize
- sequelize-cli
- multer
- aws-sdk

Backend Dev Dependencies:
- dotenv-cli
- nodemon
- sqlite3

Frontend Dependencies:
- @babel/plugin-proposal-private-property-in-object
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- js-cookie
- moment
- moment-timezone
- react
- react-dom
- react-redux
- react-router-dom
- react-scripts
- redux
- redux-thunk
- zipcodes

## Installation

Backend:
1. Change directory to the "backend" folder.
    - `cd/backend`
2. Install the dependencies by running the following command:
    - `npm install`
3. In the backend folder create a .env file.
4. Copy the contents of the .env.example file to the .env file.
5. Replace <<secret>> a secret of your own.
6. Run the following command, wait for the first to complete before running tha second.
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`
7. Now run the command to start the server
    - `npm start`

Frontend:
1. Change the directory to the "frontend" folder.
    - `cd/frontend`
2. Install the dependencies by running th following command:
    - `npm install`
3. Now run the command to start the server:
    - `npm start`
4. If a browser window doesn't open automatically you can open your own browser and navigate to:
    - [http://localhost:3000/](http://localhost:3000/)

## Usage

Live Link -  [TaskWombat](https://taskwombat.onrender.com/)

Landing Page:

![Landing Page](https://taskwombat.s3.us-west-2.amazonaws.com/readme/landing.png)

Login Form:

![Login Form](https://taskwombat.s3.us-west-2.amazonaws.com/readme/login.png)

Signup Form:

![Signup Form](https://taskwombat.s3.us-west-2.amazonaws.com/readme/signup.png)

Category Details:

![Category Details](https://taskwombat.s3.us-west-2.amazonaws.com/readme/category.png)

User Profile:

![User Profile](https://taskwombat.s3.us-west-2.amazonaws.com/readme/userProfile.png)

Tasker Profile

![Tasker Profile](https://taskwombat.s3.us-west-2.amazonaws.com/readme/taskerProfile.png)

## Credits
Zach Smith - [GitHub Profile](https://github.com/Lemelisk271)
