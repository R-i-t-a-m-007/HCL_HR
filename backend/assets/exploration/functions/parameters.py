import csv
from datetime import datetime
import pandas as pd

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


def extract_rows_to_new_csv(input_file):
    df = pd.read_csv(input_file)
    
    
    specific_rows = df.iloc[[0,3,4,5,11,13,15]]
    
    specific_rows.iloc[-3:] = specific_rows.iloc[-3:].reset_index(drop=True)
    specific_rows.iloc[-3:].index += 1
    
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    
    specific_rows.loc[specific_rows.index[2], 'date'] = 'date'
    specific_rows.loc[specific_rows.index[4:], 'date'] = datetime.now().strftime('%Y-%m-%d')
    
    specific_rows.to_csv('../output_csv/Parameters for NCETL.csv', index=False, header=False)



if __name__ == "__main__":
    input_file = "../assets/Parameters for NCETL.csv"
    output_file = "../output_csv/Parameters for NCETL.csv"
    
    remove_first_row(input_file, output_file)
    date = capture_rows(input_file)
    extract_rows_to_new_csv(input_file)
    print("Details from row 2:", date)