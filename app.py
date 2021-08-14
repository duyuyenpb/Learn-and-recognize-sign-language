from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/", methods=['GET'])
def home():
    return render_template('index.html')

@app.route("/about", methods=['GET'])
def about():
    return render_template('about.html')

@app.route("/communicate", methods=['GET'])
def communicate():
    return render_template('communicate.html') 

@app.route("/learn", methods=['GET'])
def learn():
    return render_template('learn.html')

@app.route("/flashcard", methods=['GET'])
def flashcard():
    return render_template('flashcard.html')

@app.route("/test", methods=['GET'])
def test():
    return render_template('test.html')
'''
@app.route("/a", methods=['GET'])
def a():
    return render_template('a.html')
@app.route("/communicate", methods=['POST'])
def communicatePost():
    if request.method == 'POST':
        name = request.form['name']
    return render_template('communicate.html', n = name)
'''
if __name__ == '__main__':
    app.run(port=3000, debug=True)