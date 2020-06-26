import random
from flask_socketio import send
import threading

UPDATE_INTERVAL = 5

# Dict with all currently connected tokens
connectedTokens = {}

# Dict with semaphores for the connected users per token, if one reaches zero it can be discarded
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

    # This method emits the websocket event and sets itself a timeout to start the next later if year < 2100
    def tick(self):
        if (not self.active):
            return
        self.year = self.year + 1
        self.socketio.emit(

            # ids are based on the test configuration below, note that 'gerneric_time_series_1' is excluded because at the moment there is no random data generated
            'update', {'year': self.year, 'token': self.token, 'ids': ['test_1', 'carbon_budget_1', 'generic_rolls_1', 'rollspecific_goals_1']}, room=self.token)
        if (self.year < 2100):
            threading.Timer(UPDATE_INTERVAL, self.tick).start()

    def inactivate(self):
        self.active = False

    # Creates more or less random data based on the token and the current year
    def getData(self, kind):
        # Note that this are random data generators specifically for the component_ids from below

        # Data with out a histor of data points
        random.seed(kind + self.token + str(self.year))
        if (kind == 'test_1'):
            return {"value": random.randrange(0, 400)}
        if (kind == 'rollspecific_goals_1'):
            return {
                "politics":           {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "population":         {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "investor":           {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "energy":             {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "planer":             {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "niche":              {"value": random.randrange(0, 1), "speed": random.randint(0, 5)},
                "industry":           {"value": random.randrange(0, 1), "speed": random.randint(0, 5)}
            }
        if (kind == 'carbon_budget_1'):
            gauge = {
                "cumulated_emissions":    random.randint(0, 1500),
                "critical_emissions":     1500,
                "years_left":             2100 - self.year,
                "year_speed":             5,
            }

            # TODO: Generate random Data
            area = {
                "today":                  '01 Jan 2030',
                "min":                    0,
                "max":                    100,
                "timeseries": [{
                    "label":                      'Haushalte',
                    "values": [{
                        "date":                   1577833200000,
                        "value":                  31.31
                    }, {
                        "date":                   1609455600000,
                        "value":                  14.35
                    }],
                    "capturing":                  False
                }, {
                    "label":                      'CO2 Rückgewinnung',
                    "values": [{
                        "date":                   1577833200000,
                        "value":                  15.03
                    }, {
                        "date":                   1609455600000,
                        "value":                  11.06
                    }],
                    "capturing":                  True
                }, {
                    "label":                      'Transport',
                    "values": [{
                        "date":                   1577833200000,
                        "value":                  31.31
                    }, {
                        "date":                   1609455600000,
                        "value":                  24.35
                    }],
                    "capturing":                  False
                }, {
                    "label":                      'Industrie',
                    "values": [{
                        "date":                   1577833200000,
                        "value":                  10.03
                    }, {
                        "date":                   1609455600000,
                        "value":                  11.06
                    }],
                    "capturing":                  False
                }, {
                    "label":                      'Energy',
                    "values": [{
                        "date":                   1577833200000,
                        "value":                  20.03
                    }, {
                        "date":                   1609455600000,
                        "value":                  21.06
                    }],
                    "capturing":                  False
                }]
            }

            return {
                "area": area,
                "gauge": gauge
            }

        if (kind == 'generic_rolls_1'):
            return {
                "min": 0,
                "max": 20,
                "data": {
                    "politics":       random.randint(0, 20),
                    "energy":         random.randint(0, 20),
                    "investor":       random.randint(0, 20),
                    "population":     random.randint(0, 20),
                    "planer":         random.randint(0, 20),
                    "niche":          random.randint(0, 20),
                    "industry":       random.randint(0, 20),
                }
            }
        if (kind == 'generic_timeseries_1'):
            return {
                "today": "01 Jan 2030",
                "min": 0,
                "max": 150,
                "data": [{
                    "label": "Personenwagen",
                    "values": [{
                        "date": 1577833200000,
                        "value": 105.6
                    }, {
                        "date": 1609455600000,
                        "value": 106.8
                    }]
                }, {
                    "label": "Zug",
                    "values": [{
                        "date": 1577833200000,
                        "value": 24.2
                    }, {
                        "date": 1609455600000,
                        "value": 28.4
                    }]
                }, {
                    "label": "Bus und Tram",
                    "values": [{
                        "date": 1577833200000,
                        "value": 26.2
                    }, {
                        "date": 1609455600000,
                        "value": 56.4
                    }]
                }, {
                    "label": "Fuss und Velo",
                    "values": [{
                        "date": 1577833200000,
                        "value": 100.2
                    }, {
                        "date": 1609455600000,
                        "value": 52.4
                    }]
                }]
            }

        # Fallback
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

# Regsiters a new client for a given token and returns the corresponding Dummy Data Object


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

# Remove a client from a given token, if it was the last token remove the DummyData Object and inactivate it


def removeDummyDataObject(token):
    if (token in connectedTokens and token in connectedTokensCounter):
        connectedTokensCounter.update(
            {token: connectedTokensCounter.get(token) - 1})
        if (connectedTokensCounter.get(token) == 0):
            connectedTokens.pop(token).inactivate()
    else:
        connectedTokensCounter.pop(token)
        connectedTokens.pop(token).inactivate()

# Returns the Config for a given token


def getElements(token):

    # Currently retunrns the same config for all tokens
    return {
        "gameConfiguration": [
            {
                "id": "1",
                "views": [
                    {
                        "id": "1",
                        "components": [
                            {
                                "position": {"width": 4, "height": 4, "x": 0, "y": 0},
                                "type": 'generic_value',
                                "title": 'Anzahl Autos',
                                "id": 'test_1',
                                "parameters": {
                                    "settings": {
                                        "min":                0,
                                        "max":                400,
                                        "unit":               'Tausend',
                                        "separator":          '',
                                        "colors": {
                                            "start":          {"r": 191, "g": 80, "b": 81},
                                            "end":            {"r": 166, "g": 204, "b": 82}
                                        },
                                        "color_shift":        True,
                                        "symbol_unit":        '',
                                    },
                                    "value":                  300.4,
                                },
                            },
                            {
                                "position": {"width": 4, "height": 4, "x": 4, "y": 0},
                                "type": 'rollspecific_goals',
                                "title": 'Erfüllungsgrad der Rollenzieless',
                                "id": 'rollspecific_goals_1',
                                "parameters": {
                                    "goals": {
                                        "politics":           'Belietheit der Politik',
                                        "energy":             'Energie-_versorgungsgrad',
                                        "investor":           'ROI',
                                        "population":         'Wohlbefinden',
                                        "planer":             'Ökologische Infrastuktur',
                                        "niche":              'Einfluss der Nischenspieler',
                                        "industry":           'Profit der Industrie'
                                    },
                                    "settings": {
                                        "colors": {
                                            "politics":       ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"],
                                            "energy":         ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"],
                                            "investor":       ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"],
                                            "population":     ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"],
                                            "planer":         ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"],
                                            "niche":          ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"],
                                            "industry":       ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"],
                                        },
                                        "round_caps":         True,
                                        "high_contrast":      True,
                                    },
                                }

                            },
                            {
                                "position": {"width": 4, "height": 4, "x": 8, "y": 0},
                                "type": 'carbon_budget',
                                "title": 'Carbon Budget 1',
                                "id": 'carbon_budget_1',
                                "parameters": {
                                    "carbon_gauge": {
                                        "title":                  'Emissionen seit 2020',
                                        "unit":                   'Megatonnen',
                                        "emissions_label":        'Kumulierte Emissionen',
                                        "critical_label":         'Kritischer Wert',
                                        "year_label": [
                                            'Noch',
                                            'Jahre'
                                        ],
                                        "settings": {
                                            "colors": {
                                                "light":          "rgba(94, 77, 50, 1)",
                                                "dark":           "rgba(41, 21, 7, 1)"
                                            }
                                        }
                                    },
                                    "carbon_area": {
                                        "title":                  'Jährliche CO2 Quellen',
                                        "y_axis":                 'Megatonnen CO2',
                                        "settings": {
                                            "colors": [
                                                {
                                                    "label":          "Haushalte",
                                                    "color":          ["rgba(106, 180, 236, 1)", "rgb(231,241,255)"],
                                                    "capturing":      False,
                                                }, {
                                                    "label":          "CO2 Rückgewinnung",
                                                    "color":          ["rgba(146, 28, 227, 1)", "rgb(201,163,227)"],
                                                    "capturing":      True,
                                                }, {
                                                    "label":          "Transport",
                                                    "color":          ["rgba(199, 70, 40, 1)", "rgb(255,236,234)"],
                                                    "capturing":      False,
                                                }, {
                                                    "label":          "Industrie",
                                                    "color":          ["rgba(167, 193, 85, 1)", "rgb(243,255,240)"],
                                                    "capturing":      False,
                                                }, {
                                                    "label":          "Energy",
                                                    "color":          ["rgba(249, 200, 52, 1)", "rgb(249,239,223)"],
                                                    "capturing":      False,
                                                }
                                            ],
                                            "lines":                  8,
                                            "thickness":              2
                                        }
                                    },
                                    "data_carbon_gauge": {
                                        "cumulated_emissions":    0,
                                        "critical_emissions":     1500,
                                        "years_left":             10,
                                        "year_speed":             5,
                                    },
                                    "data_carbon_area": {
                                        "today":                  '01 Jan 2030',
                                        "min":                    0,
                                        "max":                    100,
                                    },
                                }
                            },
                            {
                                "position": {"width": 6, "height": 4, "x": 0, "y": 4},
                                "type": 'generic_rolls',
                                "title": 'Getätigte klimarelevante Massnahmen',
                                "id": 'generic_rolls_1',
                                "parameters": {
                                    "title":          "Getätigte klimarelevante Massnahmen",
                                    "yAxis":          "Anzahl",
                                    "min":            0,
                                    "max":            25,
                                    "settings": {
                                        "politics":       ["rgba(199, 70, 40, 1)", "rgba(225, 116, 47, 1)"],
                                        "energy":         ["rgba(249, 200, 52, 1)", "rgba(255, 248, 86, 1)"],
                                        "investor":       ["rgba(90, 98, 100, 1)", "rgba(162, 170, 172, 1)"],
                                        "population":     ["rgba(38, 111, 46, 1)", "rgba(167, 193, 85, 1)"],
                                        "planer":         ["rgba(27, 73, 191, 1)", "rgba(106, 180, 236, 1)"],
                                        "niche":          ["rgba(85, 44, 244, 1)", "rgba(146, 28, 227, 1)"],
                                        "industry":       ["rgba(79, 54, 36, 1)", "rgba(181, 143, 96, 1)"],
                                    }
                                }
                            },
                            {
                                "position": {"width": 6, "height": 4, "x": 6, "y": 4},
                                "type": 'GENERIC_TIMESERIES',
                                "title": 'Verkehrsmittel im Personenverkehr',
                                "id": 'generic_timeseries_1',
                                "parameters": {
                                    "title":      "Genutzte Verkehrsmittel im Personenverkehr",
                                    "today":      "01 Jan 2030",
                                    "y_axis":     "Millionen Personenkilometer",
                                    "min":      0,
                                    "max":      200,
                                    "settings": {
                                        "colors": [
                                            {
                                                "label": "Personenwagen",
                                                "color": "rgba(199, 70, 40, 1)"
                                            }, {
                                                "label": "Bus und Tram",
                                                "color":  "rgba(27, 73, 191, 1)"
                                            }, {
                                                "label": "Zug",
                                                "color":  "rgba(146, 28, 227, 1)"
                                            }, {
                                                "label": "Fuss und Velo",
                                                "color":  "rgba(38, 111, 46, 1)"
                                            }],
                                        "lines":  9
                                    },
                                }
                            },
                            {
                                "position": {"width": 6, "height": 12, "x": 10, "y": 4},
                                "type": 'donut_chart',
                                "title": 'Test',
                                "id": 'donut_chart',
                                "enabled": True,
                                "toolbox": False,
                                "parameters": [
                                    {
                                        "parameter": "modelA",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.PublicVehicles"
                                    },
                                    {
                                        "parameter": "modelB",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.PrivateVehicles"
                                    },
                                    {
                                        "parameter": "modelC",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.OtherBuildings"
                                    },
                                    {
                                        "parameter": "modelD",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.ResidentialBuildings"
                                    },
                                    {
                                        "parameter": "modelE",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.Industry"
                                    },
                                    {
                                        "parameter": "valueA--modelA--value.3.value",
                                        "type": "dependent",
                                        "value": "440"
                                    },
                                    {
                                        "parameter": "valueB--modelB--value.3.value",
                                        "type": "dependent",
                                        "value": "554"
                                    },
                                    {
                                        "parameter": "valueC--modelC--value.3.value",
                                        "type": "dependent",
                                        "value": "552"
                                    },
                                    {
                                        "parameter": "valueD--modelD--value.3.value",
                                        "type": "dependent",
                                        "value": "433"
                                    },
                                    {
                                        "parameter": "valueE--modelE--value.3.value",
                                        "type": "dependent",
                                        "value": "224"
                                    }
                                ],
                            },
                            {
                                "type": 'donut_chart_2',
                                "title": 'Test',
                                "id": 'donut_chart2',
                                "parameters": [
                                    {
                                        "parameter": "title",
                                        "type": "string",
                                        "value": "Stock in Tons of Materials"
                                    },
                                    {
                                        "parameter": "firstFillStyle",
                                        "type": "string",
                                        "value": "verticalLines"
                                    },
                                    {
                                        "parameter": "secondFillStyle",
                                        "type": "string",
                                        "value": "squares"
                                    },
                                    {
                                        "parameter": "thirdFillStyle",
                                        "type": "string",
                                        "value": "horizontalLines"
                                    },
                                    {
                                        "parameter": "fourthFillStyle",
                                        "type": "string",
                                        "value": "circles"
                                    },
                                    {
                                        "parameter": "fiftFillStyle",
                                        "type": "string",
                                        "value": "slantedLines"
                                    },
                                    {
                                        "parameter": "modelA",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.PublicVehicles"
                                    },
                                    {
                                        "parameter": "modelB",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.PrivateVehicles"
                                    },
                                    {
                                        "parameter": "modelC",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.OtherBuildings"
                                    },
                                    {
                                        "parameter": "modelD",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.ResidentialBuildings"
                                    },
                                    {
                                        "parameter": "modelE",
                                        "type": "dynamic",
                                        "value": "aum.mfa.out.Industry"
                                    },
                                    {
                                        "parameter": "valueA--modelA--value.1.value",
                                        "type": "dependent",
                                        "value": "24"
                                    },
                                    {
                                        "parameter": "valueB--modelB--value.1.value",
                                        "type": "dependent",
                                        "value": "75"
                                    },
                                    {
                                        "parameter": "valueC--modelC--value.1.value",
                                        "type": "dependent",
                                        "value": "95"
                                    },
                                    {
                                        "parameter": "valueD--modelD--value.1.value",
                                        "type": "dependent",
                                        "value": "43"
                                    },
                                    {
                                        "parameter": "valueE--modelE--value.1.value",
                                        "type": "dependent",
                                        "value": "42"
                                    }
                                ],
                                "position": {
                                    "width": 6,
                                    "height": 12,
                                    "x": 1,
                                    "y": 14
                                },
                                "enabled": True,
                                "toolbox": False
                            }
                        ]
                    }
                ]
            }
        ]
    }
