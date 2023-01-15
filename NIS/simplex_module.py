from pulp import *
from graph_aproximation_module import Aproximation
from scipy.optimize import linprog
import time

class Simplex():
    def __init__(self):
        self.graph_aproximation = Aproximation()
        self.something = None
        self.coal_generators = None
        self.gas_generators = None
        self.hydro_generators = None
        self.fuel_criteria = None
        self.co2_criteria = None

    def prepare(self):
        self.graph_aproximation.calculate_functions(self.coal_generators)
        self.graph_aproximation.calculate_functions(self.gas_generators)

    def solve(self, target_load, fuel_criteria, co2_criteria):
        self.prepare()
        self.fuel_criteria = fuel_criteria
        self.co2_criteria = co2_criteria

        lower_bounds = [0,0,0,0,0,0,0,0,0]
        finished = False
        current_res = [0,0,0,0,0,0,0,0,0]
        

        # while(not finished):
        #     simplex_res = self.simplex_calculation(target_load, current_res, lower_bounds)
        #     current_res = simplex_res.x
        #     finished = True

        #     for index, res in enumerate(current_res):
        #         if res < 0.75 and res != 0:
        #             lower_bounds[index] = 0.75
        #             current_res[index] = 0.75
        #             finished = False
            
        #     finished = finished and simplex_res.success
        #     time.sleep(2)

        sol = []
        while(not(finished)):
            sol = self.simplex_calculation(target_load, lower_bounds)
            finished = True
            for index, val in enumerate(sol):
                if(val < 0.75 and val != 0):
                    lower_bounds[index] = 0.75
                    finished = False

        return sol

    # def simplex_calculation(self, target_load, dec_variable_guess, lower_bounds):
    #     c = [
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_MW'](dec_variable_guess[0]) * self.coal_generators[0]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[0])) * self.coal_generators[0]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_MW'](dec_variable_guess[1]) * self.coal_generators[1]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[1])) * self.coal_generators[1]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_MW'](dec_variable_guess[2]) * self.coal_generators[2]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[2])) * self.coal_generators[2]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_MW'](dec_variable_guess[3]) * self.coal_generators[3]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[3])) * self.coal_generators[3]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_MW'](dec_variable_guess[4]) * self.gas_generators[0]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[4])) * self.gas_generators[0]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_MW'](dec_variable_guess[5]) * self.gas_generators[1]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[5])) * self.gas_generators[1]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_MW'](dec_variable_guess[6]) * self.gas_generators[2]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[6])) * self.gas_generators[2]['co2']),
    #         (self.fuel_criteria*self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_MW'](dec_variable_guess[7]) * self.gas_generators[3]['fuelPrice'] + \
    #         self.co2_criteria*self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](dec_variable_guess[7])) * self.gas_generators[3]['co2']),
    #         (self.hydro_generators[0]['cost'])
    #     ]

    #     A_eq = [[
    #         self.coal_generators[0]['power'],
    #         self.coal_generators[1]['power'],
    #         self.coal_generators[2]['power'],
    #         self.coal_generators[3]['power'],
    #         self.gas_generators[0]['power'],
    #         self.gas_generators[1]['power'],
    #         self.gas_generators[2]['power'],
    #         self.gas_generators[3]['power'],
    #         self.hydro_generators[0]['power']]
    #     ]

    #     b_eq = [target_load]

    #     x0_bounds = (lower_bounds[0], 1)
    #     x1_bounds = (lower_bounds[1], 1)
    #     x2_bounds = (lower_bounds[2], 1)
    #     x3_bounds = (lower_bounds[3], 1)
    #     x4_bounds = (lower_bounds[4], 1)
    #     x5_bounds = (lower_bounds[5], 1)
    #     x6_bounds = (lower_bounds[6], 1)
    #     x7_bounds = (lower_bounds[7], 1)
    #     x8_bounds = (lower_bounds[8], 1)

    #     bounds = [x0_bounds, x1_bounds, x2_bounds, x3_bounds,
    #         x4_bounds, x5_bounds, x6_bounds, x7_bounds, x8_bounds]

    #     res = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, x0=dec_variable_guess,
    #                 method='revised simplex', options={'maxiter': 5})

    #     print('-----------------------------------------------------------------')
    #     print(res)
    #     print(dec_variable_guess)
    #     print(lower_bounds)
    #     print('-----------------------------------------------------------------')
    #     # if res.success:
    #     #     print(res.success)
    #     #     print('\033[92m', res.x, '\033[0m')
    #     #     print(dec_variable_guess)
    #     #     print(lower_bounds)
    #     #     print(res.message)
    #     # else:
    #     #     print('\033[91m', res.x, '\033[0m')
    #     #     print(dec_variable_guess)
    #     #     print(lower_bounds)
    #     return res

    def simplex_calculation(self, target_load, lower_bound):
        # Create the 'prob' variable to contain the problem data
        prob = LpProblem("Simple LP Problem", LpMinimize)

        # Create problem variables
        x0 = LpVariable("x0", lower_bound[0], 1)
        x1 = LpVariable("x1", lower_bound[1], 1)
        x2 = LpVariable("x2", lower_bound[2], 1)
        x3 = LpVariable("x3", lower_bound[3], 1)
        x4 = LpVariable("x4", lower_bound[4], 1)
        x5 = LpVariable("x5", lower_bound[5], 1)
        x6 = LpVariable("x6", lower_bound[6], 1)
        x7 = LpVariable("x7", lower_bound[7], 1)
        x8 = LpVariable("x8", lower_bound[8], 1)
        

        # The objective function is added to 'prob' first
        if self.fuel_criteria == 1 and self.co2_criteria == 1:
            prob += (self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_MW'](x0.varValue) * self.coal_generators[0]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x0.varValue)) * self.coal_generators[0]['co2']) * x0 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_MW'](x1.varValue) * self.coal_generators[1]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x1.varValue)) * self.coal_generators[1]['co2']) * x1 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_MW'](x2.varValue) * self.coal_generators[2]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x2.varValue)) * self.coal_generators[2]['co2']) * x2 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_MW'](x3.varValue) * self.coal_generators[3]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x3.varValue)) * self.coal_generators[3]['co2']) * x3 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_MW'](x4.varValue) * self.gas_generators[0]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x4.varValue)) * self.gas_generators[0]['co2']) * x4 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_MW'](x5.varValue) * self.gas_generators[1]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x5.varValue)) * self.gas_generators[1]['co2']) * x5 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_MW'](x6.varValue) * self.gas_generators[2]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x6.varValue)) * self.gas_generators[2]['co2']) * x6 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_MW'](x7.varValue) * self.gas_generators[3]['fuelPrice'] + \
                    self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x7.varValue)) * self.gas_generators[3]['co2']) * x7 + \
                    (self.hydro_generators[0]['cost']) * x8, "objective_function"
        elif self.fuel_criteria == 1:
            prob += (self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_MW'](x0.varValue) * self.coal_generators[0]['fuelPrice']) * x0 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_MW'](x1.varValue) * self.coal_generators[1]['fuelPrice']) * x1 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_MW'](x2.varValue) * self.coal_generators[2]['fuelPrice']) * x2 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_MW'](x3.varValue) * self.coal_generators[3]['fuelPrice']) * x3 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_MW'](x4.varValue) * self.gas_generators[0]['fuelPrice']) * x4 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_MW'](x5.varValue) * self.gas_generators[1]['fuelPrice']) * x5 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_MW'](x6.varValue) * self.gas_generators[2]['fuelPrice']) * x6 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_MW'](x7.varValue) * self.gas_generators[3]['fuelPrice']) * x7 + \
                    (self.hydro_generators[0]['cost']) * x8, "objective_function"
        else:
            prob += (self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x0.varValue)) * self.coal_generators[0]['co2']) * x0 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x1.varValue)) * self.coal_generators[1]['co2']) * x1 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x2.varValue)) * self.coal_generators[2]['co2']) * x2 + \
                    (self.graph_aproximation.functions['f'+self.coal_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.coal_generators[0]['name']+'_Co2_to_MW'](x3.varValue)) * self.coal_generators[3]['co2']) * x3 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x4.varValue)) * self.gas_generators[0]['co2']) * x4 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[1]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x5.varValue)) * self.gas_generators[1]['co2']) * x5 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[2]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x6.varValue)) * self.gas_generators[2]['co2']) * x6 + \
                    (self.graph_aproximation.functions['f'+self.gas_generators[3]['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+self.gas_generators[0]['name']+'_Co2_to_MW'](x7.varValue)) * self.gas_generators[3]['co2']) * x7 + \
                    (self.hydro_generators[0]['cost']) * x8, "objective_function"

        # The constraints are added to 'prob' one at a time
        prob += self.coal_generators[0]['power'] * x0 +\
                self.coal_generators[1]['power'] * x1 +\
                self.coal_generators[2]['power'] * x2 +\
                self.coal_generators[3]['power'] * x3 +\
                self.gas_generators[0]['power'] * x4 +\
                self.gas_generators[1]['power'] * x5 +\
                self.gas_generators[2]['power'] * x6 +\
                self.gas_generators[3]['power'] * x7 +\
                self.hydro_generators[0]['power'] * x8 == target_load

        # The problem data is written to an .lp file
        prob.writeLP("SimpleLP.lp")

        # The problem is solved using PuLP's choice of Solver
        prob.solve()

        # The status of the solution is printed to the screen
        print("Status:", LpStatus[prob.status])

        # Each of the variables is printed with it's resolved optimum value
        ret = []
        for v in prob.variables():
            # print(v.name, "=", v.varValue)
            ret.append(v.varValue)

        # The optimised objective function value is printed to the screen
        # print("objective_function = ", value(prob.objective))
        return ret

