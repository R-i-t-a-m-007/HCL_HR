import pandas as pd
import os

def convert_last_nrows_xlsx_to_csv(xlsx_filepath, output_csv_filepath):
    df = pd.read_excel(xlsx_filepath)
    dateHeaders = ["Issue of LOI","Mobilisation","Start Date","End Date","Actual Start","Actual End"]
    for header in dateHeaders:
        df[header] = pd.to_datetime(df[header], format="%d/%m/%Y").dt.date
        if(isinstance(df[header][0], str)):
            df[header] = df[header].str.strip()

    dframe = df.fillna(0)
    dframe.to_csv(output_csv_filepath, index=False)
    

def main():
    input_file = os.path.join(os.path.dirname(__file__), "data", "mining_progress_review.xlsx")
    output_file = os.path.join(os.path.dirname(__file__), "requiredData", "mining_progress_data.csv")
    convert_last_nrows_xlsx_to_csv(input_file, output_file)

if __name__ == "__main__":
    main()