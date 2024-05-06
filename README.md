[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/tRxoBzS5)
Add design docs in *images/*

## Instructions to set up and run project
### Frontend
The frontend uses React and Typescript through Vite. Install dependencies in the client folder with
```shell
npm install
```

Run the development server from the client folder with
```shell
npm run dev
```

The local development server should be hosted on http://localhost:3000

### Backend
The backend uses Typescript, so you can't just run it through Node. 
Use these npm scripts to initialize and run them from the server folder.
```shell
npm install
```
Make sure MongoDB is started on your computer and the port is in its proper configuration for the project (mongodb://127.0.0.1:27017/fake_so)

Initialize the database in the server folder with
```shell
npm run init <admin-username> <admin-password>
```
(Replace `<admin-username>` and `<admin-password>` with the username and password of your choice.)

Start the express server from the server folder with
```shell
npm run start
```

You can run jest unit tests from the server folder. Make sure MongoDB is started with the proper config.
```shell
npm test
```

## Team Member 1 Contribution - Alvin
- Design for navbar, sidebar, and welcome, login, registration, answers pages
- Backend mongoose initialize script
- Backend user and auth routes
- Backend question routes
- Backend comments routes
- Backend tags routes
- Backend answers routes
- UML diagrams

## Team Member 2 Contribution - Andrew
- Document Schemas
- Profile, Tag, Tag Question page
- Question and answer components
- New Question, answer, sort, page button functionality
- Signup and Login functionality
- Tag, Question, Answer edit and delete
- Search backend and some answers/questions routes
