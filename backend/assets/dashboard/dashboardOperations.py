import pandas as pd
import sqlite3 as sl
import os
from .extractMinesData import run_etl

def create_db_dashboard():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    file_path = os.path.join(script_dir, 'data\\DashboardParameters.csv')

    dataFile_df = pd.read_csv(file_path)

    con=sl.connect('dashboard.db')

    dataFile_df.to_sql('sale_poc',con,if_exists='replace', index=False)

    con = sl.connect('dashboard.db')

    dataFile_df.to_sql('sale_poc1', con, if_exists='replace', index=False) #data warehouse

    pd.options.display.max_rows = None

    con.close()

    import sqlite3

    con = sqlite3.connect('dashboard.db')

    cursor = con.cursor()

    cursor.execute("PRAGMA table_info(sale_poc1)")

    con.close()

def create_db_dashboard_required_data():
    run_etl()
    
    script_dir = os.path.dirname(os.path.abspath(__file__))

    file_path = os.path.join(script_dir, 'requiredData\\minesData.csv')

    dataFile_df = pd.read_csv(file_path)

    con=sl.connect('dashboard_data.db')

    dataFile_df.to_sql('dashboard_poc',con,if_exists='replace', index=False)

    pd.options.display.max_rows = None

    con.close()

    import sqlite3

    con = sqlite3.connect('dashboard_data.db')

    cursor = con.cursor()

    cursor.execute("PRAGMA table_info(dashboard_poc)")

    con.close()