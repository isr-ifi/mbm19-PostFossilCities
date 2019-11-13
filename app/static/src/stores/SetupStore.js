const Reflux = require('reflux');
const Utils = require('../Utils');

/**
 * Stores validity of the token and checks it
 */
class SetupStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {loading: true}
        Utils.fetchGameSetup().then(res => {
            var state = res;
            state.loading = false;
            this.setState(state);
        })
    }
}

module.exports = SetupStore;
