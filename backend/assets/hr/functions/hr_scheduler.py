import schedule
import time,os
from hr_main import xls_to_csv,extract_col,append_csv_data,move_to_combined_folder,clean_and_archive

hr_time = "12:38"

def run_hr_program():
    target_file = "../combined/HR_new.csv"
    xlsx_folder = "../assets/xlsx"
    csv_folder = "../assets/csv"
    output_csv_folder = "../output_csv"
    archive_csv_folder = "../historical_data"

    input_file_name = os.listdir(xlsx_folder)[0]
    input_file = os.path.join(xlsx_folder, input_file_name)

    base_name = os.path.splitext(input_file_name)[0]
    output_file = os.path.join(output_csv_folder, base_name + ".csv")

    xls_to_csv(input_file, output_file)
    extract_col(output_file, output_file)
    append_csv_data(target_file, target_file, output_file)
    move_to_combined_folder(target_file)
    clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder)

schedule.every().day.at(hr_time).do(run_hr_program)

# Run the scheduler continuously
try:
    while True:
        schedule.run_pending()
        time.sleep(1)
except KeyboardInterrupt:
    print("\nScript terminated by user.")
