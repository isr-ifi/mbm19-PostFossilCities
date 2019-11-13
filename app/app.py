from flask import Flask, Response, render_template, url_for, redirect, jsonify, request
from game_setup.game_setup import game_setup
from game_progress.game_progress import game_progress

app = Flask(__name__, static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.register_blueprint(game_setup, url_prefix='/setup')
app.register_blueprint(game_progress, url_prefix='/progress')

@app.route("/index.html")
def hello():
    return app.send_static_file('src/index.html')

@app.route("/build/app.js")
def helloJs():
    return app.send_static_file('build/app.js')

@app.route('/')
def index():
    return redirect('index.html')

@app.route('/checkToken')
def checkToken():
    token = request.args.get('token')
    app.logger.info(token)
    return jsonify({
        'valid': True,
        'token': token,
    })


@app.route('/method/myMethodName')
def helloMethod():
    return jsonify({
        "value": "Hello From Server"
    })

if __name__ == "__main__":
    app.run("0.0.0.0", port=80, debug=True)