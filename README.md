# TaskToDo App
---
## Installation

### Folder Structure

```bash

├── frontend/ 
└── backend/ 
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/AntonisArampatzis/TaskToDo.git
cd TaskToDo
```
---

### 2. Backend Setup

```bash
cd ../backend
# Create virtual enviroment - optional but recommended
python -m venv venv         
# Activate virtual enviroment
source venv/bin/activate
# or  
venv\Scripts\activate # on Windows
# Install Python dependencies
pip install -r requirements.txt
# Start the backend server
flask run                   
      
```
##### Runs on http://127.0.0.1:5000
---
### 3. PostgreSQL Setup
- [PostgreSQL](https://www.postgresql.org/download/) (v13+ recommended)
- A PostgreSQL user with a password
- A database created for this project
> ⚠️ During installation, note your **username** and **password** — you’ll need them later.

####  Create a new database

Open the terminal or pgAdmin and run:

```sql
CREATE DATABASE TaskToDoDB;
```
---
### 4. Frontend Setup

```bash
cd frontend
npm install        
npm run dev        
```
##### Start the frontend dev server, runs on http://localhost:5173
---

### ⚙️ Prerequisites

Make sure the following are installed on your system before running the project:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v9 or later)
- [Python](https://www.python.org/) (v3.10+ recommended)
- [Git](https://git-scm.com/)
---

## UI Libraries Used

This project uses the following UI libraries:

- [MUI (Material UI)](https://mui.com/)

These are already included in `package.json`.  
To install them, just run:

```bash
npm install
```
As shown on 2. Frontend setup


