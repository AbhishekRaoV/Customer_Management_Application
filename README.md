# Customer Management Application with Authentication

## Project Overview

This project is a **Customer Management Application** built using **Node.js** and **React.js**. The backend provides authentication services and CRUD functionality for customers, while the frontend allows users to manage customer data and handle authentication.

### Components:
1. **Backend (Auth Service)**:
    - Handles user authentication (signup and login).
    - Provides JWT-based authorization for accessing customer-related routes.
    - Manages a basic in-memory list of users and customer data.
   
2. **Frontend (React UI)**:
    - Allows users to **sign up**, **log in**, and **manage customer information**.
    - Uses JWT for authorization to access the customer management features.

---

## Table of Contents

1. [Project Setup](#1-project-setup)
    - Prerequisites
    - Backend Setup
    - Frontend Setup
2. [Running the Project](#2-running-the-project)
    - Starting the Backend
    - Starting the Frontend
3. [Usage](#3-usage)
    - Register and Login
    - View and Add Customers
    - Log Out
4. [Conclusion](#4-conclusion)

---

## 1. Project Setup

### Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (>= 16.x)
- **npm** or **yarn**
- **MongoDB** (for production deployments or if you plan to store users and customers persistently)

To check if Node.js and npm are installed:
```bash
node -v
npm -v
```

If they aren't installed, download and install from the official [Node.js website](https://nodejs.org/).

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2. **Install dependencies**:
    Inside the backend folder (where `authService.js` is located), run:
    ```bash
    npm install
    ```

3. **Run the backend**:
    To start the backend, run:
    ```bash
    node authService.js
    ```

    The backend will be running on port **5001** by default, and you can interact with the API using these routes:
    - **POST /register**: To register a new user.
    - **POST /login**: To authenticate a user and receive a JWT token.
    - **GET /profile**: Protected route, only accessible with a valid JWT token.

    The backend API should now be live at `http://localhost:5001`.

### Frontend Setup

1. **Navigate to the frontend folder**:
    ```bash
    cd <frontend_folder>
    ```

2. **Install dependencies**:
    Inside the frontend folder, run:
    ```bash
    npm install
    ```

3. **Configure the frontend**:
    - Ensure that the **frontend** is set to communicate with the **backend** API (`http://localhost:5001` by default). You may need to adjust the API URLs in `App.js` (e.g., the `login` and `register` requests).
    - If you're using a different port or server URL, update these values accordingly.

4. **Run the frontend**:
    Start the frontend application with:
    ```bash
    npm start
    ```

    This will run the React application on `http://localhost:3000`.

---

## 2. Running the Project

### Starting the Backend:
1. Open a terminal and navigate to the directory containing `authService.js`.
2. Run the backend service:
   ```bash
   node authService.js
   ```

   The backend will be available at `http://localhost:5001`.

### Starting the Frontend:
1. Open a new terminal and navigate to the frontend project directory.
2. Run the following command:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

Now, your application is up and running, and you can begin interacting with it through the **browser**.

---

## 3. Usage

### Register and Login

1. **Signup**:
    - On the frontend (React UI), you will be prompted to **Sign Up** with a **username** and **password**.
    - Once you submit the form, the frontend sends a POST request to the backend's `/register` route to create a new user.
    - If the registration is successful, you will see a success message and can proceed to log in.

2. **Login**:
    - After successful registration, log in with your **username** and **password**.
    - The frontend sends a POST request to `/login`, and if the credentials are correct, the backend will return a **JWT token**.
    - The token is stored in `localStorage` on the frontend, and this token will be used to access protected routes.

### View and Add Customers:

1. **View Customers**:
    - Once logged in, the user is authenticated with the stored JWT token.
    - On the frontend, the user can view the list of customers by sending a GET request to `/customers` using the JWT token for authorization.
    - Customers are displayed in a list on the frontend.

2. **Add New Customer**:
    - On the frontend, there is a form to add a new customer (name, email, phone).
    - Once the form is submitted, a POST request is sent to `/customers` on the backend, and the customer is added to the list.

### Log Out:
- When the user logs out, the **JWT token** is removed from `localStorage`, and the user is redirected to the login page.

---

## 4. Conclusion

Congratulations! You have successfully set up a **Customer Management Application** with user authentication. The application is structured with a **Node.js backend** handling user management and a **React frontend** that allows users to sign up, log in, manage customers, and log out.

### Key Technologies Used:
- **Backend**: Node.js, Express.js, JWT Authentication, Bcrypt.js
- **Frontend**: React.js, Material-UI for UI components
- **Database**: In-memory storage for users and customers (can be extended to MongoDB or another database in production).

---

