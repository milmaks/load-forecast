
class Load:
    def __init__(self, row):
        self.date = row['DateShort']
        self.time_from = row['TimeFrom']
        self.time_to = row['TimeTo']
        self.load = row['Load']
        