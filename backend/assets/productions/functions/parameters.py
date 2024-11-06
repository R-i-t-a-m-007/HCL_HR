import csv
from datetime import datetime
import pandas as pd
import numpy as np

def remove_first_row(input_file, output_file):
    with open(input_file, 'r', newline='') as infile:
        reader = csv.reader(infile)
        data = list(reader)
    data = data[1:]
    
    for row in data:
        del row[0]

    with open(output_file, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(data)

def capture_rows(input_file):
    with open(input_file, 'r', newline='') as infile:
        reader = csv.reader(infile)
        data = list(reader)
    
    for i in data[2]:
        if i != "":
            break
        else:
            continue
        
    datetime_obj = datetime.strptime(i, "%Y-%m-%d %H:%M:%S")
    
    formatted_str = datetime_obj.strftime("%Y-%m-%d")
    
    return formatted_str


def extract_rows_to_new_csv(input_file, date:str, output_file):
    df = pd.read_csv(input_file)
    
    data = df.iloc[2, 12:13]
    
    df = df.drop(df.index[0:2])
    
    new_columns = ['Sl.No','Units','Monthly Target Ore Grade', 'Daily Target Ore Grade', 'Daily Progress Ore Grade', 'Monthly Progress Ore Grade', 'Cumulative Progress Ore Grade', 'Monthly Target Total Ore', 'Daily Target Total Ore', 'Daily Progress Total Ore', 'Monthly Progress Total Ore', 'Cumulative Progress Total Ore', 'Monthly Target MIC', 'Daily Target MIC'
                   , 'Daily Progress MIC', 'Monthly Progress MIC',  'Cumulative Progress MIC']
    
    for column in new_columns:
        df[column] = None
        df.loc[df.index[2], column] = column

    
    
        
    specific_rows = df.iloc[[0,2,3,4,8,9,13]]
    
    #specific_rows.iloc[-3:] = specific_rows.iloc[-3:].reset_index(drop=True)
    #specific_rows.iloc[-3:].index += 1
    
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    #df.iloc[3,8:10] = data2.values
    #df.iloc[3, 4:7] = data.values

        
    specific_rows = specific_rows.drop(specific_rows.columns[0], axis=1)
    specific_rows = specific_rows.drop(specific_rows.columns[6:7], axis=1)
    specific_rows = specific_rows.drop(specific_rows.columns[9:11], axis=1)
    
    specific_rows = specific_rows.drop(specific_rows.index[0:1])
    specific_rows = specific_rows.drop(specific_rows.index[1])
    specific_rows = specific_rows.drop(specific_rows.index[1])
    
    specific_rows.loc[specific_rows.index[0], 'Date'] = 'Date'
    
    data1 = specific_rows.iloc[1, 3:8]
    data2= specific_rows.iloc[2,3:8]
    data3 = specific_rows.iloc[3,3:8]
    data4 = specific_rows.iloc[3, 1:2]
    
        
    specific_rows.iloc[1,10:11] = data4.values 
    specific_rows.iloc[1,11:16] = data1.values
    specific_rows.iloc[1,16:21] = data2.values
    specific_rows.iloc[1,21:26] = data3.values
    specific_rows.iloc[1,26:27] = date
       
    specific_rows = specific_rows.drop(specific_rows.columns[0:9], axis=1)
    
    counter = 1
    
    for i, row in specific_rows.iloc[1:].iterrows():
        if not row.isnull().all():
            specific_rows.loc[i, 'Sl.No'] = counter
            counter+=1
        else:
            specific_rows.loc[i, 'Sl.No'] = np.nan
    
        
    specific_rows.to_csv(output_file, index=False, header=False)

    
if __name__ == "__main__":
    input_file = "../assets/Parameters for NCETL.csv"
    output_file = "../output_csv/Parameters for NCETL.csv"
    
    remove_first_row(input_file, output_file)
    date = capture_rows(input_file)
 
    extract_rows_to_new_csv(input_file, date, output_file)
    print("Details from row 2:", date)
    
    