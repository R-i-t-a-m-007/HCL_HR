import pandas as pd
import os

def convert_xlsx_to_csv(xlsx_filepath, output_csv_filepath):
    df = pd.read_excel(xlsx_filepath, header=0, skiprows=[0])
    headers = ["Initial Lease Grant Date","Mine Lease validity till","Balance (Days)","Balance (Years)","Alert Type","Renewal Status","ML Deed Execution","ML Area (ha)","Forest Area(ha)","FC Stage-II granted on","FC Valid till","Balance (Days).1","Balance (Years).1","Alert Type.1","Stage-II approval (ha)","NPV Paid area (ha)","Mining Plan","Renewal Status.1","Balance (Days).2","Balance (Years).2","Alert Type.2","EC Capacity","EC granted on","EC Valid till","EC Renewal Status","Balance (Days).3","Balance (Years).3","Alert Type.3","Wildlife Clearance","CGWA NoC","Alert Type.4","CGWA NoC Status","CTE","CTO","Conc. Plant EC","Conc. Plant EC Capacity","Alert Type.5","Conc. Plant CTE","Conc. Plant CTO","Conc. Plant CTO Capacity","Alert Type.6"]
    df["Mines"] = df["Mines"].str.strip()
    df["Mines"] = df["Mines"].str.replace('\n', '')
    for header in headers:
        if(isinstance(df[header][0], str)):
            df[header] = df[header].str.replace('\n', ' ')
            df[header] = df[header].str.strip()
    dframe = df.fillna(" ")
    print(dframe)
    dframe.to_csv(output_csv_filepath, index=False)
    
def main():
    input_file = os.path.join(os.path.dirname(__file__), "data", "rawData.xlsx")
    output_file = os.path.join(os.path.dirname(__file__), "requiredData", "statutoryData.csv")
    convert_xlsx_to_csv(input_file, output_file)

if __name__ == "__main__":
    main()