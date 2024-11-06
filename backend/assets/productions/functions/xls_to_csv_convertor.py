import pandas as pd

def xls_to_csv(input_file, output_file):
    df = pd.read_excel(input_file)
    df.to_csv(output_file, index=False)
    
if __name__ == "__main__":
    input_file = "../assets/Format_for exploration.xls"
    output_file = "../assets/Format_for exploration.csv"
    xls_to_csv(input_file, output_file)

    input_file = "../assets/Parameters for NCETL.xlsx"
    output_file = "../assets/Parameters for NCETL.csv"
    xls_to_csv(input_file, output_file)