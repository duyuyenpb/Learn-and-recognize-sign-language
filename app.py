from flask import Flask, render_template
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

if __name__ == '__main__':
    app.run(port=3000, debug=True)