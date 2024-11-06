# import pandas as pd
# import shutil, os


# def xls_to_csv(input_file, output_file):
#     df = pd.read_excel(input_file)
#     df.to_csv(output_file, index=False)


# def extract_col(input_file, output_file):
#     df = pd.read_csv(input_file)

#     needed_columns = [0, 1, 2, 3, 5, 8, 10, 13, 21, 23, 30, 31, 32, 33, 34]
#     df_new = df.iloc[:, needed_columns]

#     df_new.to_csv(output_file, index=False)

#     return df


# def append_csv_data(source_file, target_file, csv_file):
#     # Read the source file
#     df_source = pd.read_csv(source_file)
#     source_columns = list(df_source)  # Extract column names

#     # Iterate through other CSV files and append data (skip header)
#     # for csv_file in other_csv_files:
#     df_append = pd.read_csv(csv_file)  # Skip header row

#     df_append = df_append[source_columns]
#     df_source = pd.concat([df_source, df_append], ignore_index=True)  # Append data

#     # Save the appended data to the target file
#     df_source.to_csv(target_file, index=False)  # Don't save index as row numbers


# def clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder):

#     # Delete files in xlsx and csv folders
#     for folder in [xlsx_folder, csv_folder]:
#         try:
#             for filename in os.listdir(folder):
#                 file_path = os.path.join(folder, filename)
#                 if os.path.isfile(file_path):
#                     os.remove(file_path)
#                     print(f"Deleted {file_path}")
#         except OSError as e:
#             print(f"Error deleting files in {folder}: {e}")

#     # Move output CSV to archive
#     try:
#         csv_files = os.listdir(output_csv_folder)
#         if len(csv_files) != 1:
#             print(
#                 f"Warning: Unexpected number of files in {output_csv_folder}. Only moving the first one."
#             )
#         else:
#             output_csv_file = csv_files[0]
#             source_file = os.path.join(output_csv_folder, output_csv_file)
#             dest_file = os.path.join(archive_csv_folder, output_csv_file)
#             shutil.move(source_file, dest_file)
#             print(f"Moved {source_file} to {dest_file}")
#     except OSError as e:
#         print(f"Error moving output CSV: {e}")


# def move_to_combined_folder(target_file):
#     combined_folder = "../combined"

#     # Create the combined folder if it doesn't exist
#     if not os.path.exists(combined_folder):
#         os.makedirs(combined_folder)
#         print(f"Created folder '{combined_folder}'")

#     # Move the target file to the combined folder
#     dest_file = os.path.join(combined_folder, os.path.basename(target_file))
#     shutil.move(target_file, dest_file)
#     print(f"Moved '{target_file}' to '{dest_file}' in the '{combined_folder}' folder")


# if __name__ == "__main__":
#     target_file = "../combined/HR_new.csv"
#     xlsx_folder = "../assets/xlsx"
#     csv_folder = "../assets/csv"
#     output_csv_folder = "../output_csv"
#     archive_csv_folder = "../historical_data"

#     input_file_name = os.listdir(xlsx_folder)[0]
#     input_file = os.path.join(xlsx_folder, input_file_name)

#     base_name = os.path.splitext(input_file_name)[0]
#     output_file = os.path.join(output_csv_folder, base_name + ".csv")
#     # structured_csv_file = os.path.join(csv_folder, base_name + ' - Copy.csv')

#     xls_to_csv(input_file, output_file)
#     extract_col(output_file, output_file)
#     append_csv_data(target_file, target_file, output_file)
#     move_to_combined_folder(target_file)
#     clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder)
# import pandas as pd
# import shutil, os
# import logging
# # Set up logging
# logging.basicConfig(
#     filename="output.log",
#     filemode="w",
#     format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
#     level=logging.INFO,
# )


# def xls_to_csv(input_file, output_file):
#     logging.info(f"Converting {input_file} to CSV")
#     df = pd.read_excel(input_file)
#     df.to_csv(output_file, index=False)
#     logging.info(f"Saved CSV to {output_file}")


# def extract_col(input_file, output_file):
#     logging.info(f"Extracting columns from {input_file}")
#     df = pd.read_csv(input_file)

#     needed_columns = [0, 1, 2, 3, 5, 6, 8, 10, 13, 21, 23, 28, 30, 31, 32, 33, 34]
#     df_new = df.iloc[:, needed_columns]

#     df_new.to_csv(output_file, index=False)
#     logging.info(f"Saved new CSV with extracted columns to {output_file}")

#     return df


# def append_csv_data(source_file, target_file, csv_file):
#     logging.info(f"Appending data from {csv_file} to {source_file}")
#     df_source = pd.read_csv(source_file)
#     source_columns = list(df_source)

#     df_append = pd.read_csv(csv_file)
#     df_append = df_append[source_columns]
#     df_source = pd.concat([df_source, df_append], ignore_index=True)

#     df_source.to_csv(target_file, index=False)
#     logging.info(f"Saved appended data to {target_file}")


# def clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder):
#     logging.info("Starting cleanup and archiving process")

#     for folder in [xlsx_folder, csv_folder]:
#         try:
#             for filename in os.listdir(folder):
#                 file_path = os.path.join(folder, filename)
#                 if os.path.isfile(file_path):
#                     os.remove(file_path)
#                     logging.info(f"Deleted {file_path}")
#         except OSError as e:
#             logging.error(f"Error deleting files in {folder}: {e}")

#     try:
#         csv_files = os.listdir(output_csv_folder)
#         if len(csv_files) != 1:
#             logging.warning(
#                 f"Unexpected number of files in {output_csv_folder}. Only moving the first one."
#             )
#         else:
#             output_csv_file = csv_files[0]
#             source_file = os.path.join(output_csv_folder, output_csv_file)
#             dest_file = os.path.join(archive_csv_folder, output_csv_file)
#             shutil.move(source_file, dest_file)
#             logging.info(f"Moved {source_file} to {dest_file}")
#     except OSError as e:
#         logging.error(f"Error moving output CSV: {e}")


# def move_to_folder(target_file, dest_folder):

#     if not os.path.exists(dest_folder):
#         os.makedirs(dest_folder)
#         logging.info(f"Created folder '{dest_folder}'")

#     dest_file = os.path.join(dest_folder, os.path.basename(target_file))
#     shutil.copy(target_file, dest_file)
#     logging.info(
#         f"Moved '{target_file}' to '{dest_file}' in the '{dest_folder}' folder"
#     )


# def clean_up_folders(*folders):
#     for folder in folders:
#         for filename in os.listdir(folder):
#             file_path = os.path.join(folder, filename)
#             try:
#                 if os.path.isfile(file_path) or os.path.islink(file_path):
#                     os.unlink(file_path)
#                 elif os.path.isdir(file_path):
#                     shutil.rmtree(file_path)
#             except Exception as e:
#                 print(f'Failed to delete {file_path}. Reason: {e}')


# def combine_excel(attendance_sheet, main_sheet, output_sheet):
#     df1 = pd.read_excel(attendance_sheet)
#     df2 = pd.read_excel(main_sheet)

#     header1_index = 1
#     header2_index = 1

#     columns_to_append_indices = [3, 4]

#     header1 = df1.columns[header1_index]
#     header2 = df2.columns[header2_index]

#     df2["In Time"] = None
#     df2["Out Time"] = None

#     for index, value in df1[header1].items():
#         matching_rows = df2[df2[header2] == value]
#         if not matching_rows.empty:
#             in_time = df1.iloc[index, columns_to_append_indices[0]]
#             out_time = df1.iloc[index, columns_to_append_indices[1]]

#             df2.loc[df2[header2] == value, "In Time"] = in_time
#             df2.loc[df2[header2] == value, "Out Time"] = out_time

#     needed_columns = [0, 1, 2, 3, 5, 6, 8, 10, 13, 21, 23, 28, 30, 31, 32, 33, 34, 61, 62]
#     df2 = df2.iloc[:, needed_columns]

#     last_non_null_index = df2[["In Time", "Out Time"]].last_valid_index()

#     if last_non_null_index is not None:
#         df2 = df2.loc[:last_non_null_index]

#     df2.to_csv(output_sheet, index=False)

#     print(f"Combined data saved to {output_sheet}")

# def append_csv_new_data(target_file, csv_file):
#     if os.path.exists(target_file):
#         df_target = pd.read_csv(target_file)
#     else:
#         df_target = pd.DataFrame()

#     df_append = pd.read_csv(csv_file)

#     if df_target.empty:
#         df_combined = df_append
#     else:
#         df_combined = pd.concat([df_target, df_append], ignore_index=True)

#     df_combined.to_csv(target_file, index=False)


# if __name__ == "__main__":
#     logging.info("Starting main process")

#     target_file = "../combined/HR_new.csv"
#     main_xlsx_folder = "../assets/xlsx/main_xlsx"
#     csv_folder = "../assets/csv/structured_data.csv"
#     output_csv_folder = "../output_csv"
#     archive_csv_folder = "../historical_data"
#     attendance_path = "../assets/xlsx/attendance_xlsx"

#     attendance_output = "../assets/csv/combined_data.csv"

#     input_file_name = os.listdir(main_xlsx_folder)[0]
#     input_file = os.path.join(main_xlsx_folder, input_file_name)

#     try:
#         # xls_to_csv(input_file, output_csv_file)
#         # extract_col(output_csv_file, output_file)
#         for file in os.listdir(attendance_path):
#             if file.endswith(".xlsx"):
#                 attendance_file = os.path.join(attendance_path, file)
#                 combine_excel(attendance_file, input_file, attendance_output)
#                 append_csv_new_data(csv_folder,attendance_output)
#         append_csv_new_data(target_file,csv_folder)
#         move_to_folder(csv_folder, output_csv_folder)
#         # append_csv_data(target_file, target_file, output_file)
#         # move_to_combined_folder(target_file)
#         # clean_and_archive(xlsx_folder, csv_folder, output_csv_folder, archive_csv_folder)
#     except Exception as e:
#         logging.info(f"Error during ETL process: {e}")
#         # clean_up_folders(main_xlsx_folder, csv_folder, output_csv_folder)
#     logging.info("Finished main process")

import pandas as pd
import shutil
import os
import logging

# Set up logging
logging.basicConfig(
    filename="output.log",
    filemode="w",
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)


def clean_and_archive(xlsx_folder, output_csv_folder, archive_csv_folder):
    logging.info("Starting cleanup and archiving process")

    for folder in [xlsx_folder]:
        try:
            for filename in os.listdir(folder):
                file_path = os.path.join(folder, filename)
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    logging.info(f"Deleted {file_path}")
        except OSError as e:
            logging.error(f"Error deleting files in {folder}: {e}")

    try:
        csv_files = os.listdir(output_csv_folder)
        if len(csv_files) != 1:
            logging.warning(
                f"Unexpected number of files in {output_csv_folder}. Only moving the first one."
            )
        else:
            output_csv_file = csv_files[0]
            source_file = os.path.join(output_csv_folder, output_csv_file)
            dest_file = os.path.join(archive_csv_folder, output_csv_file)
            shutil.move(source_file, dest_file)
            logging.info(f"Moved {source_file} to {dest_file}")
    except OSError as e:
        logging.error(f"Error moving output CSV: {e}")


def move_to_folder(target_file, dest_folder):
    if not os.path.exists(dest_folder):
        os.makedirs(dest_folder)
        logging.info(f"Created folder '{dest_folder}'")

    dest_file = os.path.join(dest_folder, os.path.basename(target_file))
    shutil.copy(target_file, dest_file)
    logging.info(
        f"Moved '{target_file}' to '{dest_file}' in the '{dest_folder}' folder"
    )


def clean_up_folders(*folders):
    for folder in folders:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")


def combine_excel(attendance_sheet, main_sheet, output_sheet):
    logging.info(f"Combining {attendance_sheet} and {main_sheet} into {output_sheet}")

    try:
        df1 = pd.read_excel(attendance_sheet)
        df2 = pd.read_excel(main_sheet)

        header1_index = 1
        header2_index = 1

        columns_to_append_indices = [3, 4]

        header1 = df1.columns[header1_index]
        header2 = df2.columns[header2_index]

        df2["In Time"] = None
        df2["Out Time"] = None

        logging.info("Appending In Time and Out Time columns")

        for index, value in df1[header1].items():
            matching_rows = df2[df2[header2] == value]
            if not matching_rows.empty:
                in_time = df1.iloc[index, columns_to_append_indices[0]]
                out_time = df1.iloc[index, columns_to_append_indices[1]]

                df2.loc[df2[header2] == value, "In Time"] = in_time
                df2.loc[df2[header2] == value, "Out Time"] = out_time

        logging.info("Selecting needed columns")
        needed_columns = [
            0,
            1,
            2,
            3,
            5,
            6,
            8,
            10,
            13,
            21,
            22,
            23,
            28,
            30,
            31,
            32,
            33,
            34,
            61,
            62,
        ]
        df2 = df2.iloc[:, needed_columns]

        logging.info(
            "Trimming DataFrame to last non-null index for In Time and Out Time"
        )
        first_valid_index = df2[["In Time", "Out Time"]].first_valid_index()
        last_non_null_index = df2[["In Time", "Out Time"]].last_valid_index()
        
        if last_non_null_index is not None:
            df2 = df2.loc[first_valid_index:last_non_null_index]

        df2.to_csv(output_sheet, index=False)
        logging.info(f"Combined data saved to {output_sheet}")

    except Exception as e:
        logging.error(f"Error combining Excel files: {e}")
        raise


def append_csv_new_data(target_file, csv_file):
    logging.info(f"Appending data from {csv_file} to {target_file}")

    try:
        if os.path.exists(target_file):
            df_target = pd.read_csv(target_file)
            logging.info(f"Loaded target CSV: {target_file}")
        else:
            df_target = pd.DataFrame()
            logging.info(f"Target CSV does not exist, creating new DataFrame")

        df_append = pd.read_csv(csv_file)
        logging.info(f"Loaded CSV to append: {csv_file}")

        if df_target.empty:
            df_combined = df_append
            logging.info(
                "Target DataFrame is empty, using append DataFrame as combined"
            )
        else:
            df_combined = pd.concat([df_target, df_append], ignore_index=True)
            logging.info("Appended new data to target DataFrame")

        df_combined.to_csv(target_file, index=False)
        logging.info(f"Appended data saved to {target_file}")

    except Exception as e:
        logging.error(f"Error appending CSV data: {e}")
        raise


if __name__ == "__main__":
    logging.info("Starting main process")

    target_file = "../combined/HR_new.csv"
    main_xlsx_folder = "../assets/xlsx/main_xlsx"
    csv_folder = "../assets/csv"
    output_csv_folder = "../output_csv"
    archive_csv_folder = "../historical_data"
    attendance_path = "../assets/xlsx/attendance_xlsx"

    attendance_output = "../assets/csv/combined_data.csv"

    input_file_name = os.listdir(main_xlsx_folder)[0]
    input_file = os.path.join(main_xlsx_folder, input_file_name)

    backup_structured_data_path = os.path.join(csv_folder, "structured_data_backup.csv")
    structured_data_path = os.path.join(csv_folder, "structured_data.csv")

    try:
        # Backup structured_data.csv before processing
        if os.path.exists(structured_data_path):
            shutil.copy(structured_data_path, backup_structured_data_path)
            logging.info("Backed up structured_data.csv")

        for file in os.listdir(attendance_path):
            if file.endswith(".xlsx"):
                attendance_file = os.path.join(attendance_path, file)
                combine_excel(attendance_file, input_file, attendance_output)
                append_csv_new_data(structured_data_path, attendance_output)

        append_csv_new_data(target_file, structured_data_path)
        move_to_folder(structured_data_path, output_csv_folder)

        # Restore structured_data.csv from backup
        if os.path.exists(backup_structured_data_path):
            shutil.copy(backup_structured_data_path, structured_data_path)
            logging.info("Restored structured_data.csv from backup")

        # Remove other files in the csv folder except structured_data.csv
        for filename in os.listdir(csv_folder):
            file_path = os.path.join(csv_folder, filename)
            if file_path != structured_data_path:
                os.remove(file_path)
                logging.info(f"Deleted {file_path}")

    except Exception as e:
        logging.error(f"Error during ETL process: {e}")
        # Restore structured_data.csv from backup in case of error
        if os.path.exists(backup_structured_data_path):
            shutil.copy(backup_structured_data_path, structured_data_path)
            logging.info("Restored structured_data.csv from backup after error")
    finally:
        # Clean up backup file
        if os.path.exists(backup_structured_data_path):
            os.remove(backup_structured_data_path)
            logging.info("Removed structured_data.csv backup file")

    logging.info("Finished main process")
