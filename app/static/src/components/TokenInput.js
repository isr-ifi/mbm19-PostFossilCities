import React from 'react';

/**
 * Component for Entering token, will be fullscreen
 */
class TokenInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {token: "Enter a Token"}
    }

    handleChange(event) {
        this.setState({token: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.callBack(this.state.token);
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type='text' value={this.state.token} onChange={(event) => this.handleChange(event)}/>
                <input type='submit' value='Submit'/>
            </form>
        )
    }
}
 
export default TokenInput;