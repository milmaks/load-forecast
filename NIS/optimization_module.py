from datetime import date
import datetime
import math
import zoneinfo
from astral import LocationInfo
import pytz
from scipy.optimize import linprog
from database import DataBase
from astral.sun import elevation
import cplex


class OptimizationModule:
    def __init__(self):
        self.database = DataBase()
        self.model = None
        self.coal_generators = None
        self.gas_generators = None
        self.solar_generators = None
        self.wind_generators = None
        self.hydro_generators = None

    def set_parameters(self, optimization_parametes):
        self.model = optimization_parametes['model']
        self.coal_generators = optimization_parametes['coalGenerators']
        self.gas_generators = optimization_parametes['gasGenerators']
        self.solar_generators = optimization_parametes['solarGenerators']
        self.wind_generators = optimization_parametes['windGenerators']
        self.hydro_generators = optimization_parametes['hydroGenerators']

    def optimize(self):
        print('optimization')
        loads = [
            6817.272023972265,
            6644.364583744144,
            6368.130785551232,
            6126.998999906405,
            6013.796141753042,
            6151.390204113815,
            6378.863084059503,
            7278.270122329932,
            7519.013316779688,
            7715.586600052004,
            7927.146418934229,
            8099.232608327269,
            8268.191842321414,
            8391.023927722283,
            8465.69518740398 ,
            8475.182688356328,
            8517.15625       ,
            8389.49513352117 ,
            8310.053328660662,
            8240.041898990541,
            7777.595254525948,
            7585.12686529185 ,
            7616.374929113199,
            7666.262040953411,
        ]

        weather_data = self.load_weather_data("2021","9","7")
    
        year = weather_data[0][0]
        month = weather_data[0][1]
        day = weather_data[0][2]
        hour = weather_data[0][3]

        #check if it is possible to ajust to percentages
        solar_production_per_gen = []
        solar_production = 0
        for gen in self.solar_generators:
            prod = self.calculate_solar_generation(weather_data[0][6], gen['tiltAngle'], gen['efficiency'], 5500, weather_data[0][4], year, month, day, hour)
            solar_production_per_gen.append(prod)
            solar_production += prod

        print(solar_production_per_gen)
        print(solar_production)  
    
        wind_production_per_gen = []
        wind_production = 0
        for gen in self.wind_generators:
            prod = self.calculate_wind_generation(weather_data[0][5], gen['maxPower'])
            wind_production_per_gen.append(prod * gen['numOfTurbines'])
            wind_production += prod

        print(wind_production_per_gen)
        print(wind_production) 

        target_load = loads[0] - solar_production - wind_production

        c = [
            (self.coal_generators[0]['fuelPrice'] + self.coal_generators[0]['co2']),    #x0
            (self.coal_generators[1]['fuelPrice'] + self.coal_generators[1]['co2']),    #x1
            (self.coal_generators[2]['fuelPrice'] + self.coal_generators[2]['co2']),    #x2
            (self.coal_generators[3]['fuelPrice'] + self.coal_generators[3]['co2']),    #x3
            (self.gas_generators[0]['fuelPrice'] + self.gas_generators[0]['co2']),      #x4      
            (self.gas_generators[1]['fuelPrice'] + self.gas_generators[1]['co2']),      #x5
            (self.gas_generators[2]['fuelPrice'] + self.gas_generators[2]['co2']),      #x6
            (self.gas_generators[3]['fuelPrice'] + self.gas_generators[3]['co2']),      #x7
            (0.00001 + 0.00001),                                                        #x8
        ]

        A_eq = [[self.coal_generators[0]['power'],
            self.coal_generators[1]['power'],
            self.coal_generators[2]['power'],
            self.coal_generators[3]['power'],
            self.gas_generators[0]['power'],
            self.gas_generators[1]['power'],
            self.gas_generators[2]['power'],
            self.gas_generators[3]['power'],
            self.hydro_generators[0]['power']
        ]]
        b_eq = [target_load]

        x0_bounds = (0.75, 1)
        x1_bounds = (0.75, 1)
        x2_bounds = (0.75, 1)
        x3_bounds = (0.75, 1)
        x4_bounds = (0.75, 1)
        x5_bounds = (0.75, 1)
        x6_bounds = (0.75, 1)
        x7_bounds = (0.75, 1)
        x8_bounds = (0.75, 1)

        integrality = [2, 2, 2, 2, 2, 2, 2, 2, 2]
        bounds = [x0_bounds, x1_bounds, x2_bounds, x3_bounds, x4_bounds, x5_bounds, x6_bounds, x7_bounds, x8_bounds]

        res = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs', integrality=integrality)
        print(res)

        return
        problem = cplex.Cplex()
        
        # SELECT SIMPLEX NOT LINEAR PROGRAMING (https://www.ibm.com/mysupport/s/question/0D55000005khHueCAE/how-to-configure-cplex-opl-to-use-simplex-method?language=en_US)(https://www.ibm.com/docs/en/icos/12.8.0.0?topic=parameters-algorithm-continuous-linear-problems)
        problem.parameters.lpmethod = 1

        # We want to find a minimum of our objective function
        problem.objective.set_sense(problem.objective.sense.minimize)

        # The names of our variables
        names = ["c1", "c2", "c3", "c4", "g1", "g2", "g3", "g4", "h1"]

        # The obective function. More precisely, the coefficients of the objective
        # function. Note that we are casting to floats.
        objective = [
            (self.coal_generators[0]['fuelPrice'] + self.coal_generators[0]['co2']),    #x0
            (self.coal_generators[1]['fuelPrice'] + self.coal_generators[1]['co2']),    #x1
            (self.coal_generators[2]['fuelPrice'] + self.coal_generators[2]['co2']),    #x2
            (self.coal_generators[3]['fuelPrice'] + self.coal_generators[3]['co2']),    #x3
            (self.gas_generators[0]['fuelPrice'] + self.gas_generators[0]['co2']),      #x4      
            (self.gas_generators[1]['fuelPrice'] + self.gas_generators[1]['co2']),      #x5
            (self.gas_generators[2]['fuelPrice'] + self.gas_generators[2]['co2']),      #x6
            (self.gas_generators[3]['fuelPrice'] + self.gas_generators[3]['co2']),      #x7
            (0.00001 + 0.00001),                                                        #x8
        ]

        # Lower bounds, all zeroes is the default.
        lower_bounds = [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
        upper_bounds = [1, 1, 1, 1, 1, 1, 1, 1, 1]

        types = [problem.variables.type.semi_continuous] * len(names)

        problem.variables.add(obj = objective,
                      lb = lower_bounds,
                      ub = upper_bounds,
                      names = names,
                      types = types)
        
        constraint_names = ["const1"]

        # The first constraint is entered by referring to each variable by its name
        # (which we defined earlier)
        first_constaint = [
            ["c1", "c2", "c3", "c4", "g1", "g2", "g3", "g4", "h1"],
            [self.coal_generators[0]['power'],
            self.coal_generators[1]['power'],
            self.coal_generators[2]['power'],
            self.coal_generators[3]['power'],
            self.gas_generators[0]['power'],
            self.gas_generators[1]['power'],
            self.gas_generators[2]['power'],
            self.gas_generators[3]['power'],
            self.hydro_generators[0]['power']
        ]]
        
        constraints = [first_constaint]

        # So far we haven't added a right hand side, so we do that now. Note that the
        # first entry in this list corresponds to the first constraint, and so-on.
        rhs = [target_load]
        # We need to enter the senses of the constraints. That is, we need to tell Cplex
        # whether each constrains should be treated as an upper-limit (≤, denoted "L"
        # for less-than), a lower limit (≥, denoted "G" for greater than) or an equality
        # (=, denoted "E" for equality)
        constraint_senses = ["E"]

        # And add the constraints
        problem.linear_constraints.add(lin_expr = constraints,
                                    senses = constraint_senses,
                                    rhs = rhs,
                                    names = constraint_names)

        # Solve the problem
        problem.solve()

        # And print the solutions
        print(problem.solution.get_values())


        return

    def callback(self, result):
        print('-------------CALLBACK-------------')
        print(result)
        print('----------------------------------')

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

        s_mod = (solar_radiation * math.sin(sun_angle + panel_angle) / math.sin(sun_angle))
        temp = (temp - 32) * 5/9
        return ((eff / 100) * s_mod * area * (1 - 0.005 * (temp - 25))) / 1000
        


