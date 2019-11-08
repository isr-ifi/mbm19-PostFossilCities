var React = require('react');
var Reflux = require('reflux');
class TokenInput extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {token: "Enter a Token"}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({token: event.target.value});
    }

    handleSubmit(event) {
        document.cookie = "token=" + this.state.token
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' value={this.state.token} onChange={this.handleChange}/>
                <input type='submit' value='Submit'/>
            </form>
        )
    }
}

 
module.exports = TokenInput;