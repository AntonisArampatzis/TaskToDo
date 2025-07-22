from models import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class Tasks(db.Model):
    __tablename__ = 'tasks' 

    task_id =  db.Column(UUID(as_uuid=True), primary_key=True,default=uuid.uuid4,nullable=False)
    task = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)