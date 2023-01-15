from datetime import date
import datetime
import json
import math
from numbers import Number
import zoneinfo
from astral import LocationInfo
from flask import jsonify
import numpy as np
from simplex_module import Simplex
from database import DataBase
from astral.sun import elevation
import requests
from scipy.interpolate import UnivariateSpline

endpoint = 'http://localhost:5000'
url = endpoint + '/api/test'

class OptimizationModule:
    def __init__(self):
        self.database = DataBase()
        self.simplex = Simplex()
        self.model = None
        self.coal_generators = None
        self.gas_generators = None
        self.solar_generators = None
        self.wind_generators = None
        self.hydro_generators = None
        self.fuel_criteria = None
        self.co2_criteria = None
        self.coal_expanditure = None
        self.gas_expanditure = None

    def set_parameters(self, optimization_parametes):
        self.model = optimization_parametes['model']

        if (str(optimization_parametes['criteria']) == '0'):
            self.fuel_criteria = 1
            self.co2_criteria = 0
        if (str(optimization_parametes['criteria']) == '1'):
            self.fuel_criteria = 0
            self.co2_criteria = 1
        if (str(optimization_parametes['criteria']) == '2'):
            self.fuel_criteria = 1
            self.co2_criteria = 1    

        self.coal_generators = optimization_parametes['coalGenerators']
        self.simplex.coal_generators = optimization_parametes['coalGenerators']
        self.gas_generators = optimization_parametes['gasGenerators']
        self.simplex.gas_generators = optimization_parametes['gasGenerators']
        self.solar_generators = optimization_parametes['solarGenerators']
        self.wind_generators = optimization_parametes['windGenerators']
        self.hydro_generators = optimization_parametes['hydroGenerators']
        self.simplex.hydro_generators = optimization_parametes['hydroGenerators']
    
    def optimize(self):
        print('OPTIMIZATION')
        data = {'model': self.model, 'days': 1, 'date': '2021-09-07'}
        response = requests.post(url, data)
        loads = (json.JSONDecoder().decode(response.text))['data']
        
        weather_data = self.load_weather_data("2021","9","7")

        year = 2021
        month = 9
        day = 7

        results = {}
        for gen in self.coal_generators:
            results[gen['name']] = []
        for gen in self.gas_generators:
            results[gen['name']] = []
        for gen in self.wind_generators:
            results[gen['name']] = []
        for gen in self.solar_generators:
            results[gen['name']] = []
        for gen in self.hydro_generators:
            results[gen['name']] = []

        solar_results = []
        wind_results = []
        for i in range(24):
            hour = i
    
            solar_production_per_gen = []
            solar_production = 0
            for gen in self.solar_generators:
                prod = self.calculate_solar_generation(weather_data[i][6], gen['tiltAngle'], gen['efficiency'], gen['area'], weather_data[i][4], year, month, day, hour)
                solar_production_per_gen.append(prod)
                solar_production += prod

            solar_results.append(solar_production_per_gen)

            wind_production_per_gen = []
            wind_production = 0
            for gen in self.wind_generators:
                prod = self.calculate_wind_generation(weather_data[i][5], gen['maxPower'])
                wind_production_per_gen.append(prod * gen['numOfTurbines'])
                wind_production += prod

            wind_results.append(wind_production_per_gen)

            target_load = loads[i] - solar_production - wind_production

            res = self.simplex.solve(target_load, self.fuel_criteria, self.co2_criteria)

            results[self.coal_generators[0]['name']].append(round(res[0] * self.coal_generators[0]['power'], 2))
            results[self.coal_generators[1]['name']].append(round(res[1] * self.coal_generators[1]['power'], 2))
            results[self.coal_generators[2]['name']].append(round(res[2] * self.coal_generators[2]['power'], 2))
            results[self.coal_generators[3]['name']].append(round(res[3] * self.coal_generators[3]['power'], 2))
            results[self.gas_generators[0]['name']].append(round(res[4] * self.gas_generators[0]['power']))
            results[self.gas_generators[1]['name']].append(round(res[5] * self.gas_generators[1]['power']))
            results[self.gas_generators[2]['name']].append(round(res[6] * self.gas_generators[2]['power']))
            results[self.gas_generators[3]['name']].append(round(res[7] * self.gas_generators[3]['power']))
            results[self.hydro_generators[0]['name']].append(round(res[8] * self.hydro_generators[0]['power'], 2))
            results[self.solar_generators[0]['name']].append(round(solar_production_per_gen[0], 2))
            results[self.wind_generators[0]['name']].append(round(wind_production_per_gen[0], 2))

        fuel_res = {}
        for index, gen in enumerate(results):
            if 'C' not in str(gen) and 'G' not in str(gen):
                continue
            fuel_res[gen+'_fuel'] = []
            for prod in results[gen]:
                if 'C' in gen:          #coal
                    fuel_res[gen+'_fuel'].append(self.calculate_coal_expanditure(prod) * self.coal_generators[index]['power'] * self.coal_generators[index]['fuelPrice']/1000)
                if 'G' in gen:          #gas
                    fuel_res[gen+'_fuel'].append(self.calculate_gas_expanditure(prod) * self.gas_generators[index%4]['power'] * self.gas_generators[index%4]['fuelPrice']/1000)

        co2_res = {}
        for index, gen in enumerate(results):
            if 'C' not in str(gen) and 'G' not in str(gen):
                continue
            co2_res[gen+'_co2'] = []
            for prod in results[gen]:
                if 'C' in gen:          #coal
                    co2_res[gen+'_co2'].append(prod * self.coal_generators[index]['power'] * self.coal_generators[index]['co2'] / 1000)
                if 'G' in gen:          #gas
                    co2_res[gen+'_co2'].append(prod * self.gas_generators[index%4]['power'] * self.gas_generators[index%4]['co2'] / 1000)            

        for res in fuel_res:
            results[res] = fuel_res[res]
        for res in co2_res:
            results[res] = co2_res[res]

        return results

    def calculate_coal_expanditure(self, prod):
        if self.coal_expanditure is None:
            x = np.array([0, 1])
            y = np.array([0, 378])

            self.coal_expanditure = UnivariateSpline(x,y,k=1,s=0)
        
        return self.coal_expanditure(prod)
    
    def calculate_gas_expanditure(self, prod):
        if self.gas_expanditure is None:
            conv_rate_to_m3 = 35.31466672
            x =  np.array([0, 0.25, 0.5, 0.75, 1])
            y = np.array([0, 4482/conv_rate_to_m3, 7332/conv_rate_to_m3, 10147/conv_rate_to_m3, 12780/conv_rate_to_m3])

            self.gas_expanditure = UnivariateSpline(x,y,k=1,s=0)
        
        return self.gas_expanditure(prod) / 1000


    def load_weather_data(self, year, month, day):
        return self.database.get_weather_data(year, month, day)

    def load_weather_data_to_db(self):
        self.database.load_all_weather_data()

    def calculate_wind_generation(self, wind_speed, max_power):
        val = 0
        if wind_speed < 3:
            val = 0
        
        if wind_speed >= 3 and wind_speed < 12:
            val = 11.11 * wind_speed - 33.33
        
        if wind_speed >= 12 and wind_speed < 14:
            val = max_power
        
        if wind_speed >= 14 and wind_speed < 25:
            val = -2.72 * wind_speed + 138.182
        
        if wind_speed >= 25:
            val = 0
        
        return val

    def calculate_solar_generation(self, solar_radiation, panel_angle, eff, area, temp, year, month, day, hour):
        if solar_radiation == 0:
            return 0

        city = LocationInfo("New York","New York","America/New_York", 40.7527, -73.9772)
        tz = zoneinfo.ZoneInfo("America/New_York")
        dateandtime = datetime.datetime(int(year), int(month), int(day), int(hour))
        print(dateandtime)
        sun_angle = elevation(city.observer, dateandtime=dateandtime, with_refraction=False)

        #s_mod = (solar_radiation * math.sin(sun_angle + panel_angle) / math.sin(sun_angle))
        s_mod = solar_radiation
        temp = (temp - 32) * 5/9
        return ((eff / 100) * s_mod * area * (1 - 0.005 * (temp - 25))) / 1000
        


