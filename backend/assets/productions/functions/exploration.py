import csv
import pandas as pd
from datetime import datetime
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
        
    for j in data[12]:
        if j != "":
            break
        else:
            continue
        
    return i, j
def new_col(input_file):
    df = pd.read_csv(input_file)
    index1 =  2 
    index2 = 11  

    value = df.loc[3, 'Unnamed: 1']
    df['Unnamed: 1'] = df['Unnamed: 1'].fillna(value)   
    df['Unnamed: 2'] = df['Unnamed: 2'].fillna(method = 'ffill')   

    value = datetime.now().strftime('%Y-%m-%d')
    
    df['date'] = ''
    df.loc[df.index[0], 'date'] = 'date'
    df.loc[df.index[1:], 'date'] = datetime.now().strftime('%Y-%m-%d')
    
    
    df.loc[df.index[0], 'Drilling Type'] = 'Drilling Type'
    
    df.loc[index1+1:index2-1, 'Drilling Type'] =  'Under Ground Drilling'  #df.loc[index1+1:index2-2].apply(lambda row: 'Under Ground Drilling' if row.dropna().any() else '', axis=1)

    #'Under Ground Drilling', 'Surface Drilling'
    
    df.loc[index2+1:, 'Drilling Type'] =  'Surface Drilling' #df.loc[index2+1:].apply(lambda row: 'Surface Drilling' if row.dropna().any() else '', axis=1)

    df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    df = df.drop([1, 2 , index2, index2-1])
    df = df.drop(df.columns[0], axis=1)

    df.to_csv('../output_csv/Format_for exploration.csv', index=False, header=False)

    return df


if __name__ == "__main__":
    input_file = "../assets/Format_for exploration.csv"
    output_file = "../output_csv/Format_for exploration.csv"
    
    remove_first_row(input_file, output_file)
    type1, type2 = capture_rows(input_file)
    
    print("Details from row 2:", type1)
    print("Details from row 12:", type2)
    output = new_col(input_file)
    # remove_first_row(input_file, output_file)  
 
