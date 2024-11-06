import pandas as pd
import sqlite3 as sl
from sqlalchemy import create_engine
import shutil 

class DataProcessor:
    
    @staticmethod
    def read_csv(file_path, skip_rows, nrows = None, Names = None, header = None):
        if(Names):
            return pd.read_csv(file_path, header=header, names=Names, nrows=nrows)
        return pd.read_csv(file_path, skiprows=skip_rows)

    @staticmethod
    def connect_database(database_name):
        return sl.connect(database_name)

    @staticmethod
    def create_table_from_dataframe(dataframe, table_name, connection, replace_option='replace'):
        dataframe.to_sql(table_name, connection, if_exists=replace_option, index=False)

    @staticmethod
    def read_table(connection, table_name):
        query = f'select * from {table_name}'
        return pd.read_sql(query, con=connection)

    @staticmethod
    def create_engine_connection(database_name):
        return create_engine(f'sqlite:///{database_name}')

    @staticmethod
    def execute_sql_query(connection, query):
        cursor = connection.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    
    @staticmethod
    def convert_date_columns(dataframe):
        pass
        # dataframe["StartDate"] = pd.to_datetime(dataframe["StartDate"], format='%d-%m-%Y')
        # dataframe['EndDate'] = pd.to_datetime(dataframe['EndDate'], format='%d-%m-%Y')
        # dataframe["Issue_of_LOI"] = pd.to_datetime(dataframe["Issue_of_LOI"], format='%d-%m-%Y')
        # dataframe["ActualStart"] = pd.to_datetime(dataframe["ActualStart"], format='%d-%m-%Y')
        # dataframe['ActualEnd'] = pd.to_datetime(dataframe['ActualEnd'], format='%d-%m-%Y')
    
    @staticmethod
    def archive():
        # Source path 
        source = "backend\assets\dashboard\warehouse\Mines_stage.xlsx"
        
        # Destination path 
        destination = "backend\assets\dashboard\archived\data.xlsx"
        
        # Move the content of 
        # source to destination 
        dest = shutil.move(source, destination) 
        
        # print(dest) prints the  
        # Destination of moved directory 

    @staticmethod
    def convert_last_nrows_xlsx_to_csv(xlsx_filepath, output_csv_filepath):
        df = pd.read_excel(xlsx_filepath)
        df.to_csv(output_csv_filepath, index=False)
    
