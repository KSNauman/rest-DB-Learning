# User Management App (Learning Project)

> ⚠️ **Note:** This is not a complete or production-level project. This repository is part of my learning journey while practicing **RESTful API development** with **MySQL database integration** using **Node.js** and **Express**.

---

## 📌 Objective

The primary purpose of this project is to demonstrate:
- Implementation of **RESTful routes** (GET, POST, PATCH, DELETE)
- Integration of a **MySQL database** with Express using the `mysql2` package
- Usage of **EJS templates** to dynamically render data
- Form handling and method overriding to support PATCH and DELETE operations
- Data generation using `@faker-js/faker`

> I have a **separate repository** that focuses only on RESTful API routes **without** database integration.

---

## 📁 Project Structure

```
.
├── index.js              # Main server file with all REST routes
├── package.json          # Project dependencies
├── schema.sql            # SQL table schema for MySQL
├── /views                # EJS templates for UI rendering
│   ├── home.ejs
│   ├── users.ejs
│   ├── edit.ejs
│   ├── delete.ejs
│   └── new.ejs
```

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL (via `mysql2`)
- **Templating Engine**: EJS
- **UUID & Faker**: For generating unique user IDs and dummy data
- **Method Override**: To allow HTML forms to use PATCH and DELETE

---

## 🧪 Features

- View all users sorted by username
- Add a new user (via form)
- Edit username with password validation
- Delete user (with password confirmation)
- Count total users on homepage
- Form-based PATCH and DELETE operations using `method-override`

---

## 🗃️ Database Schema

```sql
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
```

---

## ▶️ How to Run

1. Make sure **MySQL Server** is running and a database named `delta_app` is created.
2. Create the `user` table using the `schema.sql` file.
3. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   nodemon index.js
   ```

5. Visit `http://localhost:8080` in your browser.

---

## 🧠 Learnings from This Project

- Structuring routes based on REST principles
- Connecting Express.js to a MySQL database
- Handling form submissions in EJS
- Implementing PATCH and DELETE logic in a full-stack context
- Importance of proper error handling and data validation

---

## 🙋‍♂️ Author

**KS Nauman Ahmed**  
Aspiring developer building real-world skills through hands-on practice.
