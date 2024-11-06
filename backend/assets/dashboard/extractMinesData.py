import pandas as pd
from datetime import date
import os
import logging

WAREHOUSE = os.path.join(os.path.dirname(__file__), "warehouse", "Mines_stage.xlsx")
SOURCE = os.path.join(os.path.dirname(__file__), "requiredData", "minesData.csv")
data_date = str(date.today())

def handleLog(message):
    print(message)
    logging.info(message)

def convert_last_nrows_xlsx_to_csv(xlsx_filepath, output_csv_filepath, nrows=21):
    df = pd.read_excel(xlsx_filepath)
    df.to_csv(output_csv_filepath, index=False)

def read_excel_file(file_path):
    return pd.read_excel(file_path)

def extract_today_data_Banwas(df):
    ore_grade_banwas_units = df.iloc[0, 0]
    ore_grade_banwas_mines = df.iloc[0, 1]
    ore_grade_banwas_output = df.iloc[0, 2]
    ore_grade_banwas_target = df.iloc[0, 3]
    ore_grade_banwas_achieved = df.iloc[0, 4]

    ore_production_banwas_units = df.iloc[1, 0]
    ore_production_banwas_mines = df.iloc[1, 1]
    ore_production_banwas_output = df.iloc[1, 2]
    ore_production_banwas_target = df.iloc[1, 3]
    ore_production_banwas_achieved = df.iloc[1, 4]

    MIC_production_banwas_units = df.iloc[2, 0]
    MIC_production_banwas_mines = df.iloc[2, 1]
    MIC_production_banwas_output = df.iloc[2, 2]
    MIC_production_banwas_target = df.iloc[2, 3]
    MIC_production_banwas_achieved = df.iloc[2, 4]

    return (ore_grade_banwas_units, ore_grade_banwas_mines, ore_grade_banwas_output, ore_grade_banwas_target, ore_grade_banwas_achieved,
            ore_production_banwas_units, ore_production_banwas_mines, ore_production_banwas_output, ore_production_banwas_target, ore_production_banwas_achieved,
            MIC_production_banwas_units, MIC_production_banwas_mines, MIC_production_banwas_output, MIC_production_banwas_target, MIC_production_banwas_achieved)

def create_dataframe_and_save_Banwas(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False, header=True)
    print(f"ETL Run completed successfully for BANWAS mines for the day {data_date}")



def extract_today_data_Kolihan(df):
    ore_grade_kolihan_units = df.iloc[0, 0]
    ore_grade_kolihan_mines = df.iloc[0, 1]
    ore_grade_kolihan_output = df.iloc[0, 2]
    ore_grade_kolihan_target = df.iloc[0, 3]
    ore_grade_kolihan_achieved = df.iloc[0, 4]

    ore_production_kolihan_units = df.iloc[1, 0]
    ore_production_kolihan_mines = df.iloc[1, 1]
    ore_production_kolihan_output = df.iloc[1, 2]
    ore_production_kolihan_target = df.iloc[1, 3]
    ore_production_kolihan_achieved = df.iloc[1, 4]

    MIC_production_kolihan_units = df.iloc[2, 0]
    MIC_production_kolihan_mines = df.iloc[2, 1]
    MIC_production_kolihan_output = df.iloc[2, 2]
    MIC_production_kolihan_target = df.iloc[2, 3]
    MIC_production_kolihan_achieved = df.iloc[2, 4]

    return (ore_grade_kolihan_units, ore_grade_kolihan_mines, ore_grade_kolihan_output, ore_grade_kolihan_target, ore_grade_kolihan_achieved,
            ore_production_kolihan_units, ore_production_kolihan_mines, ore_production_kolihan_output, ore_production_kolihan_target, ore_production_kolihan_achieved,
            MIC_production_kolihan_units, MIC_production_kolihan_mines, MIC_production_kolihan_output, MIC_production_kolihan_target, MIC_production_kolihan_achieved)

def create_dataframe_and_save_Kolihan(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for KOLIHAN mines for the day {data_date}")

def extract_today_data_Khetri(df):
    ore_grade_khetri_units = df.iloc[0, 0]
    ore_grade_khetri_mines = df.iloc[0, 1]
    ore_grade_khetri_output = df.iloc[0, 2]
    ore_grade_khetri_target = df.iloc[0, 3]
    ore_grade_khetri_achieved = df.iloc[0, 4]

    ore_production_khetri_units = df.iloc[1, 0]
    ore_production_khetri_mines = df.iloc[1, 1]
    ore_production_khetri_output = df.iloc[1, 2]
    ore_production_khetri_target = df.iloc[1, 3]
    ore_production_khetri_achieved = df.iloc[1, 4]

    MIC_production_khetri_units = df.iloc[2, 0]
    MIC_production_khetri_mines = df.iloc[2, 1]
    MIC_production_khetri_output = df.iloc[2, 2]
    MIC_production_khetri_target = df.iloc[2, 3]
    MIC_production_khetri_achieved = df.iloc[2, 4]

    return (ore_grade_khetri_units, ore_grade_khetri_mines, ore_grade_khetri_output, ore_grade_khetri_target, ore_grade_khetri_achieved,
            ore_production_khetri_units, ore_production_khetri_mines, ore_production_khetri_output, ore_production_khetri_target, ore_production_khetri_achieved,
            MIC_production_khetri_units, MIC_production_khetri_mines, MIC_production_khetri_output, MIC_production_khetri_target, MIC_production_khetri_achieved)

def create_dataframe_and_save_Khetri(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for KHETRI mines for the day {data_date}")

def extract_today_data_Kendadih(df):
    ore_grade_kendadih_units = df.iloc[0, 0]
    ore_grade_kendadih_mines = df.iloc[0, 1]
    ore_grade_kendadih_output = df.iloc[0, 2]
    ore_grade_kendadih_target = df.iloc[0, 3]
    ore_grade_kendadih_achieved = df.iloc[0, 4]

    ore_production_kendadih_units = df.iloc[1, 0]
    ore_production_kendadih_mines = df.iloc[1, 1]
    ore_production_kendadih_output = df.iloc[1, 2]
    ore_production_kendadih_target = df.iloc[1, 3]
    ore_production_kendadih_achieved = df.iloc[1, 4]

    MIC_production_kendadih_units = df.iloc[2, 0]
    MIC_production_kendadih_mines = df.iloc[2, 1]
    MIC_production_kendadih_output = df.iloc[2, 2]
    MIC_production_kendadih_target = df.iloc[2, 3]
    MIC_production_kendadih_achieved = df.iloc[2, 4]

    return (ore_grade_kendadih_units, ore_grade_kendadih_mines, ore_grade_kendadih_output, ore_grade_kendadih_target, ore_grade_kendadih_achieved,
            ore_production_kendadih_units, ore_production_kendadih_mines, ore_production_kendadih_output, ore_production_kendadih_target, ore_production_kendadih_achieved,
            MIC_production_kendadih_units, MIC_production_kendadih_mines, MIC_production_kendadih_output, MIC_production_kendadih_target, MIC_production_kendadih_achieved)

def create_dataframe_and_save_Kendadih(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for KENDADIH mines for the day {data_date}")

def extract_today_data_Mines_o_c(df):
    ore_grade_mines_o_c_units = df.iloc[0, 0]
    ore_grade_mines_o_c_mines = df.iloc[0, 1]
    ore_grade_mines_o_c_output = df.iloc[0, 2]
    ore_grade_mines_o_c_target = df.iloc[0, 3]
    ore_grade_mines_o_c_achieved = df.iloc[0, 4]

    ore_production_mines_o_c_units = df.iloc[1, 0]
    ore_production_mines_o_c_mines = df.iloc[1, 1]
    ore_production_mines_o_c_output = df.iloc[1, 2]
    ore_production_mines_o_c_target = df.iloc[1, 3]
    ore_production_mines_o_c_achieved = df.iloc[1, 4]

    MIC_production_mines_o_c_units = df.iloc[2, 0]
    MIC_production_mines_o_c_mines = df.iloc[2, 1]
    MIC_production_mines_o_c_output = df.iloc[2, 2]
    MIC_production_mines_o_c_target = df.iloc[2, 3]
    MIC_production_mines_o_c_achieved = df.iloc[2, 4]

    return (ore_grade_mines_o_c_units, ore_grade_mines_o_c_mines, ore_grade_mines_o_c_output, ore_grade_mines_o_c_target, ore_grade_mines_o_c_achieved,
            ore_production_mines_o_c_units, ore_production_mines_o_c_mines, ore_production_mines_o_c_output, ore_production_mines_o_c_target, ore_production_mines_o_c_achieved,
            MIC_production_mines_o_c_units, MIC_production_mines_o_c_mines, MIC_production_mines_o_c_output, MIC_production_mines_o_c_target, MIC_production_mines_o_c_achieved)

def create_dataframe_and_save_Mines_o_c(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for MINES_O_C mines for the day {data_date}")

def extract_today_data_Mines_u_g(df):
    ore_grade_mines_u_g_units = df.iloc[0, 0]
    ore_grade_mines_u_g_mines = df.iloc[0, 1]
    ore_grade_mines_u_g_output = df.iloc[0, 2]
    ore_grade_mines_u_g_target = df.iloc[0, 3]
    ore_grade_mines_u_g_achieved = df.iloc[0, 4]

    ore_production_mines_u_g_units = df.iloc[1, 0]
    ore_production_mines_u_g_mines = df.iloc[1, 1]
    ore_production_mines_u_g_output = df.iloc[1, 2]
    ore_production_mines_u_g_target = df.iloc[1, 3]
    ore_production_mines_u_g_achieved = df.iloc[1, 4]

    MIC_production_mines_u_g_units = df.iloc[2, 0]
    MIC_production_mines_u_g_mines = df.iloc[2, 1]
    MIC_production_mines_u_g_output = df.iloc[2, 2]
    MIC_production_mines_u_g_target = df.iloc[2, 3]
    MIC_production_mines_u_g_achieved = df.iloc[2, 4]

    return (ore_grade_mines_u_g_units, ore_grade_mines_u_g_mines, ore_grade_mines_u_g_output, ore_grade_mines_u_g_target, ore_grade_mines_u_g_achieved,
            ore_production_mines_u_g_units, ore_production_mines_u_g_mines, ore_production_mines_u_g_output, ore_production_mines_u_g_target, ore_production_mines_u_g_achieved,
            MIC_production_mines_u_g_units, MIC_production_mines_u_g_mines, MIC_production_mines_u_g_output, MIC_production_mines_u_g_target, MIC_production_mines_u_g_achieved)

def create_dataframe_and_save_Mines_u_g(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for MINES_U_G mines for the day {data_date}")

def extract_today_data_Sudra(df):
    ore_grade_sudra_units = df.iloc[0, 0]
    ore_grade_sudra_mines = df.iloc[0, 1]
    ore_grade_sudra_output = df.iloc[0, 2]
    ore_grade_sudra_target = df.iloc[0, 3]
    ore_grade_sudra_achieved = df.iloc[0, 4]

    ore_production_sudra_units = df.iloc[1, 0]
    ore_production_sudra_mines = df.iloc[1, 1]
    ore_production_sudra_output = df.iloc[1, 2]
    ore_production_sudra_target = df.iloc[1, 3]
    ore_production_sudra_achieved = df.iloc[1, 4]

    MIC_production_sudra_units = df.iloc[2, 0]
    MIC_production_sudra_mines = df.iloc[2, 1]
    MIC_production_sudra_output = df.iloc[2, 2]
    MIC_production_sudra_target = df.iloc[2, 3]
    MIC_production_sudra_achieved = df.iloc[2, 4]

    return (ore_grade_sudra_units, ore_grade_sudra_mines, ore_grade_sudra_output, ore_grade_sudra_target, ore_grade_sudra_achieved,
            ore_production_sudra_units, ore_production_sudra_mines, ore_production_sudra_output, ore_production_sudra_target, ore_production_sudra_achieved,
            MIC_production_sudra_units, MIC_production_sudra_mines, MIC_production_sudra_output, MIC_production_sudra_target, MIC_production_sudra_achieved)

def create_dataframe_and_save_Sudra(df0, data_date, *data):
    columns = ["Unit", "Mines", "Output", "Target", "Achieved", "Effective_Date"]
    data_dict = dict(zip(columns[:-1], data), Effective_Date=[data_date]*len(data[0]))

    var3 = pd.DataFrame(data_dict)
    var4 = pd.concat([df0, var3])

    file_name = WAREHOUSE
    var4.to_excel(file_name, index=False)
    print(f"ETL Run completed successfully for SUDRA mines for the day {data_date}")

def run_banwas(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'BANWAS_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_banwas = read_excel_file(dataFile)
        data_banwas = extract_today_data_Banwas(df_banwas)
        create_dataframe_and_save_Banwas(df0, data_date, *data_banwas)
    else:
        handleLog("Banwas File for "+data_date+" does not exists")

def run_kolihan(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'KOLIHAN_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_kolihan = read_excel_file(dataFile)
        data_kolihan = extract_today_data_Kolihan(df_kolihan)
        create_dataframe_and_save_Kolihan(df0, data_date, *data_kolihan)
    else:
        handleLog("Kolihan File for "+data_date+" does not exists")

def run_khetri(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'KHETRI_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_khetri = read_excel_file(dataFile)
        data_khetri = extract_today_data_Khetri(df_khetri)
        create_dataframe_and_save_Khetri(df0, data_date, *data_khetri)
    else:
        handleLog("Khetri File for "+data_date+" does not exists")

def run_kendadih(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'KENDADIH_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_kendadih = read_excel_file(dataFile)
        data_kendadih = extract_today_data_Kendadih(df_kendadih)
        create_dataframe_and_save_Kendadih(df0, data_date, *data_kendadih)
    else:
        handleLog("Kendadih File for "+data_date+" does not exists")

def run_mines_o_c(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'MINES_O_C_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_mines_o_c = read_excel_file(dataFile)
        data_mines_o_c = extract_today_data_Mines_o_c(df_mines_o_c)
        create_dataframe_and_save_Mines_o_c(df0, data_date, *data_mines_o_c)
    else:
        handleLog("MINES_O_C File for "+data_date+" does not exists")

def run_mines_u_g(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'MINES_U_G_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_mines_u_g = read_excel_file(dataFile)
        data_mines_u_g = extract_today_data_Mines_u_g(df_mines_u_g)
        create_dataframe_and_save_Mines_u_g(df0, data_date, *data_mines_u_g)
    else:
        handleLog("MINES_U_G File for "+data_date+" does not exists")

def run_sudra(df0):
    dataFile = os.path.join(os.path.dirname(__file__), "data", 'SUDRA_'+data_date+'.xlsx')
    if os.path.exists(dataFile):
        df_sudra = read_excel_file(dataFile)
        data_sudra = extract_today_data_Sudra(df_sudra)
        create_dataframe_and_save_Sudra(df0, data_date, *data_sudra)
    else:
        handleLog("Sudra File for "+data_date+" does not exists")

def run_etl():
    df = read_excel_file(WAREHOUSE)
    if(len(df)==0) or (len(df)!=0 and df.iloc[-1,5]!= str(date.today())):
        run_banwas(df)
        run_kolihan(read_excel_file(WAREHOUSE))
        run_khetri(read_excel_file(WAREHOUSE))
        run_kendadih(read_excel_file(WAREHOUSE))
        run_mines_o_c(read_excel_file(WAREHOUSE))
        run_mines_u_g(read_excel_file(WAREHOUSE))
        run_sudra(read_excel_file(WAREHOUSE))
        convert_last_nrows_xlsx_to_csv(WAREHOUSE, SOURCE)
    else:
        handleLog("ETL has already been run")

def main():
    run_etl()
    

if __name__ == "__main__":
    main()
