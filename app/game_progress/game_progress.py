from flask import Blueprint, jsonify, request, current_app
from utils.utils import getData
game_progress = Blueprint('game_progress', __name__)

@game_progress.route('/', defaults = {'valueName': 'co2Budget'})
@game_progress.route('/getValues/<valueName>')
def getProgress(valueName):
    year = int(request.args.get('year'))
    token = request.args.get('token')
    result = {'data': getData(valueName, year)}
    result.update({'valid': True})
    result.update({'token': token})
    return jsonify(result)
