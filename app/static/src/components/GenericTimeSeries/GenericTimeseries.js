import React from 'react';

import LineChartWithForecast from './LineChartWithForecast';

class GenericTimeseries extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: ['2017-08-01', '2017-08-02', '2017-08-03', '2017-08-04', '2017-08-05', '2017-08-06', '2017-08-07', '2017-08-08', '2017-08-09', '2017-08-10'],
                datasets: [
                    {
                        label: "A",
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data: [10, 20, 50, 60, 80, , , , , ],
                        fill: false
                    },
                    {
                        label: "A Forecast",
                        backgroundColor: "rgba(255, 0, 255, 0.75)",
                        data: [, , , , 80, 100, 120, 150, 180, 210],
                        borderDash: [10,5],
                        fill: false
                    },
                    {
                        label: "B",
                        backgroundColor: "rgba(0, 255, 0, 0.75)",
                        data: [123, 120, 105, 97, 85, , , , , ],
                        fill: false
                    },
                    {
                        label: "B Forecast",
                        backgroundColor: "rgba(0, 255, 0, 0.75)",
                        data: [, , , , 85, 70, 55, 30, 25, 20],
                        borderDash: [10,5],
                        fill: false
                    }
                ]
            }
        };

        //console.log(this.state.data)

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={"card"}>
                <div className={"card-header"}>
                    <h4>Generic Timeseries</h4>
                </div>

                <div className={"row card-content"}>

                    {/*<LineChartWithForecast elementWidth={600} elementHeight={270} data={this.state.data}/> */ }
                    <LineChartWithForecast />

                </div>
            </div>
        )
    }

}

module.exports = GenericTimeseries
