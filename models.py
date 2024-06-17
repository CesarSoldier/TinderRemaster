from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    birthday = db.Column(db.Date)
    
    # Relacionamento com os matches onde o usuário é o primeiro da correspondência
    matches_as_user1 = db.relationship('Match',
                                       foreign_keys='Match.user1_id',
                                       backref='user1',
                                       lazy=True)
    
    # Relacionamento com os matches onde o usuário é o segundo da correspondência
    matches_as_user2 = db.relationship('Match',
                                       foreign_keys='Match.user2_id',
                                       backref='user2',
                                       lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    matched_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Match between User {self.user1_id} and User {self.user2_id}>'
