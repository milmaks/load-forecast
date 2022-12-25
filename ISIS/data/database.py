import pandas
import pyodbc

from data.learning_model import LearningModel

class DataBase:
    def __init__(self):
        database_con = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                                      'Server=(localdb)\mssqllocaldb;'
                                      'Database=load_forecast;'
                                      'Trusted_Connection=yes;')
        cursor = database_con.cursor()
        # cursor.execute('DROP TABLE dbo.ModelLearningData')
        # cursor.execute('DROP TABLE dbo.AverageLoad')
        # cursor.execute(
	    #                     'CREATE TABLE dbo.ModelLearningData ('
        #                         'Year smallint not null,'
		#                         'Month tinyint not null,'
        #                         'Day tinyint not null,'
        #                         'Hour tinyint not null,'
		#                         'Temp real not null,'
		#                         'Feelslike real not null,'
		#                         'Humidity real not null,' 
		#                         'WindSpeed real not null,'
        #                         'CloudCover real not null,'
        #                         'WeeakDay tinyint not null,' 
        #                         'Daylight bit not null,'
		#                         'Load real not null'
	    #                     ')')
        # cursor.execute(
	    #                     'CREATE TABLE dbo.AverageLoad ('
        #                         'Year smallint not null,'
		#                         'Month tinyint not null,'
        #                         'Day tinyint not null,'
		#                         'AvgLoad real not null'
	    #                     ')')
        #cursor.execute('DELETE FROM dbo.ModelLearningData WHERE 1=1')
        #cursor.execute('DELETE FROM dbo.AverageLoad WHERE 1=1')
        #cursor.execute('DELETE FROM dbo.ModelLearningDataInput WHERE 1=1')
        #cursor.execute('DELETE FROM dbo.AverageLoadInput WHERE 1=1')
        #cursor.execute('SELECT TOP(5) * FROM dbo.ModelLearningData')
        # cursor.execute('SELECT TOP(5) * FROM dbo.AverageLoad')
        # for row in cursor:
        #     print(row)
        database_con.commit()
        cursor.close()
        database_con.close()

    def connect(self):
        return pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                                      'Server=(localdb)\mssqllocaldb;'
                                      'Database=load_forecast;'
                                      'Trusted_Connection=yes;')

    def add_element(self, element: LearningModel, learning: bool):
        database_con = self.connect()
        cursor = database_con.cursor()

        input = ''
        if learning == False:
            input = 'Input'

        sql = 'INSERT INTO dbo.ModelLearningData'+ input +' (Year, Month, Day, Hour, Temp, Feelslike, Humidity, WindSpeed, CloudCover, WeeakDay, Daylight, Load) ' \
              'VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {})'.format(
                element.year, element.month, element.day, element.hour, element.temp, element.feels_like, element.humidity, element.wind_speed, element.cloud_cover, element.week_day, element.daylight, element.load
              )
        cursor.execute(sql)
        database_con.commit()
        cursor.close()
        database_con.close()

    def add_average_load(self, year, month, day, avg_load, learning):
        database_con = self.connect()
        cursor = database_con.cursor()

        input = ''
        if learning == False:
            input = 'Input'

        sql = 'INSERT INTO dbo.AverageLoad' + input + ' (Year, Month, Day, AvgLoad) ' \
              'VALUES ({}, {}, {}, {})'.format(
                year, month, day, avg_load
              )
        cursor.execute(sql)
        database_con.commit()
        cursor.close()
        database_con.close()

    def get_pandas_dataframe(self, yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo):
        database_con = self.connect()
        cursor = database_con.cursor()
        #rows = cursor.execute('SELECT * FROM dbo.ModelLearningData')
        sql = 'SELECT * FROM dbo.GetScaledModelLearningData({},{},{},{},{},{})'.format(
            yearFrom, monthFrom, dayFrom, yearTo, monthTo, dayTo
        )
        rows = cursor.execute(sql)
        df = pandas.DataFrame((tuple(t) for t in rows)) 
        cursor.close()
        database_con.close()
        return df