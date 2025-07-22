from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate() 

app = Flask(__name__)

# Config
dbName = 'TaskToDoDB'
secret_key = 'PrdzVUXphvAlDtKZfgy'
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:35199935@localhost/{dbName}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db and migrate and set CORS
from models import db
db.init_app(app)
migrate.init_app(app, db)  
CORS(app)

# Register blueprints
from routes.task import task_bp
app.register_blueprint(task_bp, url_prefix='/task')

if __name__ == "__main__":
    app.run(debug=True)
