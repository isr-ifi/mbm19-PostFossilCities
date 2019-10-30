const React = require('react');
const Reflux = require('reflux');
const Utils = require('./Utils')

class TestMessageStore extends Reflux.Store
{
    constructor() {
        super();
        this.state = {value:'Hello From Local'};
        Utils.fetchData("/method/myMethodName").then(result => this.setState({value: result.value}))
    }
}

class TestMessage extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = TestMessageStore;
  }

  render() {
    return <div>Hallöle another Test: {this.state.value}</div>;
  }
}

module.exports = TestMessage;