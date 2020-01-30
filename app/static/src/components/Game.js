import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkToken } from '../actions/ReduxActions';
import TokenInput from './TokenInput';
import GameGrid from './GameGrid';

/**
 * Based on the redux state render a token input field or the components
 * @param {Object} props 
 */
export default function Game(props) {
    const loading = useSelector(state => state.token.loading || state.config.loading);
    const valid = useSelector(state => state.token.valid);
    const dispatch = useDispatch();
    if (loading) {
        return <p>loading</p>;
    } else if (valid) {
        return <GameGrid />;
    } else {
        return <TokenInput callBack={token => dispatch(checkToken(token))} />;
    }
}
