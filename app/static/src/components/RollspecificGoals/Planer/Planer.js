import React, { Component } from 'react';

import ReactSVG from 'react-svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faAngleUp, faMinus, faAngleDoubleDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import VerticalBar from "../Elements/VerticalBar";

import step_1 from './img/Infrastruktur_1.svg'
import step_2 from './img/Infrastruktur_2.svg'
import step_3 from './img/Infrastruktur_3.svg'
import step_4 from './img/Infrastruktur_4.svg'
import step_5 from './img/Infrastruktur_5.svg'

import roll_icon from '../../../icons/rolls/Planer.svg'

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
        }, 100);


    }


    render(){
        return (
            <div className={`card card-planer step_${this.state.step_nr+1}`}>
                <div className={"row card-header"}>
                    <div className={"roll-logo col-md-1"}>
                        <ReactSVG className={"roll-svg"} src={roll_icon} />
                    </div>
                    <div className={"roll-title col-md-10"}>
                        <h4>Infrastruktur</h4>
                    </div>
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
                                <VerticalBar progress={this.state.progress} roll={"planer"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Planer
