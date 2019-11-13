from flask import Blueprint

game_setup = Blueprint('game_setup', __name__)

@game_setup.route('/')
@game_setup.route('/getSetup/<token>')
def getSetup(token):
    return "This would be the game setup for " + token