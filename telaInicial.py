from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    slide1 = ['girl1-left.png', 'girl1.png', 'girl1-right.png']
    slide2 = ['girl2-left.png', 'girl2.png', 'girl2-right.png']
    slide3 = ['girl3-left.png', 'girl3.png', 'girl3-right.png']
    slides = [slide1, slide2, slide3]
    return render_template('telaInicial.html', slides=slides)

if __name__ == '__main__':
    app.run(debug=True)




    #slides = ['girl1.png', 'girl2.png', 'girl3.png']
    #return render_template('telaInicial.html', slides=slides)

    #slide1 = ['girl1-left.png', 'girl1.png', 'girl1-right.png']
    #slide2 = ['girl2-left.png', 'girl2.png', 'girl2-right.png']
    #slide3 = ['girl3-left.png', 'girl3.png', 'girl3-right.png']
    #slides = [slide1, slide2, slide3]
    #return render_template('telaInicial.html', slides=slides)