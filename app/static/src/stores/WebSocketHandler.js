const GameStateAcions = require('../actions/GameStateActions');
const updateInterval = 5000;

let currentYear = 2020;

let increase = () => {
    GameStateAcions.updateState(currentYear);
    currentYear = currentYear + 1;
    if (currentYear <= 2100) {
       setTimeout(increase, updateInterval);
    }
}

module.exports = {start: increase};
