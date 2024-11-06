# from progressOperations import create_db_progress 
from assets.dashboard.dashboardOperations import create_db_dashboard, create_db_dashboard_required_data
from assets.progress.progressOperations import main as prepare_progress_db
from assets.statutory.statutoryOperations import main as prepare_statutory_db
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import sys
from datetime import datetime
from assets.exploration.functions.exploration import handle_manual_etl as perform_exploration_manual_etl

app = Flask(__name__) #flask application

cors = CORS(app)

#function for error log
# def error_log(exception):
#     timestamp=datetime.now().strftime('%d-%m-%Y %H:%M:%S')
#     error_msg = f"{exception}"
#     print(error_msg)
#     logging.error(error_msg)

logging.basicConfig(filename="output_log.log", format="%(asctime)s - %(message)s-%(levelname)s" , level=logging.DEBUG)

# sys.stdout = open('error_log.log', 'a')
# sys.stderr = open('error_log.log', 'a')

# logging.shutdown()
 
#dashboard routes-----------

create_db_dashboard()

# Form data---------------

def create_user_db():
    conn = sqlite3.connect('userdata.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        mail TEXT NOT NULL,
                        name TEXT NOT NULL,
                        department TEXT NOT NULL,
                        password TEXT NOT NULL,
                        access TEXT NOT NULL
                    )''')
    # email = "admin@gmail.com"
    # name = "admin"
    # department = ""
    # password = "admin"
    # access = ""
    # cursor.execute('INSERT OR REPLACE INTO users (mail, name, department, password, access) VALUES (?, ?, ?, ?, ?)', (email, name, department, password, access))
    # conn.commit()
    # conn.close()
    
create_user_db()

def insert_user_data(name, email, department, password, access):
    conn = sqlite3.connect('userdata.db')
    cursor = conn.cursor()
    cursor.execute('INSERT OR REPLACE INTO users (mail, name, department, password, access) VALUES (?, ?, ?, ?, ?)', (email, name, department, password, access))
    conn.commit()
    conn.close()

@app.route('/insertuser', methods=['POST'])
def insertuser():
    try:
        data = request.get_json()
        name = data['name']
        mail = data['mail']
        department = data['department']
        password = data['password']
        access = data['access']
        insert_user_data(name, mail, department, password, access)
        return jsonify({'message': 'User data inserted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/updateuser', methods=['POST'])
def updateuser():
    try:
        data = request.get_json()
        name = data['name']
        mail = data['mail']
        department = data['department']
        password = data['password']
        access = data['access']
        id = data['id']
        conn = sqlite3.connect('userdata.db')
        cursor = conn.cursor()
        cursor.execute('UPDATE users SET mail = ?, name = ?, department = ?, password = ?, access = ? WHERE id = ?;', (mail, name, department, password, access, id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User data updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get_user_data', methods=['GET'])
def get_user_data():
    try:
        conn = sqlite3.connect('userdata.db')
        cursor = conn.cursor()

        query = """
            SELECT * FROM users
        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"id": row[0], "mail": row[1], "name": row[2], "department": row[3], "password": row[4], "access": row[5] if len(row) > 4 else ""} for row in data]
        
        conn.close()

        return jsonify(response), 200  
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete/<mail>', methods=['DELETE'])
def delete(mail):
    try:
        conn = sqlite3.connect('userdata.db')
        cursor = conn.cursor()
        # mail=request.args.get("mail")

        query = """
            DELETE FROM users WHERE id=:id
        """
        cursor.execute(query, (mail,))
        # cursor.execute(query,{"mail":mail})
        conn.commit()
        conn.close()

        return jsonify({'message': 'User has been deleted'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
   



# ---------------Form data

@app.route('/get_performance_data', methods=['GET'])
def get_performance_data():
    try:
        conn = sqlite3.connect('dashboard.db')
        cursor = conn.cursor()

        department = request.args.get('department')

        query = """
            SELECT * FROM sale_poc1 WHERE Overall_performance = :department
        """

        cursor.execute(query, {'department': department})
        data = cursor.fetchall()

        response = [{"Unit": row[2], "Daily_target": row[3], "Monthly_target": row[4], "Daily_progress": row[5], "Monthly_progress": row[6], "Cumulative_progress": row[7]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500

create_db_dashboard_required_data()

@app.route('/get_mic_yearly_unit_prod_status', methods=['GET'])
def get_mic_yearly_unit_prod_status():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')

        query = """
            SELECT Unit, CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved, (CAST(ROUND(SUM(Target)) as INT) - CAST(ROUND(SUM(Achieved)) as INT)) as Gap FROM dashboard_poc
            WHERE Effective_Date LIKE :year || "%"
            AND Output = "MIC Production"
            GROUP BY Unit
            ORDER BY Unit
        """

        cursor.execute(query, {'year': year})
        data = cursor.fetchall()

        response = [{"unit": row[0], "target": row[1], "achieved": row[2], "gap": row[3]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_mic_monthly_unit_prod_status', methods=['GET'])
def get_mic_monthly_unit_prod_status():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')
        month = request.args.get('month')

        query = """
            SELECT Unit, CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved, (CAST(ROUND(SUM(Target)) as INT) - CAST(ROUND(SUM(Achieved)) as INT)) as Gap FROM dashboard_poc
            WHERE Effective_Date LIKE :year || "%" AND substr(Effective_Date, 6, 2) = :month
            AND Output = "MIC Production"
            GROUP BY Unit
            ORDER BY Unit
        """

        cursor.execute(query, {'year': year, 'month': month})
        data = cursor.fetchall()

        response = [{"unit": row[0], "target": row[1], "achieved": row[2], "gap": row[3]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
    

@app.route('/get_ore_prod', methods=['GET'])
def get_ore_prod():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')
        mine = request.args.get('mine')

        query = """
            SELECT substr(Effective_Date, 6, 2) as Month, CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved FROM dashboard_poc
            WHERE Effective_Date LIKE :year || "%"
            AND Mines = :mine AND Output = "Ore Production"
            GROUP BY substr(Effective_Date, 6, 2)
            ORDER BY Effective_Date
        """

        cursor.execute(query, {'year': year, 'mine': mine})
        data = cursor.fetchall()

        response = [{"month": row[0], "target": row[1], "achieved": row[2]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_mic_prod', methods=['GET'])
def get_mic_prod():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')
        unit = request.args.get('unit')

        query = """
            SELECT substr(Effective_Date, 6, 2) as Month, CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved FROM dashboard_poc
            WHERE Effective_Date LIKE :year || "%"
            AND Unit = :unit AND Output = "MIC Production"
            GROUP BY substr(Effective_Date, 6, 2)
            ORDER BY Effective_Date
        """

        cursor.execute(query, {'year': year, 'unit': unit})
        data = cursor.fetchall()

        response = [{"month": row[0], "target": row[1], "achieved": row[2]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_overall_ore_prod', methods=['GET'])
def get_overall_ore_prod():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')

        query = """
            SELECT CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved, (CAST(ROUND(SUM(Target)) as INT) - CAST(ROUND(SUM(Achieved)) as INT)) as Gap FROM dashboard_poc
            WHERE Output = "Ore Production" AND Effective_Date LIKE :year || "%"
        """

        cursor.execute(query, {'year': year})
        data = cursor.fetchall()

        response = [{"target": row[0], "achieved": row[1], "gap": row[2]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_overall_mic_prod', methods=['GET'])
def get_overall_mic_prod():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        year = request.args.get('year')

        query = """
            SELECT CAST(ROUND(SUM(Target)) as INT) as Target, CAST(ROUND(SUM(Achieved)) as INT) as Achieved, (CAST(ROUND(SUM(Target)) as INT) - CAST(ROUND(SUM(Achieved)) as INT)) as Gap FROM dashboard_poc
            WHERE Output = "MIC Production" AND Effective_Date LIKE :year || "%"
        """

        cursor.execute(query, {'year': year})
        data = cursor.fetchall()

        response = [{"target": row[0], "achieved": row[1], "gap": row[2]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/get_dashboard_latest_etl_date', methods=['GET'])
def get_dashboard_latest_etl_date():
    try:
        conn = sqlite3.connect('dashboard_data.db')
        cursor = conn.cursor()

        query = """
            SELECT Effective_Date FROM dashboard_poc
            WHERE Effective_Date <= strftime('%Y-%m-%d', 'now')
            ORDER BY Effective_Date DESC
            LIMIT 1
        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"date": row[0]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500


#progress routes----------

prepare_progress_db()

@app.route('/get_progress_latest_etl_date', methods=['GET'])
def get_progress_latest_etl_date():
    try:
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        query = """
            SELECT Data_date FROM progress_poc
            WHERE Data_date <= strftime('%Y-%m-%d', 'now')
            ORDER BY Data_date DESC
            LIMIT 1
        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"date": row[0]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Define a route to fetch data from the "revenue" table
@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT * FROM progress_poc
            WHERE Mine = :mine AND Unit = :unit
        """

        cursor.execute(query, {'mine': mine, 'unit': unit})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Units": row[0], "Mines": row[1], "Task": row[4], "Contractors": row[2], "StartDate": row[9], "Duration": row[11], "EndDate": row[10], "DaysCompleted": int(row[11])-int(row[14]), "Progress": row[15], "Budget": row[16], "Actual": row[17], "Remaining": row[18], "Target_Qty": row[19], "Days_till_today": row[20], "Target_percentage": row[21], "today": row[22]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_unit_mine_contractor', methods=['GET'])
def get_unit_mine_contractor():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        # Execute a query to retrieve data from the "revenue" table
        query = """
            select Unit, Mine, Contractor from progress_poc GROUP BY Mine ORDER BY Unit
        """


        cursor.execute(query)
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Unit": row[0], "Mine": row[1], "Contractor": row[2],} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_progress', methods=['GET'])
def get_progress():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        percent = request.args.get('percent')

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT COUNT(*) FROM progress_poc WHERE Progress = :percent 
            AND Task != "Master Schedule"  
            AND Mine = :mine AND Unit = :unit
        """
        
        cursor.execute(query, {'percent': percent, 'mine': mine, 'unit': unit})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Progress": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_in_progress', methods=['GET'])
def get_in_progress():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        percent = 100

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT COUNT(Progress) FROM progress_poc WHERE Progress != 0 AND Progress != 1
            AND Task != "Master Schedule"  
            AND Mine = :mine AND Unit = :unit
        """

        cursor.execute(query, {'percent': percent, 'mine': mine, 'unit': unit,})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Progress": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_budget', methods=['GET'])
def get_budget():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT CAST(Budget as INT) as Budget from progress_poc
            WHERE Unit = :unit AND Mine = :mine
            AND Task = "Master Schedule"
        """

        cursor.execute(query, {'mine': mine, 'unit': unit,})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Budget": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_actual', methods=['GET'])
def get_actual():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT CAST(Consumed as INT) as Consumed from progress_poc
            WHERE Unit = :unit AND Mine = :mine
            AND Task = "Master Schedule"
        """

        cursor.execute(query, {'mine': mine, 'unit': unit,})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Actual": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_remaining', methods=['GET'])
def get_remaining():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT CAST(Remaining as INT) as Remaining from progress_poc
            WHERE Unit = :unit AND Mine = :mine
            AND Task = "Master Schedule"
        """

        cursor.execute(query, {'mine': mine, 'unit': unit})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Remaining": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_days_completed', methods=['GET'])
def get_days_completed():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT Duration - DaysRemaining AS DaysCompleted from progress_poc
            WHERE Unit = :unit AND Mine = :mine
            AND Task LIKE "Master Schedule%"
        """
        cursor.execute(query, {'mine': mine, 'unit': unit,})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"val": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_duration', methods=['GET'])
def get_duration():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')
        unit = request.args.get('unit')
        contract = request.args.get('contract')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT SUM("Duration") FROM progress_poc
        """

        conditions = []

        if mine and mine != "MINES":
            conditions.append("Mine = :mine")
        # if unit:
            conditions.append("Unit = :unit")
        if contract and contract != "CONTRACTS":
            conditions.append("Contractor = :contract")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        cursor.execute(query, {'mine': mine, 'unit': unit, 'contract': contract})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"val": row[0]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_years', methods=['GET'])
def get_years():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT DISTINCT(substring("StartDate", 0, 5)) as year from progress_poc ORDER BY substring("StartDate", 0, 5)
        """

        cursor.execute(query)
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [row[0] for row in data]

        # Close the database connection
        conn.close()

        return jsonify({"years": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_task_frequency', methods=['GET'])
def get_task_frequency():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        year = request.args.get('year')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT
            substring("StartDate", 6, 2) AS Month,
            COUNT(*) AS Task_Count
            FROM progress_poc
            WHERE substring("StartDate", 0, 5) = :year
            GROUP BY Month
            ORDER BY Month;
        """

        cursor.execute(query, {'year': year})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"month": row[0], "tasks": row[1]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_mine_data', methods=['GET'])
def get_mine_data():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('progress.db')
        cursor = conn.cursor()

        unit = request.args.get('unit')
        mine = request.args.get('mine')

        # Execute a query to retrieve data from the "revenue" table
        query = """
            SELECT * from progress_poc
            WHERE Unit = :unit AND Mine = :mine 
        """

        cursor.execute(query, {'unit': unit, 'mine': mine})
        data = cursor.fetchall()

        # Define the response format (you may adjust this based on your table structure)
        response = [{"Units": row[0], "Mines": row[1], "Sl": row[3], "Task": row[4], "Contractors": row[2], "BoQ_Qty": row[5], "Act._Qty": row[6], "StartDate": row[9], "Duration": row[11], "EndDate": row[10], "DaysCompleted": int(row[11])-int(row[14]), "ActualStart": row[12], "ActualEnd": row[13], "Progress": row[15], "Budget": row[16], "Actual": row[17], "Remaining": row[18], "LOI": row[7], "Mobilisation": row[8], "Target_Qty": row[19], "Days_till_today": row[20], "Target_percentage": row[21], "today": row[22]} for row in data]

        # Close the database connection
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# statutory routes ----
    
prepare_statutory_db()

@app.route('/get_statutory_latest_etl_date', methods=['GET'])
def get_statutory_latest_etl_date():
    try:
        conn = sqlite3.connect('statutory.db')
        cursor = conn.cursor()

        query = """
            SELECT Data_date FROM statutory_poc
            WHERE Data_date <= strftime('%Y-%m-%d', 'now')
            ORDER BY Data_date DESC
            LIMIT 1
        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"date": row[0]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_mine_statutory', methods=['GET'])
def get_mine_statutory():
    try:
        conn = sqlite3.connect('statutory.db')
        cursor = conn.cursor()

        mine = request.args.get('mine')

        query = """
            SELECT * FROM statutory_poc
            WHERE Mines = :mine
        """

        cursor.execute(query, {'mine': mine})
        data = cursor.fetchall()

        response = [{
            "mine": row[0], 
            "initial_lease_grant_date": row[1], 
            "mine_lease_validity_till": row[2], 
            "balance_(days)": row[3],
            "balance_(years)": row[4], 
            "alert_type": row[5], 
            "renewal_status": row[6], 
            "ml_deed_execution": row[7],
            "ml_area_(ha)": row[8], 
            "forest_area_(ha)": row[9], 
            "fc_stage-II_granted_on": row[10], 
            "fc_valid_till": row[11],
            "balance_(days)_1": row[12],
            "balance_(years)_1": row[13], 
            "alert_type_1": row[14], 
            "stage-II_approval_(ha)": row[15],
            "npv_paid_area_(ha)": row[16], 
            "mining_plan": row[17], 
            "renewal_status_1": row[18], 
            "balance_(days)_2": row[19],
            "balance_(years)_2": row[20], 
            "alert_type_2": row[21], 
            "ec_capacity": row[22], 
            "ec_granted_on": row[23],
            "ec_valid_till": row[24], 
            "ec_renewal_status": row[25],
            "balance_(days)_3": row[26], 
            "balance_(years)_3": row[27], 
            "alert_type_3": row[28], 
            "wildlife_clearance": row[29],
            "cgwa_noc": row[30], 
            "alert_type_4": row[31], 
            "cgwa_noc_status": row[32], 
            "cte": row[33],
            "cto": row[34], 
            "conc._plant_ec": row[35],
            "conc._plant_ec_capacity": row[36], 
            "alert_type_5": row[37], 
            "conc._plant_cte": row[38], 
            "conc._plant_cto": row[39],
            "conc._plant_cto_capacity": row[40], 
            "alert_type_6": row[41], 
        } for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# HR Dashboard-------------
# import csv
# from flask import Flask, jsonify
# from sqlalchemy import create_engine, Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import pandas as pd  
# from sqlalchemy import func

# from flask import Flask, jsonify, request
# from sqlalchemy import func
# from assets.hr.functions.hr import Employee, get_session,create_database
# import pandas as pd

# # def fetch_session():
# #     session = get_session()
# #     try:
# #         yield session
# #     finally:
# #         session.close()

# script_dir = os.path.dirname(os.path.abspath(__file__))
# file_path = os.path.join(script_dir, 'assets/hr/output_csv/HR Blank Format_Head_2024 with Dummy data.csv')
    
# create_database(file_path)  


# @app.route('/hrdata')
# def data_api():
#     session = get_session()
#     # Query the data from the database
#     employees = session.query(Employee).all()
#     # Convert SQLAlchemy objects to dictionary
#     data = [{'unit': employee.unit, 'emp_code': employee.emp_code, 'sex':employee.sex,'full_name':employee.full_name,'date_of_birth':employee.date_of_birth,'grade':employee.grade,'designation':employee.designation,'blood_group':employee.blood_group,'department':employee.department,'category':employee.category,'handicap':employee.handicap,'employee_type':employee.employee_type} for employee in employees]
#     return jsonify(data)

# @app.route('/employee_counts')
# def employee_counts():
  
#   session = get_session()

#   executives = session.query(Employee).filter(Employee.employee_type == 'Executive').count()
  
#   technical = session.query(Employee).filter(Employee.employee_type == 'Technical').count()

#   nontechnical = session.query(Employee).filter(Employee.employee_type == 'Non-Technical').count()


#   data = {
#     'executives': executives, 
#     'technical': technical,
#     'non-technical': nontechnical
#   }
  
#   return jsonify(data)

# @app.route('/sex_counts')
# def sex_counts():
  
#   session = get_session()

#   male_workers = session.query(Employee).filter(Employee.employee_type.ilike('Worker'), Employee.sex.ilike('Male')).count()
  
#   female_workers = session.query(Employee).filter(Employee.employee_type.ilike('Worker'),Employee.sex.ilike('Female')).count()

#   male_executives = session.query(Employee).filter(Employee.employee_type.ilike('Executive'), Employee.sex.ilike('Male')).count()
  
#   female_executives = session.query(Employee).filter(Employee.employee_type.ilike('Executive'), Employee.sex.ilike('Female')).count()

# #   print("Male Workers:", male_workers)
# #   print("Female Workers:", female_workers)
# #   print("Male Executives:", male_executives)
# #   print("Female Executives:", female_executives)
  
#   data = {
#     'Male Worker': male_workers, 
#     'Female Worker': female_workers, 
#     'Male Executive': male_executives,
#     'Female Executive': female_executives
#   }
  
  
#   return jsonify(data)

# @app.route('/handicapped_counts')  
# def handicapped_counts():
  
#   session = get_session()

#   handicapped = session.query(Employee).filter(Employee.handicap == 'Yes').count()
  
#   non_handicapped = session.query(Employee).filter(Employee.handicap == 'No').count()

#   data = {
#     'handicapped': handicapped,
#     'non_handicapped': non_handicapped
#   }
  
#   return jsonify(data)

# @app.route('/category_counts')
# def category_counts():
  
#   session = get_session()

#   general = session.query(Employee).filter(Employee.category == 'General').count()
  
#   sc = session.query(Employee).filter(Employee.category == 'SC').count()
  
#   st = session.query(Employee).filter(Employee.category == 'ST').count()

#   obc = session.query(Employee).filter(Employee.category == 'OBC').count()

#   data = {
#     'general': general,
#     'sc': sc,
#     'st': st, 
#     'obc': obc
#   }

#   return jsonify(data)

# @app.route('/position_counts')
# def position_counts():
  
#   session = get_session()

#   junior = session.query(Employee).filter(Employee.position == 'Junior').count()
  
#   senior = session.query(Employee).filter(Employee.position == 'Senior').count()

#   intermediate = session.query(Employee).filter(Employee.position == 'Intermediate').count()

#   trainee = session.query(Employee).filter(Employee.position == 'Trainee').count()

#   data = {
#     'junior': junior,
#     'senior': senior,
#     'intermediate': intermediate,
#     'trainee': trainee
#   }
  
#   return jsonify(data)

# @app.route('/bloodgroup_counts')  
# def bloodgroup_counts():

#   A_POS = session.query(Employee).filter(Employee.blood_group == 'A+').count()
#   B_POS = session.query(Employee).filter(Employee.blood_group == 'B+').count()
#   AB_POS = session.query(Employee).filter(Employee.blood_group == 'AB+').count()
#   O_POS = session.query(Employee).filter(Employee.blood_group == 'O+').count()
#   A_NEG = session.query(Employee).filter(Employee.blood_group == 'A-').count()
#   B_NEG = session.query(Employee).filter(Employee.blood_group == 'B-').count()
#   AB_NEG = session.query(Employee).filter(Employee.blood_group == 'AB-').count()
#   O_NEG = session.query(Employee).filter(Employee.blood_group == 'O-').count()
  
  
#   data = {
#     'A+': A_POS,
#     'B+': B_POS,
#     'AB+': AB_POS,
#     'O+': O_POS,
#     'A-': A_NEG,
#     'B-': B_NEG,
#     'AB-': AB_NEG,
#     'O-': O_NEG
#   }

#   return jsonify(data)

# @app.route('/designation_counts')
# def designation_counts():
#   session = get_session()
#   mining_eng = session.query(Employee).filter(Employee.designation == 'Mining Engineer').count()
  
#   mining_res = session.query(Employee).filter(Employee.designation == 'Mining Researcher').count()

#   drilling_eng = session.query(Employee).filter(Employee.designation == 'Drilling Engineer').count()

#   db_admin = session.query(Employee).filter(Employee.designation == 'DB Admin').count()

#   it_analyst = session.query(Employee).filter(Employee.designation == 'IT Analyst').count()


#   data = {
#     'Mining Engineer': mining_eng,
#     'Mining Researcher': mining_res,
#     'Drilling Engineer': drilling_eng,
#     'DB Admin': db_admin,
#     'IT Analyst': it_analyst
#   }
  
#   return jsonify(data)

# @app.route('/birth_month_counts')
# def birth_month_counts():
#     df = pd.read_csv(file_path)
    
#     df['birth_month'] = pd.to_datetime(df['Date of Birth']).dt.month
    
#     month_counts = df['birth_month'].value_counts().sort_index().to_dict()
    
#     month_names = [
#         'January', 'February', 'March', 'April', 'May', 'June', 
#         'July', 'August', 'September', 'October', 'November', 'December'
#     ]
    
#     result = {month_names[i - 1]: month_counts.get(i, 0) for i in range(1, 13)}
    
#     return jsonify(result)

# @app.route('/shift_counts')
# def shift_counts():
#     df = pd.read_csv(file_path)
    
#     shift_counts = df['Shift Start'].value_counts().to_dict()
    
#     result = [{'shift': shift, 'count': count} for shift, count in shift_counts.items()]
    
#     return jsonify(result)

# @app.route('/department_counts')
# def department_counts():
#     session = get_session()
#     unit = request.args.get('unit')

#     if not unit:
#         return jsonify({"error": "Unit parameter is required"}), 400

#     department_types = ['Mines', 'IT', 'HR', 'Sales', 'Operation', 'M&C', 'Finance']

#     department_counts = {department_type: 0 for department_type in department_types}

#     for department_type in department_types:
#         count = session.query(Employee).filter(Employee.unit == unit, Employee.department == department_type).count()
#         department_counts[department_type] = count

#     return jsonify(department_counts)

# @app.route('/bloodgroup_counts')
# def bloodgroup_counts():
#     session = get_session()
#     unit = request.args.get('unit')

#     if not unit:
#         return jsonify({"error": "Unit parameter is required"}), 400

#     blood_groups_query = session.query(Employee.blood_group).filter(Employee.unit == unit).distinct()
#     blood_groups = [bg[0] for bg in blood_groups_query.all()]

#     blood_group_counts = {blood_group: 0 for blood_group in blood_groups}

#     for blood_group in blood_groups:
#         count = session.query(Employee).filter(Employee.unit == unit, Employee.blood_group == blood_group).count()
#         blood_group_counts[blood_group] = count

#     return jsonify(blood_group_counts)

# @app.route('/gender_counts_by_employee_type')
# def gender_counts_by_employee_type():
#     session = get_session()
#     employee_type = request.args.get('employeeType')

#     if not employee_type:
#         return jsonify({"error": "Employee type parameter is required"}), 400

#     if employee_type.lower() not in ['executive', 'technical', 'non-technical']:
#         return jsonify({"error": "Invalid employee type parameter"}), 400

#     males_count = session.query(func.count()).filter(Employee.employee_type == employee_type, Employee.sex == 'Male').scalar()
#     females_count = session.query(func.count()).filter(Employee.employee_type == employee_type, Employee.sex == 'Female').scalar()

#     data = {
#         'male': males_count,
#         'female': females_count
#     }

#     return jsonify(data)

# @app.route('/employee_category_counts')
# def employee_category_counts():
#     session = get_session()
#     employee_type = request.args.get('employee_type')

#     if not employee_type:
#         return jsonify({"error": "Employee type parameter is required"}), 400

#     employee_categories_query = session.query(Employee.employee_category).filter(Employee.employee_type == employee_type).distinct()
#     employee_categories = [category[0] for category in employee_categories_query.all()]

#     employee_category_counts = {category: {'male': 0, 'female': 0} for category in employee_categories}

#     for category in employee_categories:

#         male_count = session.query(func.count()).filter(Employee.employee_type == employee_type, Employee.employee_category == category, Employee.sex == 'Male').scalar()
#         employee_category_counts[category]['male'] = male_count

#         female_count = session.query(func.count()).filter(Employee.employee_type == employee_type, Employee.employee_category == category, Employee.sex == 'Female').scalar()
#         employee_category_counts[category]['female'] = female_count

#     return jsonify(employee_category_counts)

# ---------------------HR Dashboard

#--------- Exploration Dashboard----------------
# import shutil

# @app.route('/archive')
# def archive():
#     source = r"D:\ETL-v2\Hcl_dash_type4\backend\assets\exploration\assets\xlsx\ICC_test.xls"
  
#     # Destination path 
#     destination = r"D:\ETL-v2\Hcl_dash_type4\backend\assets\exploration\historical_data"
    
#     # Move the content of 
#     # source to destination 
#     dest = shutil.move(source, destination) 
    
#     print(dest)

@app.route('/get_exploration_filter_data', methods=['GET'])
def get_exploration_filter_data():
    try:
        conn = sqlite3.connect('exploration.db')
        cursor = conn.cursor()
        # SELECT Unit, SUBSTR(Mine, 1, INSTR(Mine, ' ') - 1) AS Mine, "Drilling Type", Contractor FROM exploration_poc
        #     ORDER BY Unit, Mine

        query = """
            SELECT Unit, 
                CASE 
                    WHEN Mine LIKE 'Mines%' THEN Mine 
                    ELSE SUBSTR(Mine, 1, INSTR(Mine, ' ') - 1) 
                END AS Mine, 
                "Drilling Type", 
                Contractor 
            FROM exploration_poc
            WHERE current_row=1 
            ORDER BY Unit, Mine

        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"unit": row[0], "mine": row[1], "drillingType": row[2], "contractor": row[3]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_exploration_latest_etl_date', methods=['GET'])
def get_exploration_latest_etl_date():
    try:
        conn = sqlite3.connect('exploration.db')
        cursor = conn.cursor()

        query = """
            SELECT date FROM exploration_poc
            WHERE date <= strftime('%Y-%m-%d', 'now') 
            ORDER BY date DESC
            LIMIT 1
        """

        cursor.execute(query)
        data = cursor.fetchall()

        response = [{"date": row[0]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/check_exploration_db')
def check_db():
    db_file = 'exploration.db'  # Specify the name of your database file
    db_exists = os.path.exists(db_file)
    return jsonify({'exists': db_exists})

# bill_month : args to be passed - unit, mine, drilling_type, contractor, month:
# {bill_raised: 0, payment_made: 0}
# Done
@app.route('/bill_month',methods=['GET'])
def bill_month():
    try:
        con=sqlite3.connect('exploration.db')
        cursor=con.cursor()

        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        month = request.args.get('month')

        query="""
        SELECT "Bills raised by Contractor in the month" as billRaised, "Payments made to Contractor in the month" as paymentMade FROM exploration_poc
        WHERE Unit=:unit AND Mine Like :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor AND Month=:month
        AND current_row=1 
        ORDER BY Unit;
        """

        # tester - WHERE  Unit="ICC" AND Mine Like "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s MPS Engineering, Rajasthan" AND Month = "January"

        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'month':month})
        # data=cursor.fetchall()
        # response=[{"billRaised":row[0],"paymentMade":row[1]} for row in data]

        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"billRaised": data[0]*100000, "paymentMade": data[1]*100000}
        else:
            response = {"billRaised": 0, "paymentMade": 0} 
        con.close()
        return jsonify(response),200
    
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/bill_fy',methods=['GET'])
def bill_fy():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        financial_year = request.args.get('financial_year')
        starting_year = financial_year.split("-")[0]

        query="""
        SELECT 
            "Bills raised by Contractor in the month" AS billRaised, 
            "Payments made to Contractor in the month" AS paymentMade 
        FROM 
            exploration_poc
        WHERE  
            Unit=:unit
            AND Mine LIKE :mine || "%"
            AND "Drilling Type"=:drillingType
            AND Contractor=:contractor
            AND current_row=1 
            AND CAST(
                CASE 
                    WHEN CAST(SUBSTR("date", INSTR("date", '/') + 1, LENGTH("date") - INSTR("date", '/') - 4) AS INT) >= 4 THEN CAST(SUBSTR("date", LENGTH("date") - 3) AS INT)
                    ELSE CAST(SUBSTR("date", LENGTH("date") - 3) AS INT) - 1
                END
            AS TEXT)=:starting_year
        ORDER BY 
            Unit;
        """
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'starting_year':starting_year})
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"billRaised": data[0]*100000, "paymentMade": data[1]*100000}
        else:
            response = {"billRaised": 0, "paymentMade": 0} 
        conn.close()
        return jsonify(response),200
    
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/capex_fy',methods=['GET'])
def capex_fy():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        financial_year = request.args.get('financial_year')
        starting_year = financial_year.split("-")[0]

        query="""
        SELECT "Target CAPEX Amount for FY" as Target, 
            "Achieved CAPEX Amount for FY" as Achieved  
            FROM exploration_poc
        WHERE  
            Unit=:unit
            AND Mine LIKE :mine || "%"
            AND "Drilling Type"=:drillingType
            AND Contractor=:contractor
            AND current_row=1 
            AND CAST(
                CASE 
                    WHEN CAST(SUBSTR("date", INSTR("date", '/') + 1, LENGTH("date") - INSTR("date", '/') - 4) AS INT) >= 4 THEN CAST(SUBSTR("date", LENGTH("date") - 3) AS INT)
                    ELSE CAST(SUBSTR("date", LENGTH("date") - 3) AS INT) - 1
                END
            AS TEXT)=:starting_year
        ORDER BY 
            Unit;
        """
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'starting_year':starting_year})
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"billRaised": data[0]*100000, "paymentMade": data[1]*100000}
        else:
            response = {"billRaised": 0, "paymentMade": 0} 
        conn.close()
        return jsonify(response),200
    
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
# Done
@app.route('/bill_inception',methods=['GET'])
def bill_inception():
    try:
        con=sqlite3.connect('exploration.db')
        cursor=con.cursor()

        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')

        query="""
        SELECT "Bills rised by Contractor upto the month from inception" as billRaised, "Payments made to Contractor upto the month from inception" as paymentMade FROM exploration_poc
        WHERE Unit=:unit AND Mine Like :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor
        AND current_row=1 
        ORDER BY Unit;
        """

        # tester - WHERE  Unit="ICC" AND Mine Like "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s MPS Engineering, Rajasthan" AND Month = "January"

        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor})
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"billRaised": data[0]*100000, "paymentMade": data[1]*100000}
        else:
            response = {"billRaised": 0, "paymentMade": 0} 
        con.close()
        return jsonify(response),200
    
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done 
@app.route('/loi_date',methods=['GET'])
def loi_date():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        query="""
        SELECT "LoI/Work awarded Date" as loi_date FROM exploration_poc
        WHERE  Unit=:unit AND  Mine Like :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor
        AND current_row=1 
        ORDER BY Unit
        """

        # tester - WHERE Unit="ICC" AND Mine LIKE "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s MPS Engineering, Rajasthan"

        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor})
        # data=cursor.fetchall()
        # response=[{"loi_date":row[0]} for row in data]
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"loi_date": data[0]}
        else:
            response = {"loi_date": "No data"} 
        conn.close()
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/mobilisation_period',methods=['GET'])
def mobilisation_period():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        query="""
        SELECT "Mobilisation Period " as mobilisation_period FROM exploration_poc
        WHERE Unit=:unit AND Mine LIKE:mine ||"%" AND "Drilling Type"=:drillingType AND Contractor=:contractor
        AND current_row=1 
        ORDER BY Unit
        """
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor})
        # data=cursor.fetchall()
        # response=[{"mobilisation_period ":row[0]} for row in data]
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"mobilisation_period": (data[0]).strip()+"s"}
        else:
            response = {"mobilisation_period": "No data"} 
        conn.close()
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/start_date',methods=['GET'])
def start_date():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        query="""
        SELECT "Work Commencement Date" as start_date FROM exploration_poc
        WHERE Unit=:unit AND Mine LIKE:mine ||"%" AND "Drilling Type"=:drillingType AND Contractor=:contractor
        AND current_row=1 
        ORDER BY Unit
        """
         # tester - WHERE Unit="ICC" AND Mine LIKE "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s MPS Engineering, Rajasthan"
 
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor})
        # data=cursor.fetchAll()
        # response=[{"start_date":row[0]}]
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"start_date": data[0]}
        else:
            response = {"start_date": "No data"} 
        conn.close()
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/end_date',methods=['GET'])
def end_date():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        query="""
        SELECT "Target Completion date " as end_date  FROM exploration_poc
        WHERE Unit=:unit AND Mine LIKE:mine ||"%" AND "Drilling Type"=:drillingType AND Contractor=:contractor
        AND current_row=1 
        ORDER BY Unit
        """
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor})
        # data=cursor.fetchAll()
        # response=[{"end_date":row[0]} for row in data]
        data = cursor.fetchone()  # Fetch only one row
        if data:
            response = {"end_date": data[0]}
        else:
            response = {"end_date": "No data"} 
        conn.close()
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/physical_work_done_month',methods=['GET'])
def physical_work_done_month():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        month = request.args.get('month')

        query="""
        SELECT "Physical Work Target in the month" as target, "Physical Work Done in the month" as achieved FROM exploration_poc
        WHERE Unit=:unit AND Mine LIKE :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor AND Month=:month
        AND current_row=1 
        ORDER BY Unit
        """
    #    tester- WHERE Unit="ICC" AND Mine LIKE "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s SKS, Nagpur" AND Month="January"

        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'month':month})
        data = cursor.fetchone() 
        if data:
            response = {"target": data[0]*100000, "achieved": data[1]*100000}
        else:
            response = {"target": 0, "achieved": 0}
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/physical_work_done_fy',methods=['GET'])
def physical_work_done_fy():
    try:
        conn=sqlite3.connect('exploration.db')   
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        financial_year = request.args.get('financial_year')
        starting_year = financial_year.split("-")[0]

        query="""
        SELECT "Physical Work Target upto the month for FY" as target,
        "Physical Work Done upto the month for FY" as achieved FROM exploration_poc
        WHERE Unit=:unit 
        AND Mine Like :mine || "%" 
        AND "Drilling Type"=:drillingType 
        AND Contractor=:contractor
        AND current_row=1 
        AND CAST(
            CASE 
                WHEN CAST(SUBSTR("date", INSTR("date", '/') + 1, LENGTH("date") - INSTR("date", '/') - 4) AS INT) >= 4 THEN CAST(SUBSTR("date", LENGTH("date") - 3) AS INT)
                ELSE CAST(SUBSTR("date", LENGTH("date") - 3) AS INT) - 1
            END
        AS TEXT)=:starting_year
        ORDER BY 
            Unit;
        """
        # year = request.args.get('financial_year')
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor, 'starting_year': starting_year})
        data = cursor.fetchone() 
        if data:
            response = {"target": data[0]*100000, "achieved": data[1]*100000}
        else:
            response = {"target": 0, "achieved": 0}
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

# Done
@app.route('/physical_work_done_inception',methods=['GET'])
def physical_work_done_inception():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        startDate = request.args.get('startDate')
        endDate = request.args.get('endDate')

        query = """
                SELECT 
                SUBSTR("date", LENGTH("date") - 3) as year, 
                SUM("Physical Work Target upto the month from inception") as target, 
                SUM("Physical Work Done up to the month from inception") as achieved 
                FROM exploration_poc
                WHERE Unit=:unit 
                AND Mine LIKE :mine || "%" 
                AND "Drilling Type"=:drillingType
                AND Contractor=:contractor
                AND current_row=1 
                AND DATE(SUBSTR(date, 7, 4) || '-' || SUBSTR(date, 4, 2) || '-' || SUBSTR(date, 1, 2))
                BETWEEN :startDate AND :endDate
                GROUP BY year
                ORDER BY year
        """

        # SELECT Month, 
        # SUBSTR("date", LENGTH("date") - 3) as year, 
        # date,
        # CAST(ROUND(SUM("Physical Work Target upto the month from inception")) as INT) as target, 
        # CAST(ROUND(SUM("Physical Work Done up to the month from inception")) as INT) as achieved 
        # FROM exploration_poc
        # WHERE Unit=:unit 
        # AND Mine LIKE :mine || "%" 
        # AND "Drilling Type"=:drillingType
        # AND Contractor=:contractor
        # AND DATE(SUBSTR(date, 7, 4) || '-' || SUBSTR(date, 4, 2) || '-' || SUBSTR(date, 1, 2))
        # BETWEEN :startYear || '-04-01' AND :endYear || '-03-31'
        # GROUP BY Month
        # ORDER BY DATE(SUBSTR(date, 7, 4) || '-' || SUBSTR(date, 4, 2) || '-' || SUBSTR(date, 1, 2))
        cursor.execute(query, {'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'startDate':startDate, 'endDate': endDate})
        data = cursor.fetchall()

        response = [{"year": row[0], "target": row[1]*100000, "achieved": row[2]*100000} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
      
        return jsonify({"error": str(e)}), 500


    
# Done
@app.route('/drilling_status_month',methods=['GET'])
def drilling_status_month():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        month = request.args.get('month')
        query="""
        SELECT  SUM("Drilling Target for the month") as target , SUM("Achieved Drilling Meterage in the month") as achieved FROM exploration_poc 
        WHERE Unit=:unit AND Mine Like :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor AND Month= :month
        AND current_row=1 
        ORDER BY Unit
        """
        
# tester - WHERE Unit="ICC" AND Mine LIKE "Khetri%" AND "Drilling Type"="Under Ground Drilling" AND Contractor="M/s SKS, Nagpur" AND Month="January"
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor, 'month': month})
        data=cursor.fetchone()
        if data and data[0] and data[1]:
            response = {"target": data[0], "achieved": data[1]}
        else:
            response = {"target": 0, "achieved": 0}
        return jsonify(response),200
    except Exception as e:
        # error_log(e)
        logging.error(str(e))
        return jsonify({"error":str(e)}),500


# Done
@app.route('/drilling_status_fy',methods=['GET'])
def drilling_status_fy():
    try:
        conn=sqlite3.connect('exploration.db')   
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        financial_year = request.args.get('financial_year')
        starting_year = financial_year.split("-")[0]

        query="""
        SELECT "Drilling Target upto the month for FY" as target,
        "Drilling Target upto the month for FY" as achieved FROM  exploration_poc
        WHERE  Unit=:unit AND Mine LIKE :mine || "%" AND "Drilling Type"=:drillingType AND Contractor=:contractor 
        AND current_row=1 
        AND CAST(
                CASE 
                    WHEN CAST(SUBSTR("date", INSTR("date", '/') + 1, LENGTH("date") - INSTR("date", '/') - 4) AS INT) >= 4 THEN CAST(SUBSTR("date", LENGTH("date") - 3) AS INT)
                    ELSE CAST(SUBSTR("date", LENGTH("date") - 3) AS INT) - 1
                END
            AS TEXT)=:starting_year
        ORDER BY Unit
        """
        cursor.execute(query,{'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'starting_year':starting_year})
        data=cursor.fetchone()
        if data and data[0] and data[1]:
            response = {"target": data[0], "achieved": data[1]}
        else:
            response = {"target": 0, "achieved": 0}
        return jsonify(response),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/exploration_manual_etl', methods=['GET'])
def exploration_manual_etl():
    try:
        result = perform_exploration_manual_etl()
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/drilling_status_inception',methods=['GET'])
def drilling_status_inception():
    try:
        conn=sqlite3.connect('exploration.db')
        cursor=conn.cursor()
        unit=request.args.get('unit')
        mine=request.args.get('mine')
        drillingType=request.args.get('drillingType')
        contractor=request.args.get('contractor')
        startDate = request.args.get('startDate')
        endDate = request.args.get('endDate')

        query = """
            SELECT 
            SUBSTR("date", LENGTH("date") - 3) as year, 
            SUM("Drilling Target upto the month from inception") as target, 
            SUM("Achieved Drilling Meterage up to the month from inception") as achieved 
            FROM exploration_poc
            WHERE Unit=:unit 
            AND Mine LIKE :mine || "%" 
            AND "Drilling Type"=:drillingType
            AND Contractor=:contractor
            AND current_row=1 
            AND DATE(SUBSTR(date, 7, 4) || '-' || SUBSTR(date, 4, 2) || '-' || SUBSTR(date, 1, 2))
            BETWEEN :startDate AND :endDate
            GROUP BY year
            ORDER BY year
        """

        cursor.execute(query, {'unit':unit,'mine':mine,'drillingType':drillingType,'contractor':contractor,'startDate':startDate, 'endDate': endDate})
        data = cursor.fetchall()

        response = [{"year": row[0], "target": row[1], "achieved": row[2]} for row in data]
        
        conn.close()

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)