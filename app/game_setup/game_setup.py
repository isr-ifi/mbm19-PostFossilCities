from flask import Blueprint

game_setup = Blueprint('game_setup', __name__)

@game_setup.route('/')
@game_setup.route('/getSetup')
def getSetup():
    return "This would be the game setup"