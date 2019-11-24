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
    return [
        {
            'name': 'elem1',
            'sizeX': 1,
            'sizeY': 1,
            'positionX': 0,
            'positionY': 0,
        }, {
            'name': 'elem2',
            'sizeX': 2,
            'sizeY': 1,
            'positionX': 1,
            'positionY': 0,
        }, {
            'name': 'elem3',
            'sizeX': 3,
            'sizeY': 2,
            'positionX': 0,
            'positionY': 1,
        }
    ]
