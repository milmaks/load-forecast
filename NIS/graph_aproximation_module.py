import functools
from sre_parse import TYPE_FLAGS
import numpy as np
from scipy.interpolate import UnivariateSpline
from scipy import optimize

class Aproximation():
    def __init__(self):
        self.functions = {}
        self.functions_count = 0

    def calculate_functions(self, generators):
        for gen in generators:
            if gen['priceToPowerCurveQuadratic']:
                self.create_quadratic_function('f'+gen['name']+'_$_to_MW', gen['priceToPowerCurve'])
            else:
                self.create_linear_function('f'+gen['name']+'_$_to_MW', gen['priceToPowerCurve'])

            if gen['priceToCo2CurveQuadratic']:
                self.create_quadratic_function('f'+gen['name']+'_$_to_Co2', gen['priceToCo2Curve'])
            else:
                self.create_linear_function('f'+gen['name']+'_$_to_Co2', gen['priceToCo2Curve'])

            if gen['Co2ToPowerCurveQuadratic']:
                self.create_quadratic_function('f'+gen['name']+'_Co2_to_MW', gen['Co2ToPowerCurve'])
            else:
                self.create_linear_function('f'+gen['name']+'_Co2_to_MW', gen['Co2ToPowerCurve'])

            

    def create_linear_function(self, name, array):
        x = []
        y = []
        for element in array:
            x.append(element[0])
            y.append(element[0])

        f = UnivariateSpline(x,y,k=1,s=0)
        self.functions[name] = f

    def create_quadratic_function(self, name, array):
        def func(x, a, b, c):
            if x is None:
                x = 0
            return a * x**2 + b * x + c
        
        x = []
        y = []
        for element in array:
            x.append(element[0])
            y.append(element[0])
        x = np.array(x)
        y = np.array(y)

        popt, pcov = optimize.curve_fit(func, xdata = x, ydata = y)
        f = functools.partial(func, a = popt[0], b = popt[1], c = popt[2])
        self.functions[name] = f

        
                
    