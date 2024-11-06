import pandas as pd
def extract_col(input_file:str, output_file:str):
    df = pd.read_csv('../assets/csv/HR Blank Format_Head_2024 with Dummy data.csv')

    needed_columns = [0,1,2,3,5,8,10,13,21,23,30,31,32,33,34]
    
    df_new = df.iloc[:, needed_columns]
    
    df_new.to_csv('../output_csv/HR Blank Format_Head_2024 with Dummy data.csv', index=False)

    return df
    
if __name__=='__main__':
    input_file = '../assets/csv/HR Blank Format_Head_2024 with Dummy data.csv'
    output_file = '../output_csv/HR Blank Format_Head_2024 with Dummy data.csv'
    extract_col(input_file, output_file)
    