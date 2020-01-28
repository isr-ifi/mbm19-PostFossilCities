import React from 'react';
import {connect} from 'react-redux';
import {checkToken} from '../actions/ReduxActions';
import TokenInput from'./TokenInput';
import GameGrid from './GameGrid';

class GameVisible extends React.Component {
    render() {
        if (this.props.loading) {
            return <p>loading</p>
        } else if (this.props.valid) {
            return <GameGrid/>
        } else {
            return <TokenInput callBack={this.props.callBack}/>
        }
    }
}

const mapStateToProps = state => {
    return {
        loading: state.token.loading || state.config.loading,
        valid: state.token.valid,
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        callBack: token => {
            dispatch(checkToken(token))
        }
    }
}

/**
 * Root Component, renders either token input or display elements
 */
const Game = connect(mapStateToProps, mapDispatchToProps)(GameVisible);
export default Game