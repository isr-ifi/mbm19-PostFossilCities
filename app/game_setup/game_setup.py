from flask import Blueprint, jsonify, request

game_setup = Blueprint('game_setup', __name__)

@game_setup.route('/')
@game_setup.route('/getSetup')
def getSetup():
    token = request.args.get('token')
    return jsonify({
        'valid': True,
        'token': token,
        'elements': [
            {
                'name': 'elem1',
                'sizeX': 1,
                'sizeY': 1,
                'positionX': 1,
                'positiony':1
            }
        ]
    })
