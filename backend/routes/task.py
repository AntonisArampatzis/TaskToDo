from flask import Blueprint,jsonify,Flask,request # type: ignore
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
    
@task_bp.route('/get-tasks', methods=['GET'])
def get_tasks():

    try:
        tasks = Tasks.query.all()

        all_tasks =[
             {
            "id": str(task.id),
            "task":task.task,
            "created_at":task.created_at.isoformat(),
            "status": task.status
        }
        for task in tasks
        ]
        

        return jsonify({'all_tasks':all_tasks}),200
    
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": "Server error"}), 400
    
@task_bp.route('/delete-task/<uuid:taskId>',methods=['DELETE'])
def delete_task(taskId):

    try:
        delete_task = Tasks.query.filter_by(id=taskId).first() 
        if not delete_task:
            return jsonify({"error":"Task not found"}), 404
        db.session.delete(delete_task)
        db.session.commit()

        return jsonify({"message":"Task deleted successfully"}), 200
    
    except Exception as e:
        print(f"Delete Error: {e}")
        return jsonify({"error": "Server error"}), 500
    

@task_bp.route('/completed/<uuid:taskId>',methods=['PATCH'])
def completed_task(taskId):

    task = Tasks.query.get(taskId)
    if not task:
        return jsonify({"error":"Task not found"}), 404
    
    task.status = "Completed"
    db.session.commit()
    return jsonify({"message":"Task completed"}), 200
