const Reflux = require('reflux')

const Utils = require('../Utils');
const GameStateActions = require('../actions/GameStateActions')

var gameStateStoreCache = {};

function GameStateStoreFactory(name) {
    if (gameStateStoreCache[name]) {
        return gameStateStoreCache[name];
    }

    const storeActions = Reflux.createActions(['loadState']);

    class GameStateStore extends Reflux.Store {
        constructor() {
            super();
            this.listenToMany(GameStateActions);
            this.listenToMany(storeActions);
            this.state = {loading: true};
        }

        onLoadState(year) {
            Utils.fetchGameData(name, year).then(res => {
                res.loading = false;
                this.setState(res);
            });
        }

        onUpdateState(year) {
            this.onLoadState(year);
        }
    }

    gameStateStoreCache[name] = {actions: storeActions, store: GameStateStore};
    return gameStateStoreCache[name];
}

module.exports = GameStateStoreFactory;
