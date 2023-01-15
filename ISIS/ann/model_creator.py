from datetime import datetime, timedelta
import os
import time
from flask import jsonify
import numpy
from ann.custom_plotting import CustomPloting
from ann.scorer import Scorer
from ann.ann_regression import AnnRegression
from data.database import DataBase
from ann.custom_preparer import CustomPreparer
import pandas as pd

NUMBER_OF_COLUMNS = 16
SHARE_FOR_TRAINING = 0.85

class ModelCreator:
    def __init__(self):
        self.database = DataBase()
        self.modelPath = ''
        self.predicted_data = []
        self.predicted_date = None

    def start_model_training(self, yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo):
        self.dataframe = self.load_data(yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo)
        self.preparer = CustomPreparer(self.dataframe, NUMBER_OF_COLUMNS, SHARE_FOR_TRAINING)
        trainX, trainY, testX, testY = self.prepare_data()
        
        # make predictions
        ann_regression = AnnRegression()
        time_begin = time.time()
        trainPredict, testPredict = ann_regression.compile_fit_predict(trainX, trainY, testX)
        time_end = time.time()
        print('Training duration: ' + str((time_end - time_begin)) + ' seconds')

        # invert predictions
        trainPredict, trainY, testPredict, testY = self.preparer.inverse_transform(trainPredict, testPredict)

        self.calculate_error(trainY, trainPredict, testY, testPredict)

        self.plot(testPredict, testY)

    def predict(self, days, yearFrom, monthFrom, dayFrom):
        self.predicted_date = datetime(yearFrom, monthFrom, dayFrom)

        date_to = datetime(yearFrom, monthFrom, dayFrom) + timedelta(days=days - 1)
        self.dataframe = self.load_test_data(yearFrom, monthFrom, dayFrom, date_to.year, date_to.month, date_to.day) 
                                                                          #SHARE_FOR_TRAINING           
        self.preparer = CustomPreparer(self.dataframe, NUMBER_OF_COLUMNS, 0)
        

        testX, testY = self.prepare_test_data()

        # make predictions
        ann_regression = AnnRegression()
        time_begin = time.time()
        testPredict = ann_regression.predict(self.get_path(), testX)

        time_end = time.time()
        print('Test done in duration: ' + str((time_end - time_begin)) + ' seconds')

        # invert predictions
        #trainPredict, trainY, testPredict, testY = self.preparer.inverse_transform(trainPredict, testPredict)
        
        testPredict = numpy.reshape(testPredict, (testPredict.shape[0]))
        
        self.predicted_data = testPredict
        #self.plot(testPredict, testY)
        rescaled_data, dates = self.scale_back()
        return jsonify({"data": rescaled_data, "dates": dates})

    def get_csv(self):
        if self.predicted_data == []:
            return {"error": "Error! No prediction!"}, 400
        
        rescaled_data, dates = self.scale_back()
        self.generate_csv(rescaled_data, dates)
        return {"data": "OK"}, 200

    def scale_back(self):
        max_orig = self.database.get_max_load()
        min_orig = self.database.get_min_load()
        max_pred = max(self.predicted_data)
        min_pred = min(self.predicted_data)
        curr_date = self.predicted_date
        dates = []
        rescaled_data = []

        for val in self.predicted_data:
            dates.append(curr_date)
            curr_date += timedelta(hours=1)
            rescaled_data.append(round((max_orig-min_orig) * (val - min_pred) / (max_pred - min_pred) + min_orig, 1))
    
        return rescaled_data, dates

    def generate_csv(self, rescaled_data, dates):
        csv_data = {'Timestamp': dates,
                    'Load': rescaled_data}
        df = pd.DataFrame(csv_data)
        column_names = ['Timestamp','Load']
        df.to_csv("result.csv", header=column_names)

    def set_path(self, path):
        self.path = path

    def get_path(self):
        return os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'models'), self.path)


    def load_data(self, yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo):
        print("Load data started", datetime.now())
        dataframe = self.database.get_pandas_dataframe(yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo, True)
        print("Load data finished", datetime.now())
        return dataframe

    def load_test_data(self, yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo):
        print("Load data started", datetime.now())
        dataframe = self.database.get_pandas_dataframe(yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo, False)
        print("Load data finished", datetime.now())
        return dataframe

    def prepare_data(self):
        return self.preparer.prepare_for_training()

    def prepare_test_data(self):
        return self.preparer.prepare_for_testing()

    def calculate_error(self, trainY, trainPredict, testY, testPredict):
        scorer = Scorer()
        trainScore, testScore = scorer.get_mse_score(trainY, trainPredict, testY, testPredict)
        print('Train Score: %.2f RMSE' % (trainScore))
        print('Test Score: %.2f RMSE' % (testScore))
        trainScore, testScore = scorer.get_mape_score(trainY, trainPredict, testY, testPredict)
        print('Train Score: %.2f MAPE' % (trainScore))
        print('Test Score: %.2f MAPE' % (testScore))

    def plot(self, testPredict, testY):
        custom_plotting = CustomPloting()
        custom_plotting.show_plots(testPredict, testY)
    