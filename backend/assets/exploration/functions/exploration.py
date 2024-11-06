import csv
import pandas as pd
from datetime import datetime
import os
import sqlite3 as sl
import uuid
import re
import logging
import numpy as np
import shutil 
import sys

logging.basicConfig(filename="output_log.log", format="%(asctime)s - %(message)s-%(levelname)s" ,level=logging.INFO)
script_dir = os.path.dirname(os.path.abspath(__file__))

input_directory = os.path.join(script_dir, '..\\assets\\xlsx')
input_directory_csv = os.path.join(script_dir, '..\\assets\\csv')
output_directory_csv = os.path.join(script_dir, '..\\output_csv')
output_combined_directory = os.path.join(script_dir, '..\\combined')
backend_dir = os.path.abspath(os.path.join(script_dir, '..', '..', '..'))

def handleLog(message):
    print(message)
    logging.info(message)

def get_first_filename(directory):
    files = os.listdir(directory)
    if files:
        first_file = files[0]
        return f"The filename of the first file is: {first_file}"
    else:
        return "The directory is empty."


units = ["ICC", "KCC", "MCP"]

# date = datetime.now().strftime('%d-%m-%Y') ---- to be uncommented after implementation
data_date = "01-02-2025"

filename_pattern = "_"+data_date

first_filename = get_first_filename(input_directory)
# month = first_filename.split("_")[-1].split(".")[0]
month = datetime.strptime(data_date, '%d-%m-%Y').strftime('%B')

def file_is_open(unit_name):
    file_path = os.path.join(input_directory, unit_name+'_'+data_date+'.xls')
    while True:
        try:
            myfile = open(file_path, "r+")
            handleLog('Files are ready for preprocessing of ETL.')
            myfile.close()
            return False                           # exit the loop
        except IOError:
            handleLog("Could not access file: "+file_path+"! Please close the Excel.")
            myfile = open(file_path, "r")
            myfile.close()
            return True
        
def handle_open_files():
    for unit in units:
        open = file_is_open(unit)
        if not open:
            continue
        else:
            return False
    return True
    
def xls_to_csv(input_file, output_file):
    df = pd.read_excel(input_file)
    df.to_csv(output_file, index=False)

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
def new_col(input_file, output_file):
    df = pd.read_csv(input_file)
    index1 =  2 
    index2 = 11  

    value = df.loc[3, 'Unnamed: 1']
    df['Unnamed: 1'] = df['Unnamed: 1'].fillna(value)   
    df['Unnamed: 2'] = df['Unnamed: 2'].fillna(method = 'ffill')   

    value = datetime.now().strftime('%d-%m-%Y')
    
    df['date'] = ''
    df.loc[df.index[0], 'date'] = 'date'
    # df.loc[df.index[1:], 'date'] = datetime.now().strftime('%d-%m-%Y')
    df.loc[df.index[1:], 'date'] = data_date
    
    df.loc[df.index[0], 'Drilling Type'] = 'Drilling Type'
    
    df.loc[index1+1:index2-1, 'Drilling Type'] =  'Under Ground Drilling'  #df.loc[index1+1:index2-2].apply(lambda row: 'Under Ground Drilling' if row.dropna().any() else '', axis=1)

    #'Under Ground Drilling', 'Surface Drilling'
    
    df.loc[index2+1:, 'Drilling Type'] =  'Surface Drilling' #df.loc[index2+1:].apply(lambda row: 'Surface Drilling' if row.dropna().any() else '', axis=1)

    df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    df = df.drop([1, 2 , index2, index2-1])
    df = df.drop(df.columns[0], axis=1)

    df.to_csv(output_file, index=False, header=False)
    
    return df

def rename_cols(output_file):
    df = pd.read_csv(output_file)

    df.columns.values[10] = "Physical Work Target in the month"
    df.columns.values[11] = "Physical Work Done in the month"
    df.columns.values[12] = "Physical Work Target upto the month for FY"
    df.columns.values[13] = "Physical Work Done upto the month for FY"
    df.columns.values[14] = "Physical Work Target upto the month from inception"
    df.columns.values[15] = "Physical Work Done up to the month from inception"

    df.columns.values[16] = "Drilling Target for the month"
    df.columns.values[17] = "Achieved Drilling Meterage in the month"
    df.columns.values[18] = "Drilling Target upto the month for FY"
    df.columns.values[19] = "Achieved Drilling Meterage up to the month for FY"
    df.columns.values[20] = "Drilling Target upto the month from inception"
    df.columns.values[21] = "Achieved Drilling Meterage up to the month from inception"
    df.columns.values[22] = "Bills raised by Contractor in the month"
    df.columns.values[23] = "Bills raised by Contractor up to the month in FY"
    df.columns.values[24] = "Bills rised by Contractor upto the month from inception"
    df.columns.values[25] = "Payments made to Contractor in the month"
    df.columns.values[26] = "Payments made to Contractor up to the month in FY"
    df.columns.values[27] = "Payments made to Contractor upto the month from inception"

    df.columns.values[3] = "Contractor"
    df["Contractor"] = df["Contractor"].str.replace('\n', ' ')
    df["Project Name"] = df["Project Name"].str.replace('\n', ' ')
    df.columns.values[28] = "Target CAPEX Amount for FY"
    df.columns.values[29] = "Achieved CAPEX Amount for FY"
    df.columns.values[30] = "Target CAPEX Amount for FY and so on"
    df.columns.values[31] = "Achieved CAPEX Amount for FY and so on"
    df.to_csv(output_file, index=False, header=True)
    df.fillna('', inplace=True)

def xlsx_to_csv_all():
    for unit in units:
        input_file = os.path.join(input_directory, unit+filename_pattern+".xls")
        output_file = os.path.join(input_directory_csv, unit+filename_pattern+".csv")
        xls_to_csv(input_file, output_file)

def data_type_is_valid(data, expected_type):

    if (expected_type == 'str' and data == "") or str(data) == "nan":
        return True
    if expected_type == "date1":
        try:
            return True if datetime.strptime(str(data), '%d.%m.%Y') else False
        except:
            return False
    elif expected_type == "date2":
        try:
            return True if datetime.strptime(str(data), '%d-%m-%Y') else False
        except:
            return False
    else:
        data_type = str(type(data)).split("'")[1] 
        if expected_type == 'float' and data_type == 'str' and data.replace(".", "").isnumeric():
            data_type = str(type(float(data))).split("'")[1]
        elif expected_type == 'str' and data_type == 'str' and data.replace(".", "").isnumeric():
            data_type = str(type(float(data))).split("'")[1]
        return data_type == expected_type 

def input_data_verification(file, unit):
    df = pd.read_csv(file)
    expected_data_types = ['str', 'str', 'str', 'str', 'date1', 'date1', 'str', 'date1', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'str', 'date2', 'str']
    num_columns = len(df.columns)
    for row_index, row in df.iterrows():
        for col_index in range(num_columns):
            val = row.iloc[col_index]
            expected_type = expected_data_types[col_index]

            if not data_type_is_valid(val, expected_type):
                handleLog('Error: Entered value "'+str(val)+'" is having Invalid Data Type. Row ' + str(row_index) + ', Column ' + str(df.columns[col_index])+'. Expected data type '+expected_type+'. For Unit: '+unit)
                raise Exception("Invalid data type")
        

def handle_operations():
    for unit in units:
        input_file = os.path.join(input_directory_csv, unit+filename_pattern+".csv")
        output_file = os.path.join(output_directory_csv, unit+filename_pattern+".csv")
        remove_first_row(input_file, output_file)
        capture_rows(input_file)
        new_col(input_file, output_file)
        rename_cols(output_file)
        input_data_verification(output_file, unit)
        try:
            input_data_verification(output_file, unit)
        except Exception as e:
            handleLog(e)
            return False
    return True
        

def combine_csv_files(input_file_names, output_file):
    all_data = []

    # Check if the output file already exists
    if os.path.exists(output_file):
        # Read existing data from output file
        combined_df = pd.read_csv(output_file)
        all_data.append(combined_df)

    for filename in input_file_names:
        if filename.endswith(".csv"):
            file_path = os.path.join(output_directory_csv, filename)

            df = pd.read_csv(file_path)

            df.insert(0, 'Month', month)

            # Append DataFrame to list
            all_data.append(df)

    # Concatenate all DataFrames into a single DataFrame
    combined_df = pd.concat(all_data, ignore_index=True)
    # SCD ---
    if 'current_row' not in combined_df.columns:
        combined_df.insert(37, 'current_row', 0)
    combined_df['current_row'] = combined_df.apply(
        lambda row: 
            1 if row['date'] == data_date else 
            0 if row['Month'] == month and row['date'][-4:] == data_date[-4:] else
            row['current_row'], axis=1)


    # Save combined DataFrame to CSV
    combined_df.to_csv(output_file, index=False, header=True)

def create_db():
    file_path = os.path.join(output_combined_directory, 'combined_data.csv')

    # Navigate up three directories to reach the backend directory
    # backend_dir = os.path.abspath(os.path.join(script_dir, '..', '..', '..'))
    database_path = os.path.join(backend_dir, 'exploration.db')

    # Load data from CSV or any other source
    dataFile_df = pd.read_csv(file_path)

    with sl.connect(database_path) as con:
        dataFile_df.to_sql('exploration_poc', con, if_exists='replace', index=False)

    con.close()


def directory_has_files(directory):
    if not os.path.isdir(directory):
        return False
    
    filenames = os.listdir(directory)

    if len(filenames) < 3:
        return False
    
    for filename in filenames:
        if not os.path.isfile(os.path.join(directory, filename)):
            return False 

    return True
def check_date():
    file_path = os.path.join(output_combined_directory, 'combined_data.csv')
    if os.path.exists(file_path):  
        df = pd.read_csv(file_path)
        data_sheet_date=df.loc[df.index[-1],'date']
        print(data_sheet_date)
        current_date=data_date
        return data_sheet_date==current_date
def perform_etl():
    try:
        xlsx_to_csv_all()
        success = handle_operations()
        if not success:
            raise Exception("Error occured while performing ETL!")
        input_file_names = []
        output_file = os.path.join(output_combined_directory, 'combined_data.csv')
        for unit in units:
            input_file_names.append(unit+filename_pattern+".csv")
        combine_csv_files(input_file_names, output_file)
        create_db()
        handleLog("ETL for exploration performed")
        return True
    except Exception as e:
        handleLog("Error occurred while performing ETL: " + str(e))
        return False

def main():
    global ERROR_CODE
    if not directory_has_files(input_directory):
        handleLog("missing files for today -- for Exploration")
        ERROR_CODE = False
    elif handle_open_files():
        ERROR_CODE = perform_etl()
    elif check_date():
        handleLog("Files for today already uploaded")
        ERROR_CODE = False

    else:
        handleLog("Exploration ETL cannot be performed: Input File is open") 
        ERROR_CODE = False
    return ERROR_CODE

def copy_file_to_destination(source_folder, destination_folder):

    try:
        files = os.listdir(source_folder)
        
        # Iterate over each file in the source folder
        for file_name in files:
            # Construct the full path of the source file
            source_file = os.path.join(source_folder, file_name)
            
            # Construct the destination filename based on the current date and time
            destination_file = os.path.join(destination_folder, "combined_" + datetime.now().strftime('%d-%m-%Y')+".csv")
            
            # Copy the file to the destination folder with the new filename
            shutil.copy(source_file, destination_file)
            
            logging.info(f"File '{source_file}' copied to '{destination_folder}' successfully as '{destination_file}'.")

    except Exception as e:

        print(f"An error occurred while copying the files: {e}")


def handle_archival(source_folder_path, archival_folder_path):
    files = os.listdir(source_folder_path)
    
    # Iterate over each file in the source folder
    for file_name in files:
        # Construct the full path of the source file
        source_file = os.path.join(source_folder_path, file_name)
        
        # Construct the full path of the destination file
        destination_file = os.path.join(archival_folder_path, file_name)
        
        # Move the file to the destination folder
        shutil.move(source_file, destination_file)
        
        # print(f"Moved '{file_name}' to '{archival_folder_path}'")
        logging.info(f"Moved '{file_name}' to '{archival_folder_path}'")


def handle_post_etl_operations(folders_to_be_archived, combined_sheet_path, archival_folder_path):
    for folder_path in folders_to_be_archived:
        handle_archival(folder_path, archival_folder_path)

    copy_file_to_destination(combined_sheet_path, archival_folder_path) 

def handle_manual_etl():
    # file_path = os.path.join(backend_dir, 'Scheduler.py')
    # # Read the contents of the file
    # with open(file_path, 'r') as f:
    #     code = f.read()
    # namespace = {}

    # # Execute the code
    # exec(code, namespace)
    # namespace.get('handle_post_etl_operations')()
    # handleLog('Clone')
    # ------------------
    error_code = main()
    if(error_code):
        folders_to_be_archived = ["..\\assets\\xlsx", "..\\output_csv", "..\\assets\\csv"]
        combined_sheet_path = "..\\combined"
        archival_folder_path = "..\\historical_data"
        handle_post_etl_operations(folders_to_be_archived, combined_sheet_path, archival_folder_path)
        return "Exploration ETL performed successfully"
    else:
        handleLog("No records inserted and No files moved due to ETL failure -- for Exploration: ")
        handleLog('ETL for Exploration unsuccessful')
        return "ETL for Exploration unsuccessful. "

if __name__ == "__main__":
    error_code = main() 
    sys.exit(0 if error_code else 1)
 