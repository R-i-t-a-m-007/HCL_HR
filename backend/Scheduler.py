import schedule
import time
import subprocess
import logging
import argparse
import os
import shutil
# from assets.exploration.functions.exploration import main as prepare_exploration_db
from datetime import datetime
from assets.hr.functions.hr_main import xls_to_csv,extract_col,append_csv_data,clean_and_archive
# Configuration
logging.basicConfig(filename="output_log.log", format="%(asctime)s - %(message)s-%(levelname)s" ,level=logging.INFO)

script_dir = os.path.dirname(os.path.abspath(__file__))

exploration_time = "14:58"
hr_time = "16:23"

parser = argparse.ArgumentParser(description="Scheduled task script")
parser.add_argument("--time", default=exploration_time, help="Scheduled time in HH:MM format")
args = parser.parse_args()

current_dir = os.path.dirname(os.path.abspath(__file__))
exploration_file_path = os.path.join(current_dir, "assets", "exploration", "functions", "exploration.py")
production_file_path = os.path.join(current_dir, "assets", "dashboard", "dashboardOperations.py")
hr_file_path = os.path.join(current_dir, "assets", "hr", "functions", "hr.py")

def delete_files(folder_path):
    # Get the list of files in the folder
    files = os.listdir(folder_path)
    
    # Iterate over each file in the folder
    for file_name in files:
        # Construct the full path of the file
        file_path = os.path.join(folder_path, file_name)
        
        # Check if the file exists and is a regular file (not a directory)
        if os.path.isfile(file_path):
            # Delete the file
            os.remove(file_path)
            logging.info(f"Deleted '{file_name}'")

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

def handle_scheduling(op_file_path, folders_to_be_archived=None, archival_folder_path=None, combined_sheet_path=None):
    try:
        subprocess.run(["python", op_file_path], check=True)
        if not folders_to_be_archived:
            return
        clean_and_archive()
        # handle_post_etl_operations(folders_to_be_archived, combined_sheet_path, archival_folder_path)
        # for folder_path in folders_to_be_archived:
        #     handle_archival(folder_path, archival_folder_path)

        # copy_file_to_destination(combined_sheet_path, archival_folder_path)
    except subprocess.CalledProcessError as e:
        logging.info("No records inserted and No files moved due to ETL failure -- for Exploration: ")
        logging.info('ETL for Exploration unsuccessful')
        # logging.info(f"Subprocess failed with exit code {e.returncode}.")
    
    
def run_exploration_program():
    try:
        op_file_path = exploration_file_path
        folders_to_be_archived = ["assets\\exploration\\assets\\xlsx", "assets\\exploration\\output_csv", "assets\\exploration\\assets\\csv"]
        archival_folder_path = "assets\\exploration\\historical_data"
        combined_sheet_path = "assets\\exploration\\combined"
        handle_scheduling(
            op_file_path,
            folders_to_be_archived,
            archival_folder_path,
            # files_to_be_deleted,
            combined_sheet_path
        )
        # handle_scheduling(
        #    production_file_path, "assets\\dashboard\\data", "assets\\dashboard\\historical_data", ["assets\\dashboard\\archived"],["assets\\dashboard\\requiredData\\minesData.csv","assets\\dashboard\\warehouse\\Mines_stage.xlsx"])
        
    except Exception as e:
        # logging.error(f"An error occurred while performing ETL: {e}")
        logging.error(f"An error occurred while performing ETL: {str(e)}", exc_info=True)

def run_hr_program():
    try:
        op_file_path = hr_file_path
        # Define other parameters specific to production task
        logging.info("HR ETL performed successfully")
        input_xls_file_path = 'assets/hr/assets/xlsx/*xlsx'
        converted_csv_file_path = 'assets/hr/assets/csv/*csv'
        structured_csv_file_path = 'assets/hr/output_csv/*csv'
        archived_folder_path = 'assets/hr/historical_data/'
        combined_folder_path = 'assets/hr/combined/'
        handle_scheduling(
            op_file_path,
            structured_csv_file_path,
            archived_folder_path,
            combined_folder_path
            
        )
        
        xls_to_csv(input_xls_file_path,converted_csv_file_path)
        extract_col(converted_csv_file_path,structured_csv_file_path)
        if os.listdir(combined_folder_path):
            append_csv_data(combined_folder_path,structured_csv_file_path)
        clean_and_archive(input_xls_file_path,converted_csv_file_path, structured_csv_file_path, archived_folder_path)
    except Exception as e:
        logging.error(f"An error occurred while performing HR ETL: {str(e)}", exc_info=True)

# Schedule the program to run
schedule.every().day.at(args.time).do(run_exploration_program)
schedule.every().day.at(hr_time).do(run_hr_program)

# Run the scheduler continuously
try:
    while True:
        schedule.run_pending()
        time.sleep(1)
except KeyboardInterrupt:
    print("\nScript terminated by user.")
