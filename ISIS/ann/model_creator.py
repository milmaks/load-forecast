from datetime import datetime
import time
from ann.custom_plotting import CustomPloting
from ann.scorer import Scorer
from ann.ann_regression import AnnRegression
from data.database import DataBase
from ann.custom_preparer import CustomPreparer

NUMBER_OF_COLUMNS = 12
SHARE_FOR_TRAINING = 0.85

class ModelCreator:
    def __init__(self):
        self.database = DataBase()

    def start_model_training(self):
        self.dataframe = self.load_data()
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



    def load_data(self):
        print("Load data started", datetime.now())
        dataframe = self.database.get_pandas_dataframe()
        print("Load data finished", datetime.now())
        return dataframe

    
    def prepare_data(self):
        return self.preparer.prepare_for_training()

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
    