import os
from flask import Flask, render_template, request, send_from_directory
app = Flask(__name__)

@app.route("/", methods=['GET'])
def home():
    return render_template('index.html')

@app.route("/about", methods=['GET'])
def about():
    return render_template('about.html')

@app.route("/learn", methods=['GET'])
def learn():
    return render_template('learn.html')

@app.route("/flashcard", methods=['GET'])
def flashcard():
    return render_template('flashcard.html')

@app.route("/test", methods=['GET'])
def test():
    return render_template('test.html')
    
if __name__ == "__main__":
    app.run(host='127.0.0.1',port=8000,debug=True)