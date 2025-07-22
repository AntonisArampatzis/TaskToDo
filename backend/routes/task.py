from flask import Blueprint,jsonify,Flask,request
from models.tasks import Tasks
from models import db

task_bp = Blueprint('task', __name__)

@task_bp.route('/add-task',methods=['POST'])
def add_task():

    data = request.get_json()
    if not data:
        return jsonify({"error":"No data sent to backend"})
    
    try:
        task = data.get('task','').strip()

        if not task:
            return jsonify({"error":"Task field cannot be empty"})
        
        new_task = Tasks(task=task)
        db.session.add(new_task)
        db.session.commit()
        
        return jsonify({"message":"New expense added successfully"}),200
    
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": "Server error"}), 400