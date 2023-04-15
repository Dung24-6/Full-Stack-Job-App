# Full-Stack-Job-App
A full-stack web application created using PostgreSQL , Expressjs , React js, Node js . Help people find job and company find software developer


![Logo](https://www.freecodecamp.org/news/content/images/2020/03/PERN.png)





![shields](https://img.shields.io/github/package-json/v/Dung24-6/Product-Management-Nodejs?logo=D)
[![Stars](https://img.shields.io/github/stars/Dung24-6?affiliations=OWNER&style=social)](https://github.com/Dung24-6/Product-Management-Nodejs)
![Nodemon](https://img.shields.io/github/package-json/dependency-version/Dung24-6/Product-Management-Nodejs/dev/nodemon)
![Express](https://img.shields.io/github/package-json/dependency-version/Dung24-6/Product-Management-Nodejs/express)

Table of contents
-----------------
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Demo](#demo)
* [Features](#features)
* [API Reference](#api-reference-example-there-are-many-api-i-dont-write-here)
* [Tech Stack](#tech-stack)
* [Authors](#authors)
* [About Me](#about-me)
* [Skills](#skills)
## Installation

First , clone project and go to client folder and  and server folder run npm install . Create .env file and add environment variables in server folder

```bash
  cd client
  yarn
  yarn run dev
```
```bash
  cd server
  npm install 
  npm run start
```
Or for dev in server , use nodemon

```bash
  npm run server
```





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. SECRET_KEY can random

`PORT = ?`

`NAME = ? `

`DATABASE_PORT = ? `

`HOST = ? `

`DATABASE = ? `

`PASSWORD = ? `

## Demo

...



## Features

- Full stack web
- 3 role : Admin , User , Company
- Admin : Create Account, Delete User, Delete Rivew, DashBoard, Register Company , ...
- User: Get user, Create User, Log In, Log Out, Update Profile, Upload Avatar, Upload CV, Review Company, Report Wrong Review, Search Job by location skills company, Apply Job
- Company : Update Company Profile, See Review Company , See Apply Job , Report Review
- There are many features will complete

## API Reference Example (There are many API I don't write here)

#### Get all users 

```http
  GET /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `No` | `/` | Get all user of the list |

#### Get user

```http
  GET /user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |




## Tech Stack

**Back-end:** PostgreSQL , ReactJS , Node , Express

## Authors

- [@Dung24-6](https://github.com/Dung24-6)
- [@Huy Hoang](https://github.com/ktshglsm)



## 🚀 About us
We are web developer


## 🛠 Skills
Javascript, NodeJs, ReactJS, Express, PostgresQL, mongoDB, Postman, ...


