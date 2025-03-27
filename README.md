# Video Game Library App

A simple CRUD application built using the MEN (MongoDB, Express.js, Node.js) stack that allows users to manage a video game collection.

## Setup

1. Clone this repository
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI="mongodb+srv://username:<password>@cluster.example.net/?retryWrites=true&w=majority"
PASSWORD=your_password_here
```

## Running the Application

Start the server:
```bash
npm start
```

Access the application at `http://localhost:3000`

## Features

- Create new video game entries
- View all video games
- Update existing game information 
- Delete games from the library

## Author
[Christian Vieux](https://github.com/christianvieux)

## Technologies Used

- MongoDB
- Express.js
- Node.js
- EJS Templates