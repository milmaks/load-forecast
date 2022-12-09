import os
import xlrd
import pandas as pd
from datetime import datetime

class DataPreprocessor:
    def __init__(self, files_folder_path):
        self.files_folder_path = files_folder_path
        self.town = 'N.Y.C.'

    def load_from_fs(self):
        loads = []
        start = datetime.now()
        for id, dirs in enumerate(os.walk("D:\\Studije\\5\\ISIS\Training Data\\NYS Load  Data")):
            if(id == 0):
                continue
            for file in dirs[2]:
                load_data = pd.read_csv(os.path.join(dirs[0], file))
                for i in range(len(load_data.index)):
                    load_object = load_data.iloc[i]
                    if(((load_object['Time Stamp'])[-8:]).strip() == '00:00:00' and load_object['Name'].strip() == self.town):
                        #loads.append(load_object)   
                        print(load_object) 

        end = datetime.now()
        print((end-start).total_seconds)
            

    def process_data(self, filename):
        self.load_from_fs()
        # load_sheet = pd.read_excel(os.path.join(self.files_folder_path, filename), sheet_name='load')
        
        # for index, row in load_sheet.iterrows():
        #     print(row['DateShort'])
        #     if(index == 0):
        #         break

    