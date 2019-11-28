const React = require('react');
const Component = React.Component;

const ReactChartJS2 = require('react-chartjs-2');
const Chart = ReactChartJS2.Chart;
const Line = ReactChartJS2.Line;


var data = {
    today: '',
    labels: [],
    datasets: {}
};

var ts = [];

var position = 1;

function generateTimeSeries (number, length) {
    for (let i = 0; i < number; i++) {
        const s = [];

        var q = 0;

        for (let j = 0; j < length; j++) {
            q = Math.round(q + 5 * Math.random() + 10 / Math.random());
            s.push(q)
        }
        ts.push(s);
        ts.push(s)
    }
}


function getLabels(){
    let labels = [];

    for (let i = 2020; i <= 2100; i++) {
        labels.push(i+'')
    }
    return labels
}

function generateData(setNumber){
    let data = [];

    Array.prototype.push.apply(data, ts[setNumber].slice(0, position));

    return data
}

function generateForecastData(setNumber){
    let data = [];


    for (let i = 0; i < position-1; i++) {
        data.push(null)
    }

    Array.prototype.push.apply(data, ts[setNumber].slice(position-1, ));



    return data
}

function generateDataSets(seriesLabels, length) {
    let datasets = [];

    for (let i = 0; i < seriesLabels.length; i++) {

        let set = {
            label: seriesLabels[i],
            data: generateData(i),
            fill: false
        };



        datasets.push(set)
    }

    return datasets
}


function generateForecastDataSets(seriesLabels, start, max, length) {
    let datasets = [];

    for (let i = 0; i < seriesLabels.length; i++) {

        let set = {
            label: seriesLabels[i],
            data: generateForecastData(i*2),
            borderDash: [5,5],
            fill: false
        };

        datasets.push(set)
    }

    return datasets
}


function getData() {

    generateTimeSeries(2, 80);

    var labels = getLabels();

    var today = labels[position-1];
    console.log(today);

    var seriesLabels = ["A", "B"];
    var seriesForecastLabels = ["A Forecast", "B Forecast"];

    var datasets = generateDataSets(seriesLabels);
    var forecastDatasets = generateForecastDataSets(seriesForecastLabels, 0, labels.length);

    var d = [];

    d.push(datasets[0]);
    d.push(forecastDatasets[0]);
    d.push(datasets[1]);
    d.push(forecastDatasets[1]);

    data.today = today;
    data.labels = labels;
    data.datasets = d;

    position = position + 1;

    return data;
}

function updateDataSets() {

    let length = data.datasets.length;

    for (let i = 0; i < length; i = i + 2) {
        data.datasets[i].data = generateData(i);
    }

    for (let i = 1; i < length; i = i + 2) {

        data.datasets[i].data = generateForecastData(i);
    }

    position = position + 1;

    return data.datasets;
}

function updateData() {
    data.datasets = updateDataSets();
    data.today = parseInt(data.today) + 1 + "";

    return data;
}

/**
 *
 * Line Chart that displays timeseries
 *
 */
class LineChartWithForecast extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.lines = [1];
        this.state = {
            test: this.props.data,
            data: getData()
        };

        this.annos = this.annos.bind(this);
        this.options = this.options.bind(this);
        this.getChartData = this.getChartData.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

    }


    componentDidMount() {
        // window.setInterval(() => {

        //     this.setState({
        //         data: updateData()
        //     });

        //     console.log(this.state.data);


        //     let lineChart = this.reference.chartInstance;

        //     lineChart.update()

        // }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let lineChart = this.reference.chartInstance;

        lineChart.update()
    }

    annos(today)  {
        var as = [];

        var a = {
            type: 'line',
            id: 'vline',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: today,
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

        as.push(a);

        return as

    };

    options (){

        const options = {
            annotation: {
                drawTime: 'afterDatasetsDraw',
                annotations:
                    this.annos(this.state.data.today)

            },
            animation: {
              duration: 0
            },
            legend: {
                display: true
            },

            elements: {
                point: {
                    radius: 0
                }
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        autoSkip: true,
                        minRotation: 90
                    }
                }]
            },


            responsive: true
        };

        return options
    };


    setGradientColor (canvas, color) {
        const ctx = canvas.getContext('2d');
        const gradient = ctx. createLinearGradient(0, 0, 600, 550);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, "rgba(133, 122, 144, 0.5)");

        return gradient
    };

    getChartData (canvas) {

        const data = this.state.data;

        if (data.datasets) {
            let colors = ["rgba(255, 0, 255, 0.75)","rgba(255, 0, 255, 0.75)", "rgba(100, 222, 255, 0.75)", "rgba(100, 222, 255, 0.75)"];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderColor = this.setGradientColor(canvas, colors[i]);
                set.borderWidth = 2;
            })
        }

        console.log(data);

        return data

    };

    changeHandler(value) {
        this.chart.update();
    }


    render() {
        return (
            <div style={{position: "relative", width: 600, height: 550}}>

                <Line
                    options={this.options()}
                    data={this.getChartData}
                    ref = {(reference) => this.reference = reference}
                    redraw
                />

            </div>
        )
    }


}


module.exports = LineChartWithForecast;

