[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/tRxoBzS5)
Add design docs in *images/*

## Instructions to set up and run project
### Frontend
The frontend uses React and Typescript through Vite. Install dependencies with
```shell
npm install
```

Run the development server with
```shell
npm run dev
```
The local development server should be hosted on http://localhost:3000

### Backend
The backend uses Typescript, so you can't just run it through Node. Use these npm scripts to initialize and run the
```shell
npm install
```
Make sure MongoDB is started on your computer and the port is in its proper configuration for the project (mongodb://127.0.0.1:27017/fake_so)

Initialize the database with
```shell
npm run init <admin-username> <admin-password>
```
(Replace `<admin-username>` and `<admin-password>` with the username and password of your choice.)

Start the express server with
```shell
npm run start
```

## Team Member 1 Contribution - Alvin
- Design for navbar, sidebar, and welcome, login, registration, answers pages
- Backend mongoose initialize script
- Backend user and auth routes
- Backend question routes

## Team Member 2 Contribution - Andrew
- Document Schemas
- Profile, Tag, Tag Question page
- Question and answer components
- New Question, answer, page button functionality
