# TaskToDo App
---
## Installation

### Folder Structure

```bash

├── frontend/ 
└── backend/ 
```

---

### 1. Download the code from the Repository


- Click the Code button (top-right of file list).
- Choose Download ZIP.
- Extract the ZIP to your desired folder.
- Open the folder in VSC.


---
### 2. PostgreSQL Setup
- [PostgreSQL](https://www.postgresql.org/download/) (v13+ recommended)
- Use pgAdmin to create :
- A PostgreSQL user with a password
- A database created for this project
> ⚠️ During installation, note your **username** and **password** — you’ll need them later.

####  Create a new database

Open the terminal or pgAdmin and run:

```sql
CREATE DATABASE PersonalExpenseTracker;
```
---

### 3. Backend Setup

```bash
# Open a terminal for backend

# Create virtual enviroment - optional but recommended
python -m venv venv
         
# Activate virtual enviroment
source venv/bin/activate
# or  
venv\Scripts\activate # on Windows

# Install Python dependencies
pip install -r requirements.txt

# Create .env in the project root
SECRET_KEY=your_jwt_secret_key
DATABASE_URL=postgresql://username:password@localhost/db_name

# Apply database migrations
flask db upgrade

# Start the backend server
flask run
```  
##### Runs on http://127.0.0.1:5000

---
### 4. Frontend Setup

```bash
# Open a terminal for frontend
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

These are already included in `package.json` and they are already installed during 4. Frontend setup.



