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
### 2. Frontend Setup

```bash
cd frontend
npm install        
npm run dev        
```
##### Start the frontend dev server, runs on http://localhost:5173.
---
### 3. Backend Setup

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

### ⚙️ Prerequisites

Make sure the following are installed on your system before running the project:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v9 or later)
- [Python](https://www.python.org/) (v3.10+ recommended)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (make sure it's running and accessible)



