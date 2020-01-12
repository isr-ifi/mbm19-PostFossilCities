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

        onLoadState() {
            Utils.fetchGameData(name).then(res => {
                res.loading = false;
                this.setState(res);
            });
        }

        onUpdateState() {
            this.onLoadState();
        }
    }

    gameStateStoreCache[name] = {actions: storeActions, store: GameStateStore};
    return gameStateStoreCache[name];
}

module.exports = GameStateStoreFactory;
