from flask import Blueprint

game_progress = Blueprint('game_progress', __name__)

@game_progress.route('/', defaults = {'valueName': 'co2Budget'})
@game_progress.route('/getValues/<valueName>')
def getProgress(valueName):
    return "This would be the value for " + valueName