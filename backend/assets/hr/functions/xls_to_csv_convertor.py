import pandas as pd

def xls_to_csv(input_file, output_file):
    df = pd.read_excel(input_file)
    df.to_csv(output_file, index=False)
    
if __name__ == "__main__":
    input_file = "../assets/xlsx/HR Blank Format_Head_2024 with Dummy data.xlsx"
    output_file = "../assets/csv/HR Blank Format_Head_2024 with Dummy data.csv"
    xls_to_csv(input_file, output_file)
