import os
import pandas
import pyodbc
import pandas as pd

class DataBase:
    def __init__(self):
        database_con = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                                      'Server=(localdb)\mssqllocaldb;'
                                      'Database=load_forecast;'
                                      'Trusted_Connection=yes;')
        cursor = database_con.cursor()
        # cursor.execute('DROP TABLE dbo.Weather')
        # cursor.execute(
	    #                     'CREATE TABLE dbo.Weather ('
        #                         'Year smallint not null,'
		#                         'Month tinyint not null,'
        #                         'Day tinyint not null,'
        #                         'Hour tinyint not null,'
        #                         'Temp real not null,'
		#                         'WindSpeed real not null,'
        #                         'SolarRadiation smallint not null'
	    #                     ')')
        cursor.execute('SELECT TOP(5) * FROM dbo.Weather')
        for row in cursor:
            print(row)
        database_con.commit()
        cursor.close()
        database_con.close()

    def connect(self):
        return pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                                      'Server=(localdb)\mssqllocaldb;'
                                      'Database=load_forecast;'
                                      'Trusted_Connection=yes;')


    def load_all_weather_data(self):
        for id, dirs in enumerate(os.walk("D:\\Studije\\5\\NIS\\Data")):
            for file in dirs[2]:
                weather_data = pd.read_csv(os.path.join(dirs[0], file))
                for i in range(len(weather_data.index)):
                    weather_object = weather_data.iloc[i]
                    #loads_date = datetime.strptime(weather_object['datetime'], '%Y-%m-%dT%H:%M:%S').replace(' ', 'T')

                    self.write_to_db(int(weather_object['datetime'][0:4]), int(weather_object['datetime'][5:7]), int(weather_object['datetime'][8:10]), int(weather_object['datetime'][11:13]), weather_object['temp'], weather_object['windspeed'], weather_object['solarradiation'])

    def write_to_db(self, year, month, day, hour, temp, wind_speed, solar_radiation):
        if str(wind_speed) == 'nan':
            wind_speed = 0
        if str(solar_radiation) == 'nan':
            solar_radiation = 0
        
        sql = 'INSERT INTO dbo.Weather (Year, Month, Day, Hour, Temp, WindSpeed, SolarRadiation) VALUES ({},{},{},{},{},{},{})'.format(year, month, day, hour, temp, wind_speed, solar_radiation)
        #print(sql)
        
        database_con = self.connect()
        cursor = database_con.cursor()

        cursor.execute(sql)
        database_con.commit()
        cursor.close()
        database_con.close()
    
    def get_weather_data(self, year, month, day):
        database_con = self.connect()
        cursor = database_con.cursor()

        sql = 'SELECT * FROM dbo.Weather WHERE Year={} and Month={} and Day={}'.format(year, month, day)
        rows = cursor.execute(sql)
        ret = []
        for val in rows:
            ret.append(val)

        cursor.close()
        database_con.close()
        return ret