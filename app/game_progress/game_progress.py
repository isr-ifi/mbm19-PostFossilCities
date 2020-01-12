from flask import Blueprint, jsonify, request, current_app
from utils.utils import getConnectedToken
game_progress = Blueprint('game_progress', __name__)

@game_progress.route('/', defaults = {'valueName': 'co2Budget'})
@game_progress.route('/getValues/<valueName>')
def getProgress(valueName):
    token = request.args.get('token')
    dataObject = getConnectedToken(token)
    result = {'data': dataObject.getData(valueName)}
    result.update({'valid': True})
    result.update({'token': token})
    return jsonify(result)
