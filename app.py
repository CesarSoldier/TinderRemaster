from flask import Flask, render_template, request, redirect, url_for
from config import Config
from models import db, User
import os

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/')
def index():
    slide1 = ['girl1-left.png', 'girl1.png', 'girl1-right.png']
    slide2 = ['girl2-left.png', 'girl2.png', 'girl2-right.png']
    slide3 = ['girl3-left.png', 'girl3.png', 'girl3-right.png']
    slides = [slide1, slide2, slide3]
    return render_template('telaInicial.html', slides=slides)

@app.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        new_user = User(username=username, email=email)
        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('manage_users'))
        except Exception as e:
            db.session.rollback()
            return f"An error occurred while adding the user: {e}"
    users = User.query.all()
    return render_template('users.html', users=users)


if __name__ == '__main__':
    with app.app_context():
        if not os.path.exists(os.path.join(app.config['BASE_DIR'], 'app.db')):
            db.create_all()
    app.run(debug=True)
