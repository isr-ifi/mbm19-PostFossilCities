from flask import Flask, Response, render_template, url_for, redirect, jsonify

app = Flask(__name__, static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/index.html")
def hello():
    return app.send_static_file('src/index.html')

@app.route("/build/app.js")
def helloJs():
    return app.send_static_file('build/app.js')

@app.route('/')
def index():
    return redirect('index.html')

@app.route('/method/myMethodName')
def helloMethod():
    return jsonify({
        "value": "Hello From Server"
    })

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)