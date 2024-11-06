import os
from dataProcessor import DataProcessor
from .statutoryDataProcessor import main as processStatutoryData

def processCalculatedData():
    # Define a dictionary to map old column names to new column names

    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, 'requiredData\\statutoryData.csv')

    # Read CSV
    skip_rows = 0
    dataFile_df = DataProcessor.read_csv(file_path, skip_rows)

    # Create database connection
    con = DataProcessor.connect_database('statutory.db')

    # Create and populate sale_poc table
    DataProcessor.create_table_from_dataframe(dataFile_df, 'statutory_poc', con)

    # Close database connection
    con.close()

def main():
    processStatutoryData()
    processCalculatedData()


if __name__ == "__main__":
    main()