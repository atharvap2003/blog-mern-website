# MERN Blogging Application
Welcome to the MERN Blogging Application repository! This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, read, update, and delete blog posts, as well as manage user authentication and authorization.

## Features
User Authentication: Secure user registration and login with hashed passwords.
User Authorization: Role-based access control to protect certain routes and actions.
Create & Manage Posts: Users can create new blog posts, edit existing ones, and delete their own posts.
Rich Text Editor: A feature-rich editor to compose blog posts with formatting options.
Comment System: Users can comment on blog posts and engage in discussions.
Responsive Design: Optimized for both desktop and mobile devices.
RESTful API: A well-structured API to handle all CRUD operations and user authentication.
State Management: Efficient state management using context API.

### Technologies Used:
Frontend: React.js, React Router, Axios, Javascript 

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT (JSON Web Tokens) for authentication
bcrypt for password hashing
Other Tools:
Webpack
Babel
ESLint
Installation
Clone the repository:

git clone https://github.com/atharvap2003/blog-mern-app.git

cd mern-blogging-app
Install dependencies:


# Install server dependencies
cd api

npm install

# Install client dependencies
cd client

npm install
Set up environment variables:

Create a .env file in the server directory and add your MongoDB URI, JWT secret, and other necessary environment variables.

env
Copy code

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Run the application:

# Run server
cd api

npm start

# Run client
cd client

npm run dev
Open the application in your browser:

Navigate to http://localhost:3000 to see the application in action.
Navigate to http://localhost:5173 to see the application in action.

Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or feedback, please feel free to reach out:

Email: atharvapandharikar5@gmail.com
GitHub: atharvap2003
