import React from 'react';
const ReactChartJS2 = require('react-chartjs-2');
const Line = ReactChartJS2.Line;

class LineGraph extends React.Component {

    constructor(props) {
        super(props);
        this.prepareData = this.prepareData.bind(this);
        this.prepareOptions = this.prepareOptions.bind(this);
        //console.log(this.state.data)

    }

    prepareOptions() {
        return {
            type: 'line',
            id: 'vline',
            mode: 'vertical',
            scaleID: 'y-axis-1',
            maintainAspectRatio: false,
            value: 2020,
            borderColor: 'black',
            borderWidth: 2,
            label: {
                enabled: true,
                position: "bottom",
                content: "  ",
                xPadding: 6,
                yPadding: 6,
                yAdjust: -10,
                cornerRadius: 10,
                fontSize: 6,
            }
        };
    }

    prepareData() {
        let {data} = this.props;
        let result = {datasets: [], labels: []};
        result.labels = Object.keys(data[Object.keys(data)[0]])
        let lastLabel = parseInt(result.labels[result.labels.length - 1]);
        for (let i = lastLabel + 1; i <= 2100 && i <= lastLabel + 10; i++) {
            result.labels.push(i);
        }
        Object.keys(data).forEach(key => {
            let dataObject = data[key]
            let dataEntries = Object.keys(dataObject).map(key => dataObject[key]);
            result.datasets.push({
                label: key,
                data: dataEntries,
                backgroundColor: "rgba(0, 255, 0, 0.75)",
                borderDash: [10,5],
                borderColor: "rgba(255, 0, 255, 0.75)",
                backgroundColor: "rgba(255, 0, 255, 0.75)",
                fill: false
            })
        })
        return result;
    }

    render() {
        return (
            <div className={"card"} style={{minWidth: '100%', minHeight: '100%'}}>
                <div className={"card-header"}>
                    <h4>{this.props.title}</h4>
                </div>

                <div className={"row card-content"} style={{flexGrow: 1}}>
                    <Line 
                        data={this.prepareData()}
                        options={this.prepareOptions()}
                        redraw
                    />

                </div>
            </div>
        )
    }

}

export default LineGraph
