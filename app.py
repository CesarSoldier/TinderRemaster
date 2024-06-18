from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from config import Config
from models import db, User, Like, Match
import os
from datetime import datetime
import secrets

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# Configuração da chave secreta
app.secret_key = secrets.token_hex(16)

# Todas as rotas para cada tela do projeto
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
        email = request.form.get('email')
        password = request.form.get('password')
        new_user = User(email=email, password=password)
        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('profile', user_id=new_user.id))
        except Exception as e:
            db.session.rollback()
            return f"An error occurred while adding the user: {e}"
    users = User.query.all()
    return render_template('users.html', users=users)


@app.route('/profile/<int:user_id>', methods=['GET', 'POST'])
def profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return "User not found.", 404

    if request.method == 'POST':
        first_name = request.form.get('first-name')
        last_name = request.form.get('last-name')
        birthday_str = request.form.get('birthday')

        # Convertendo string para data
        try:
            if birthday_str:
                birthday = datetime.strptime(birthday_str, '%Y-%m-%d').date()
            else:
                birthday = None
        except ValueError:
            return "Invalid date format. Please use YYYY-MM-DD."

        # Atualizar o usuário no banco de dados
        user.first_name = first_name
        user.last_name = last_name
        user.birthday = birthday
        try:
            db.session.commit()
            return redirect(url_for('iam', user_id=user.id))
        except Exception as e:
            db.session.rollback()
            return f"An error occurred while updating the user: {e}"

    return render_template('profile.html', user=user)


@app.route('/iam/<int:user_id>', methods=['GET', 'POST'])
def iam(user_id):
    user = User.query.get(user_id)
    if not user:
        return "User not found", 404

    if request.method == 'POST':
        gender = request.form.get('gender')

        # Atualizar o gênero do usuário no banco de dados
        user.gender = gender
        try:
            db.session.commit()
            return redirect(url_for('passions', user_id=user.id))
        except Exception as e:
            db.session.rollback()
            return f"An error occurred while updating the user: {e}"

    return render_template('iam.html', user=user)


@app.route('/save_gender/<int:user_id>', methods=['POST'])
def save_gender(user_id):
    gender = request.form.get('gender')
    user = User.query.get(user_id)

    if not user:
        return "User not found", 404

    if not gender:
        return "Gender not provided", 400

    user.gender = gender
    db.session.commit()

    return redirect(url_for('next_page'))


@app.route('/passions/<int:user_id>', methods=['GET', 'POST'])
def passions(user_id):
    user = User.query.get(user_id)
    if not user:
        return "User not found", 404

    if request.method == 'POST':
        interests = request.form.getlist('interests')  # Supondo que você esteja enviando uma lista de interesses

        # Salvar os interesses do usuário no banco de dados
        user.interests = ','.join(interests)
        try:
            db.session.commit()
            return redirect(url_for('main', user_id=user.id))  # Substitua 'next_page' pelo próximo endpoint
        except Exception as e:
            db.session.rollback()
            return f"An error occurred while updating the user: {e}"

    return render_template('passions.html', user=user)


@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        session['user_id'] = user.id
        return redirect(url_for('main', user_id=user.id))
    else:
        return "User not found", 404


@app.route('/main/<int:user_id>', methods=['GET', 'POST'])
def main(user_id):
    user = User.query.get(user_id)
    if not user:
        return "User not found", 404

    # Obter um usuário aleatório diferente do usuário logado
    random_user = User.query.filter(User.id != user_id).order_by(db.func.random()).first()

    if request.method == 'POST' and 'like_user_id' in request.form:
        like_user_id = int(request.form['like_user_id'])

        # Verificar se já existe um like do usuário logado para o usuário curtido
        existing_like = Like.query.filter_by(user_id=user_id, liked_user_id=like_user_id).first()
        if existing_like:
            return "Você já curtiu este usuário antes."

        # Criar um novo like
        new_like = Like(user_id=user_id, liked_user_id=like_user_id)
        db.session.add(new_like)

        # Verificar se existe um match com o usuário curtido
        existing_match = Like.query.filter_by(user_id=like_user_id, liked_user_id=user_id).first()
        if existing_match:
            # Criar um novo match
            new_match = Match(user1_id=user_id, user2_id=like_user_id)
            db.session.add(new_match)

        db.session.commit()

        return redirect(url_for('main', user_id=user_id))

    return render_template('main.html', user=user, random_user=random_user)


@app.route('/like/<int:user_id>/<int:liked_user_id>', methods=['POST'])
def like(user_id, liked_user_id):
    try:
        # Verificar se já existe um like do usuário para o usuário curtido
        existing_like = Like.query.filter_by(user_id=user_id, liked_user_id=liked_user_id).first()
        if existing_like:
            return "Você já curtiu este usuário antes."

        # Criar um novo like
        new_like = Like(user_id=user_id, liked_user_id=liked_user_id)
        db.session.add(new_like)

        # Verificar se existe um match com o usuário curtido
        existing_match = Like.query.filter_by(user_id=liked_user_id, liked_user_id=user_id).first()
        if existing_match:
            # Criar um novo match
            new_match = Match(user1_id=user_id, user2_id=liked_user_id)
            db.session.add(new_match)

        db.session.commit()

        return jsonify({'message': 'Like realizado com sucesso.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/match')
def match():
    return render_template('match.html')


@app.route('/matches')
def matches():
    return render_template('matches.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/next_user', methods=['GET'])
def next_user():
    # Obter o próximo usuário de alguma maneira (exemplo usando SQLAlchemy)
    next_user = User.query.first()  # Isso é um exemplo simples, você pode ajustar conforme necessário

    if next_user:
        user_data = {
            'first_name': next_user.first_name,
            'last_name': next_user.last_name,
 # Suponha que seu modelo tenha um campo 'profile_pic_url'
        }
        return jsonify(user_data)
    else:
        return jsonify({'error': 'No more users found'}), 404


if __name__ == '__main__':
    with app.app_context():
        if not os.path.exists(os.path.join(app.config['BASE_DIR'], 'app.db')):
            db.create_all()
    app.run(debug=True)
