import os
from dataProcessor import DataProcessor
from .extractProgressData import main as processProgressData

def processCalculatedData():
    # Define a dictionary to map old column names to new column names
    column_name_mapping = {
        'Mines': 'Mine',
        'BoQ Qty': 'BoQ_Qty',
        'Work Completed Qty': 'Act._Qty',
        'Issue of LOI': 'Issue_of_LOI',
        'Start Date': 'StartDate',
        'End Date': 'EndDate',
        'Duration (Days)': 'Duration',
        'Actual  Start': 'ActualStart',
        'Actual End': 'ActualEnd',
        'Days Remaining': 'DaysRemaining'
    }

    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, 'requiredData\\mining_progress_data.csv')

    # Read CSV
    skip_rows = 0
    dataFile_df = DataProcessor.read_csv(file_path, skip_rows)

    # Rename columns in the DataFrame
    dataFile_df.rename(columns=column_name_mapping, inplace=True)

    # Create database connection
    con = DataProcessor.connect_database('progress.db')

    # Create and populate progress_poc table
    DataProcessor.create_table_from_dataframe(dataFile_df, 'progress_poc', con)

    # Close database connection
    con.close()

def main():
    processProgressData()
    processCalculatedData()


if __name__ == "__main__":
    main()