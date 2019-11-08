const React = require('react');
const Reflux = require('reflux')
const TokenInput = require('./TokenInput')

class Game extends Reflux.Component {
    render() {
        if (!document.cookie) {
            return <TokenInput/>
        } else {
            return <h1>{document.cookie}</h1>
        }
    }
}

 
module.exports = Game;