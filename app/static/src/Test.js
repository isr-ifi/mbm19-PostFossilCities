var React = require('react');
 
var TestMessage = require('./TestMessage');

class Test extends React.Component {
    render() {
        return (
            <TestMessage></TestMessage>
        )
    }
}

 
module.exports = Test;