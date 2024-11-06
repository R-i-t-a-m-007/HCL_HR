import pandas as pd

df = pd.read_csv("Sample1.csv")

units_df = df.iloc[:, 0]

x1 = [x for x in units_df if type(x) == str] # UNITS in a LIST
mines_df = df.iloc[:, 1]

x2 = [x for x in mines_df if type(x) == str] # MINES in a LIST
misc_df = df.iloc[:, -2]

x3 = list(misc_df.iloc[4:8,])

actual_features = ["Units", "Mines"] + x3
print("FEATURES :- {}".format(actual_features))