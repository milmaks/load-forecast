import cplex
from graph_aproximation_module import Aproximation
from pulp import *

class Simplex():
    def __init__(self):
        self.graph_aproximation = Aproximation()
        self.something = None
        self.coal_generators = None
        self.gas_generators = None
        self.hydro_generators = None
        self.fuel_criteria = None
        self.co2_criteria = None
        self.last_hour_res = [0,0,0,0,0,0,0,0,0]

    def prepare(self):
        self.graph_aproximation.calculate_functions(self.coal_generators)
        self.graph_aproximation.calculate_functions(self.gas_generators)

    def solve(self, target_load, fuel_criteria, co2_criteria):
        self.prepare()

        self.fuel_criteria = fuel_criteria * 1.0
        self.co2_criteria = co2_criteria * 1.0

        lower_bounds = [0,0,0,0,0,0,0,0,0]
        finished = False
        sol = []

        while(not(finished)):
            sol = self.simplex_calculation(target_load, lower_bounds)
            finished = True
            for index, val in enumerate(sol):
                if(val < 0.75 and val != 0):
                    lower_bounds[index] = 0.75
                    finished = False

        return sol

        #return self.simplex_calculation1(target_load)

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

    def simplex_calculation1(self, target_load):
        problem = cplex.Cplex()

        # SELECT SIMPLEX NOT LINEAR PROGRAMING 
        # (https://www.ibm.com/mysupport/s/question/0D55000005khHueCAE/how-to-configure-cplex-opl-to-use-simplex-method?language=en_US)
        # (https://www.ibm.com/docs/en/icos/12.8.0.0?topic=parameters-algorithm-continuous-linear-problems)
        problem.parameters.lpmethod = 1

        # We want to find a minimum of our objective function
        problem.objective.set_sense(problem.objective.sense.minimize)

        # The names of our variables
        names = ["c1", "c2", "c3", "c4", "g1", "g2", "g3", "g4", "h1"]

        last_hour_res_index = 0
        # The obective function. More precisely, the coefficients of the objective
        # function. Note that we are casting to floats.
        objective = []
        for gen in self.coal_generators:
            value = self.fuel_criteria * self.graph_aproximation.functions['f'+gen['name']+'_$_to_MW'](self.last_hour_res[last_hour_res_index]) * gen['fuelPrice'] +\
                    self.co2_criteria * self.graph_aproximation.functions['f'+gen['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+gen['name']+'_Co2_to_MW'](self.last_hour_res[last_hour_res_index])) * gen['co2'] * gen['power'] / 1000
            objective.append(value)
            last_hour_res_index += 1
        
        for gen in self.gas_generators:
            value = self.fuel_criteria * self.graph_aproximation.functions['f'+gen['name']+'_$_to_MW'](self.last_hour_res[last_hour_res_index]) * gen['fuelPrice'] +\
                    self.co2_criteria * self.graph_aproximation.functions['f'+gen['name']+'_$_to_Co2'](self.graph_aproximation.functions['f'+gen['name']+'_Co2_to_MW'](self.last_hour_res[last_hour_res_index])) * gen['co2'] * gen['power'] / 1000
            objective.append(value)
            last_hour_res_index += 1
        
        for gen in self.hydro_generators:
            objective.append(self.fuel_criteria * gen['cost'])

        # Lower bounds, all zeroes is the default.
        lower_bounds = [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
        upper_bounds = [1, 1, 1, 1, 1, 1, 1, 1, 1]

        types = [problem.variables.type.semi_continuous] * len(names)

        problem.variables.add(obj=objective,
                            lb=lower_bounds,
                            ub=upper_bounds,
                            names=names,
                            types=types)

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
        problem.linear_constraints.add(lin_expr=constraints,
                                    senses=constraint_senses,
                                    rhs=rhs,
                                    names=constraint_names)


        # Solve the problem
        problem.solve()

        # And print the solutions
        return problem.solution.get_values()
