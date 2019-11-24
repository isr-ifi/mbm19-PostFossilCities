from flask import Blueprint, jsonify, request
from utils.utils import getElements

game_setup = Blueprint('game_setup', __name__)

@game_setup.route('/')
@game_setup.route('/getSetup')
def getSetup():
    token = request.args.get('token')
    return jsonify({
        'valid': True,
        'token': token,
        'elements': getElements()
    })
