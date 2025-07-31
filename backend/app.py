import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

db = SQLAlchemy()
migrate = Migrate() 

app = Flask(__name__)

load_dotenv()
# Config
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:353535@localhost/{dbName}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db and migrate and set CORS
from models import db
db.init_app(app)
migrate.init_app(app, db)  
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Register blueprints
from routes.task import task_bp
app.register_blueprint(task_bp, url_prefix='/task')

if __name__ == "__main__":
    app.run(debug=True)
