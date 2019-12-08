import random

def getData(kind, year):
    random.seed(kind)
    initValue = random.randrange(0, 1000)
    decrease = random.randint(0, 1) == 1
    values = {2020: initValue}
    for i in range(2021, year + 1):
        if (decrease):
            values.update({i : (values[i - 1] + random.uniform(-10.0, 5))})
        else:
            values.update({i : (values[i - 1] + random.uniform(-5.0, 10))})
    return values

def getElements():
    return {
        'components': [
            {
                'name': 'PieChart',
                'parameter': [
                    {
                        'parameter': 'breakpoint',
                        'type': 'integer',
                        'value': 200
                    }, {
                        'parameter': 'width',
                        'type': 'integer',
                        'value': 500
                    }, {
                        'parameter': 'position',
                        'type': 'string',
                        'value': 'bottom'
                    }, {
                        'parameter': 'labels',
                        'type': 'dynamic',
                        'value': 'Infrastructure'
                    }
                ],
                'position': {
                    'width': 1,
                    'height': 2,
                    'x': 0,
                    'y': 0
                },
                'enabled': True,
                'toolbox': False
            }, {
                'name': 'DonutChart',
                'parameter': [],
                'position': {
                    'width': 2,
                    'height': 1,
                    'x': 1,
                    'y': 0
                },
                'enabled': True,
                'toolbox': False
            }, {
                'name': 'LineChart',
                'parameter': [],
                'position': {
                    'width': 2,
                    'height': 1,
                    'x': 1,
                    'y': 1
                },
                'enabled': True,
                'toolbox': False
            }
        ],
        'decisionCards': [],
    }
