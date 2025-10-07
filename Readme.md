# 🔐 Password Vault — A Full-Stack Password Manager

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A full-stack Password Manager featuring a **Next.js** frontend with client-side encryption and a **Node.js/Express** backend with JWT authentication and a MongoDB database. It provides a clean, minimal UI with a built-in password generator and a secure vault for each user.

## ✨ Live Demo

You can test the live application here:

**[https://password-vault-gamma-opal.vercel.app/](https://password-vault-gamma-opal.vercel.app/)**

---

## 🚀 Features

-   **Secure Authentication:** User registration and login using JSON Web Tokens (JWT).
-   **Client-Side Encryption:** Passwords and sensitive data are encrypted in the browser before being sent to the server.
-   **Full CRUD Functionality:** Create, Read, Update, and Delete items in your personal password vault.
-   **Password Generator:** Includes a tool to generate strong, secure passwords.
-   **Minimal UI:** A clean and intuitive user interface for easy management.

---

## 🛠️ Tech Stack

| Category      | Technology                                    |
| :------------ | :-------------------------------------------- |
| **Frontend** | Next.js,                                      |
| **Backend** | Node.js, Express.js                           |
| **Database** | MongoDB (with Mongoose ODM)                   |
| **Auth** | JSON Web Tokens (JWT)                         |
| **Encryption**| Client-side libraries for data encryption     |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   **Node.js** (v16+ recommended)
-   **npm** or **yarn**
-   A **MongoDB** instance (local or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd <PROJECT_DIRECTORY>
    ```

2.  **Set up the Backend (Server):**
    ```sh
    # Navigate to the server directory
    cd server

    # Create the environment file
    cp .env.example .env

    # Install dependencies
    npm install

    # Start the server
    npm run server
    ```
    > **Note:** Before starting the server, make sure you have configured your `server/.env` file. See the [Environment Variables](#-environment-variables) section below.

3.  **Set up the Frontend (user):**
    ```sh
    # Navigate to the user (frontend) directory from the root
    cd user

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```
    > The frontend will be available at `http://localhost:3000`. It requires the backend API to be running.

---

## 🔑 Environment Variables

You will need to create and configure environment files for both the backend and frontend.

### Backend (`server/.env`)

| Variable      | Description                               | Example                                |
| :------------ | :---------------------------------------- | :------------------------------------- |
| `PORT`        | The port for the Express server to run on.| `5000`                                 |
| `MONGO_URI`   | Your MongoDB connection string.           | `mongodb://localhost:27017/password-vault` |
| `JWT_SECRET`  | A secret key for signing JWTs.            | `your-super-secret-key-that-is-long`   |

### Frontend (`user/.env.local`)

| Variable                   | Description                                  | Example                             |
| :------------------------- | :------------------------------------------- | :---------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | The base URL of your running backend API.    | `http://localhost:5000/api/v1`      |
| `NEXT_PUBLIC_CRYPTO_KEY`   | A secret key for client-side encryption.     | `another-secret-for-the-client`     |

---

## 🌐 API Endpoints

All vault routes are protected and require a valid JWT in the `Authorization` header.

| Method   | Endpoint                  | Handler Function    | Description                 |
| :------- | :------------------------ | :------------------ | :-------------------------- |
| `POST`   | `/user/signup`            | `signupUser`        | Register a new user.        |
| `POST`   | `/user/login`             | `loginUser`         | Log in and receive a token. |
| `POST`   | `/vault/add`              | `addVaultItem`      | Add an item to the vault.   |
| `GET`    | `/vault/lists`            | `listVaultItem`     | Get all items from the vault. |
| `GET`    | `/vault/list/:id`         | `singleVaultItem`   | Get a single item by ID.    |
| `PUT`    | `/vault/update/:id`       | `updateVaultItem`   | Update a vault item.        |
| `DELETE` | `/vault/remove/:id`       | `removeVaultItem`   | Delete a vault item.        |

---

## 📂 Project Structure

├── server/       # Express API, controllers, models, routes
└── user/         # Next.js frontend, components, pages, utils

---

## 📄 License

This project is distributed under the MIT License.
