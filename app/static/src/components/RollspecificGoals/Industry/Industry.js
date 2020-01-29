import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faAngleUp, faMinus, faAngleDoubleDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import VerticalBar from "../Elements/VerticalBar";

import step_1 from './img/Industry_1.svg'
import step_2 from './img/Industry_2.svg'
import step_3 from './img/Industry_3.svg'
import step_4 from './img/Industry_4.svg'
import step_5 from './img/Industry_5.svg'



class Planer extends React.Component {

    constructor(props) {
        super(props);

        this.settings = {
            title: "Test",

            show_infographic: true,
            show_progress: true,
            show_flow: true
        };

        this.state = {
            progress: 0,
            steps: [
                step_1,
                step_2,
                step_3,
                step_4,
                step_5
            ],
            step_nr: 0,
        }

    }

    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => ({
                progress:
                    (prevState.progress + Math.floor(Math.random() * 1) + 1) % 100

            }));

            if (this.state.progress < 20) {
                this.setState({step_nr: 0})
            } else if (this.state.progress < 40) {
                this.setState({step_nr: 1})
            } else if (this.state.progress < 60) {
                this.setState({step_nr: 2})
            } else if (this.state.progress < 80) {
                this.setState({step_nr: 3})
            } else {
                this.setState({step_nr: 4})
            }

        }, 200);


    }


    render(){
        return (
            <div className={"card"}>
                <div className={"card-header"}>
                    <h4>ROI</h4>
                </div>

                <div className={"row card-content"}>
                    <div className={"col goal-context col-md-10"}>
                        <img src={this.state.steps[this.state.step_nr]} className="App-logo" alt="logo" />
                    </div>

                    <div className={"col goal-chart col-md-2"}>
                        <div className={"goal-state-container"}>
                            <div className={"goal-flow"}>
                                <FontAwesomeIcon icon={ faAngleDoubleUp } />
                            </div>
                            <div className={"goal-stock"}>
                                <VerticalBar progress={this.state.progress}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Planer
