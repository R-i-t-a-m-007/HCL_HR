# import shutil
# import os
# import glob

# # def folder_shift(arc, asset):
# #     extension = "csv"
# #     os.chdir(folder_path)

# #     # Change to the specified directory
# #     csv_files = glob.glob(f"*.{extension}")
# #     csv_files.sort(key=os.path.getmtime, reverse=True)

# #     file_paths = [os.path.join(folder_path, filename) for filename in csv_files]

# #     # Print the file paths
# #     for file_path in file_paths[1:]:
# #         inp = rf"{file_path}"
# #         shutil.move(inp, arc)

# def clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder):
#   """
#   Deletes files in xlsx and csv folders, moves the output CSV to archive,
#   and handles potential errors.

#   Args:
#       xlsx_folder (str): Path to the xlsx folder.
#       csv_folder (str): Path to the csv folder.
#       output_csv_folder (str): Path to the output CSV folder.
#       archive_csv_folder (str): Path to the archive CSV folder.
#   """

#   # Delete files in xlsx and csv folders
#   for folder in [xlsx_folder, csv_folder]:
#     try:
#       for filename in os.listdir(folder):
#         file_path = os.path.join(folder, filename)
#         if os.path.isfile(file_path):
#           os.remove(file_path)
#           print(f"Deleted {file_path}")
#     except OSError as e:
#       print(f"Error deleting files in {folder}: {e}")

#   # Move output CSV to archive
#   try:
#     csv_files = os.listdir(output_csv_folder)
#     if len(csv_files) != 1:
#       print(f"Warning: Unexpected number of files in {output_csv_folder}. Only moving the first one.")
#     else:
#       output_csv_file = csv_files[0]
#       source_file = os.path.join(output_csv_folder, output_csv_file)
#       dest_file = os.path.join(archive_csv_folder, output_csv_file)
#       shutil.move(source_file, dest_file)
#       print(f"Moved {source_file} to {dest_file}")
#   except OSError as e:
#     print(f"Error moving output CSV: {e}")

# if __name__ == "__main__":
#   xlsx_folder = "../assets/xlsx"
#   csv_folder = "../assets/csv"
#   output_csv_folder = "../output_csv"
#   archive_csv_folder = "../historical_data"

#   clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder)

import pandas as pd
import shutil, os

def xls_to_csv(input_file, output_file):
    df = pd.read_excel(input_file)
    df.to_csv(output_file, index=False)
    
def extract_col(input_file:str, output_file:str):
    df = pd.read_csv(input_file)

    needed_columns = [0,1,2,3,5,8,10,13,21,23,30,31,32,33,34]
    df_new = df.iloc[:, needed_columns]
    
    df_new.to_csv(output_file, index=False)

    return df

def append_csv_data(source_file, target_file, csv_file):
  # Read the source file
  df_source = pd.read_csv(source_file)
  source_columns = list(df_source)  # Extract column names
  
  # Iterate through other CSV files and append data (skip header)
  #for csv_file in other_csv_files:
  df_append = pd.read_csv(csv_file)  # Skip header row
  
  df_append = df_append[source_columns]
  df_source = pd.concat([df_source, df_append], ignore_index=True)  # Append data

  # Save the appended data to the target file
  df_source.to_csv(target_file, index=False)  # Don't save index as row numbers


def clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder):
    
  # Delete files in xlsx and csv folders
  for folder in [xlsx_folder, csv_folder]:
    try:
      for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        if os.path.isfile(file_path):
          os.remove(file_path)
          print(f"Deleted {file_path}")
    except OSError as e:
      print(f"Error deleting files in {folder}: {e}")

  # Move output CSV to archive
  try:
    csv_files = os.listdir(output_csv_folder)
    if len(csv_files) != 1:
      print(f"Warning: Unexpected number of files in {output_csv_folder}. Only moving the first one.")
    else:
      output_csv_file = csv_files[0]
      source_file = os.path.join(output_csv_folder, output_csv_file)
      dest_file = os.path.join(archive_csv_folder, output_csv_file)
      shutil.move(source_file, dest_file)
      print(f"Moved {source_file} to {dest_file}")
  except OSError as e:
    print(f"Error moving output CSV: {e}")
    
  
if __name__ == "__main__":
  input_file = '../assets/xlsx/HR Blank Format_Head_2024 with Dummy data.xlsx'
  output_file = '../assets/csv/HR Blank Format_Head_2024 with Dummy data.csv'
  structured_csv_file = '../output_csv/HR Blank Format_Head_2024 with Dummy data.csv'
  target_file = 'HR_new.csv'
  xlsx_folder = "../assets/xlsx"
  csv_folder = "../assets/csv"
  output_csv_folder = "../output_csv"
  archive_csv_folder = "../historical_data/"
  
  xls_to_csv(input_file, output_file)
  extract_col(output_file, structured_csv_file)
  append_csv_data(output_file, target_file, output_file)
  clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder)
