import random
from flask_socketio import send
import threading

UPDATE_INTERVAL = 5
connectedTokens = {}
connectedTokensCounter = {}


def getConnectedTokens():
    return connectedTokens


def getConnectedToken(token):
    return connectedTokens.get(token)


class DummyData:
    def __init__(self, token, socketio):
        self.token = token
        self.year = 2020
        self.socketio = socketio
        self.active = True
        self.tick()

    def tick(self):
        if (not self.active):
            return
        self.year = self.year + 1
        self.socketio.emit(
            'update', {'year': self.year, 'token': self.token}, room=self.token)
        if (self.year < 2100):
            threading.Timer(UPDATE_INTERVAL, self.tick).start()

    def inactivate(self):
        self.active = False

    def getData(self, kind):
        random.seed(kind + self.token)
        initValue = random.randrange(0, 1000)
        decrease = random.randint(0, 1) == 1
        values = {2020: initValue}
        for i in range(2021, self.year + 1):
            if (decrease):
                values.update({i: (values[i - 1] + random.uniform(-10.0, 5))})
            else:
                values.update({i: (values[i - 1] + random.uniform(-5.0, 10))})
        return values

    def getElements(self):
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
                        'width': 2,
                        'height': 5,
                        'x': 0,
                        'y': 0
                    },
                    'enabled': True,
                    'toolbox': False
                }, {
                    'name': 'DonutChart',
                    'parameter': [],
                    'position': {
                        'width': 4,
                        'height': 2,
                        'x': 2,
                        'y': 0
                    },
                    'enabled': True,
                    'toolbox': False
                }, {
                    'name': 'LineChart',
                    'parameter': [],
                    'position': {
                        'width': 4,
                        'height': 3,
                        'x': 2,
                        'y': 2
                    },
                    'enabled': True,
                    'toolbox': False
                }
            ],
            'decisionCards': [],
        }


def getDummyDataObject(token, socketio):
    if (token in connectedTokensCounter):
        connectedTokensCounter.update(
            {token: connectedTokensCounter.get(token) + 1})
    else:
        connectedTokensCounter.update({token: 1})

    if (token in connectedTokens):
        return connectedTokens.get(token)
    else:
        dummyData = DummyData(token, socketio)
        connectedTokens.update({token: dummyData})
        return connectedTokens.get(token)


def removeDummyDataObject(token):
    if (token in connectedTokens and token in connectedTokensCounter):
        connectedTokensCounter.update(
            {token: connectedTokensCounter.get(token) - 1})
        if (connectedTokensCounter.get(token) == 0):
            connectedTokens.pop(token).inactivate()
    else:
        connectedTokensCounter.pop(token)
        connectedTokens.pop(token).inactivate()


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
                    'width': 2,
                    'height': 5,
                    'x': 0,
                    'y': 0
                },
                'enabled': True,
                'toolbox': False
            }, {
                'name': 'DonutChart',
                'parameter': [],
                'position': {
                    'width': 4,
                    'height': 2,
                    'x': 2,
                    'y': 0
                },
                'enabled': True,
                'toolbox': False
            }, {
                'name': 'LineChart',
                'parameter': [],
                'position': {
                    'width': 4,
                    'height': 3,
                    'x': 2,
                    'y': 2
                },
                'enabled': True,
                'toolbox': False
            }
        ],
        'decisionCards': [],
    }
