from keras.layers import Dense
from keras.models import Sequential
import numpy as np
from tensorflow import keras
from ann.ann_base import AnnBase

MODEL_NAME = 'models/model_ver2_test'

class AnnRegression(AnnBase):
    def get_model(self):
        model = Sequential()
        if self.number_of_hidden_layers > 0:                                              #sweet magic value
           model.add(Dense(self._number_of_neurons_in_first_hidden_layer, input_shape=(1, 15), kernel_initializer=self.kernel_initializer, activation=self.activation_function))
           if self.number_of_hidden_layers > 1:
               for i in range(self.number_of_hidden_layers - 2):
                   model.add(Dense(self.number_of_neurons_in_other_hidden_layers, kernel_initializer=self.kernel_initializer, activation=self.activation_function))
        model.add(Dense(self.number_of_neurons_in_other_hidden_layers, kernel_initializer='he_normal', activation='relu'))
        model.add(Dense(1, kernel_initializer=self.kernel_initializer))
        return model

    def get_model_from_path(self, path):
        model = keras.models.load_model(path)
        return model

    def compile_and_fit(self, trainX, trainY):
        self.model = self.get_model()
        self.model.compile(loss=self.cost_function, optimizer=self.optimizer)
        self.trainX = trainX
        self.model.fit(trainX, trainY, epochs=self.epoch_number, batch_size=self.batch_size_number, verbose=self.verbose)
        self.model.save(MODEL_NAME)

    def use_current_model(self, path):
        self.model = self.get_model_from_path(path)

    def get_predict(self, testX):
        trainPredict = self.model.predict(self.trainX)
        testPredict = self.model.predict(testX)
        return trainPredict, testPredict

    def get_predict2(self, testX):
        testPredict = []
        lastDayLoad = []
        lastDayAvgLoad = 0
        for index, hour in enumerate(testX):
            hour = np.reshape(hour, (hour.shape[0], 1, hour.shape[1]))
            
            if index != 0:
                hour[0][0][13] = val
            if index > 23:
                hour[0][0][14] = lastDayAvgLoad
            
            val = self.model.predict(hour)
            testPredict.append(val)

            lastDayLoad.append(val)
            if (index + 1) % 24 == 0:
                lastDayAvgLoad = sum(lastDayLoad)/len(lastDayLoad)
                lastDayLoad.clear()

        testPredict = self.model.predict(testX)
        return testPredict

    def compile_fit_predict(self, trainX, trainY, testX):
        self.compile_and_fit(trainX, trainY)
        return self.get_predict(testX)

    def predict(self, path, testX):     
        self.use_current_model(path)
        return self.get_predict2(testX)
            
    
