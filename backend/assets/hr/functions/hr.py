import csv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, func
from sqlalchemy.orm import declarative_base, sessionmaker
from hr_main import clean_and_archive
import threading
import signal
import sys

app = Flask(__name__)

cors = CORS(app)

Base = declarative_base()

script_dir = os.path.dirname(os.path.abspath(__file__))


class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True)
    unit = Column(String)
    emp_code = Column(String)
    sex = Column(String)
    full_name = Column(String)
    date_of_birth = Column(String)
    date_of_appointment = Column(String)
    grade = Column(Integer)
    designation = Column(String)
    blood_group = Column(String)
    department = Column(String)
    cadre = Column(String)
    employee_category = Column(String)
    seniority_position = Column(String)
    employee_type = Column(String)
    category = Column(String)
    minority_status = Column(String)
    religion = Column(String)
    handicap = Column(String)
    in_time = Column(String)
    out_time = Column(String)


def create_database(file_path):
    engine = create_engine("sqlite:///employees.db")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    session.query(Employee).delete()
    session.commit()

    with open(file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for row in csv_reader:
            employee = Employee(
                unit=row[0],
                emp_code=row[1],
                sex=row[2],
                full_name=row[3],
                date_of_birth=row[4],
                date_of_appointment=row[5],
                grade=row[6],
                designation=row[7],
                blood_group=row[8],
                department=row[9],
                cadre=row[10],
                employee_category=row[11],
                seniority_position=row[12],
                employee_type=row[13],
                category=row[14],
                minority_status=row[15],
                religion=row[16],
                handicap=row[17],
                in_time=row[18],
                out_time=row[19],
            )
            session.add(employee)
        session.commit()
    return session


# def get_session():
#     engine = create_engine('sqlite:///employees.db')
#     Base.metadata.create_all(engine)
#     Session = sessionmaker(bind=engine)
#     session = Session()
#     return session


@app.route("/employee_counts")
def employee_counts():

    executives = (
        session.query(Employee).filter(Employee.employee_type == "Executive").count()
    )

    technical = (
        session.query(Employee).filter(Employee.employee_type == "Technical").count()
    )

    nontechnical = (
        session.query(Employee)
        .filter(Employee.employee_type == "Non-Technical")
        .count()
    )

    data = {
        "executives": executives,
        "technical": technical,
        "non-technical": nontechnical,
    }

    return jsonify(data)


@app.route("/sex_counts")
def sex_counts():

    male_executive = (
        session.query(Employee)
        .filter(Employee.employee_type == "Executive", Employee.sex == "Male ")
        .count()
    )
    female_executive = (
        session.query(Employee)
        .filter(Employee.employee_type == "Executive", Employee.sex == "Female")
        .count()
    )
    male_non_executive = (
        session.query(Employee)
        .filter(
            Employee.employee_type.in_(["Technical", "Non-Technical"]),
            Employee.sex == "Male ",
        )
        .count()
    )
    female_non_executive = (
        session.query(Employee)
        .filter(
            Employee.employee_type.in_(["Technical", "Non-Technical"]),
            Employee.sex == "Female",
        )
        .count()
    )

    data = {
        "Male_Executive": male_executive,
        "Female_Executive": female_executive,
        "Male_NonExecutive": male_non_executive,
        "Female_NonExecutive": female_non_executive,
    }

    return jsonify(data)


@app.route("/handicapped_counts")
def handicapped_counts():

    handicapped = session.query(Employee).filter(Employee.handicap == "Yes").count()

    non_handicapped = session.query(Employee).filter(Employee.handicap == "No").count()

    data = {"handicapped": handicapped, "non_handicapped": non_handicapped}

    return jsonify(data)


@app.route("/category_counts")
def category_counts():

    general = session.query(Employee).filter(Employee.category == "General").count()

    sc = session.query(Employee).filter(Employee.category == "SC").count()

    st = session.query(Employee).filter(Employee.category == "ST").count()

    obc = session.query(Employee).filter(Employee.category == "OBC").count()

    data = {"general": general, "sc": sc, "st": st, "obc": obc}

    return jsonify(data)


@app.route("/position_counts")
def position_counts():

    junior = (
        session.query(Employee).filter(Employee.seniority_position == "Junior").count()
    )

    senior = (
        session.query(Employee).filter(Employee.seniority_position == "Senior").count()
    )

    intermediate = (
        session.query(Employee)
        .filter(Employee.seniority_position == "Intermediate")
        .count()
    )

    trainee = (
        session.query(Employee).filter(Employee.seniority_position == "Trainee").count()
    )

    data = {
        "junior": junior,
        "senior": senior,
        "intermediate": intermediate,
        "trainee": trainee,
    }

    return jsonify(data)


@app.route('/bloodgroup_counts')
def bloodgroup_counts():

  A_POS = session.query(Employee).filter(Employee.blood_group == 'A+').count()
  B_POS = session.query(Employee).filter(Employee.blood_group == 'B+').count()
  AB_POS = session.query(Employee).filter(Employee.blood_group == 'AB+').count()
  O_POS = session.query(Employee).filter(Employee.blood_group == 'O+').count()
  A_NEG = session.query(Employee).filter(Employee.blood_group == 'A-').count()
  B_NEG = session.query(Employee).filter(Employee.blood_group == 'B-').count()
  AB_NEG = session.query(Employee).filter(Employee.blood_group == 'AB-').count()
  O_NEG = session.query(Employee).filter(Employee.blood_group == 'O-').count()


  data = {
    'A+': A_POS,
    'B+': B_POS,
    'AB+': AB_POS,
    'O+': O_POS,
    'A-': A_NEG,
    'B-': B_NEG,
    'AB-': AB_NEG,
    'O-': O_NEG
  }

  return jsonify(data)


@app.route("/designation_counts")
def designation_counts():

    mining_eng = (
        session.query(Employee)
        .filter(Employee.designation == "Mining Engineer")
        .count()
    )

    mining_res = (
        session.query(Employee)
        .filter(Employee.designation == "Mining Researcher")
        .count()
    )

    drilling_eng = (
        session.query(Employee)
        .filter(Employee.designation == "Drilling Engineer")
        .count()
    )

    db_admin = (
        session.query(Employee).filter(Employee.designation == "DB Admin").count()
    )

    it_analyst = (
        session.query(Employee).filter(Employee.designation == "IT Analyst").count()
    )

    data = {
        "Mining Engineer": mining_eng,
        "Mining Researcher": mining_res,
        "Drilling Engineer": drilling_eng,
        "DB Admin": db_admin,
        "IT Analyst": it_analyst,
    }

    return jsonify(data)


# @app.route("/birth_month_counts")
# def birth_month_counts():
#     df = pd.read_csv(file_path)

#     df["birth_month"] = pd.to_datetime(df["Date of Birth"]).dt.month

#     month_counts = df["birth_month"].value_counts().sort_index().to_dict()

#     month_names = [
#         "January",
#         "February",
#         "March",
#         "April",
#         "May",
#         "June",
#         "July",
#         "August",
#         "September",
#         "October",
#         "November",
#         "December",
#     ]

#     result = {month_names[i - 1]: month_counts.get(i, 0) for i in range(1, 13)}

#     return jsonify(result)


# @app.route('/shift_counts')
# def shift_counts():
#     df = pd.read_csv(file_path)

#     shift_counts = df['Shift Start'].value_counts().to_dict()

#     result = [{'shift': shift, 'count': count} for shift, count in shift_counts.items()]

#     return jsonify(result)


@app.route("/department_counts")
def department_counts():
    unit = request.args.get("unit")

    if not unit:
        return jsonify({"error": "Unit parameter is required"}), 400

    department_types = ["Mines", "IT", "HR", "Sales", "Operation", "M&C", "Finance"]
    department_counts = {department_type: 0 for department_type in department_types}

    if unit == "Cadre":
        for department_type in department_types:
            count = (
                session.query(Employee)
                .filter(
                    Employee.cadre == "Yes",
                    Employee.department == department_type
                )
                .count()
            )
            department_counts[department_type] = count
    else:
        for department_type in department_types:
            count = (
                session.query(Employee)
                .filter(
                    Employee.unit == unit,
                    Employee.department == department_type,
                    Employee.cadre == "No"
                )
                .count()
            )
            department_counts[department_type] = count

    return jsonify(department_counts)




@app.route("/cadre_counts")
def cadre_counts():
    
    department_types = ["Mines", "IT", "HR", "Sales", "Operation", "M&C", "Finance"]

    department_counts = {department_type: 0 for department_type in department_types}

    for department_type in department_types:
        cadre_count = (
            session.query(Employee)
            .filter(Employee.department == department_type, Employee.cadre == "Yes")
            .count()
        )

        department_counts[department_type] = cadre_count

    return jsonify(department_counts)


# @app.route("/bloodgroup_counts")
# def bloodgroup_counts():

#     unit = request.args.get("unit")

#     if not unit:
#         return jsonify({"error": "Unit parameter is required"}), 400

#     blood_groups_query = (
#         session.query(Employee.blood_group).filter(Employee.unit == unit).distinct()
#     )
#     blood_groups = [bg[0] for bg in blood_groups_query.all()]

#     blood_group_counts = {blood_group: 0 for blood_group in blood_groups}

#     for blood_group in blood_groups:
#         count = (
#             session.query(Employee)
#             .filter(Employee.unit == unit, Employee.blood_group == blood_group)
#             .count()
#         )
#         blood_group_counts[blood_group] = count

#     return jsonify(blood_group_counts)


@app.route("/gender_counts_by_employee_type")
def gender_counts_by_employee_type():
    employee_type = request.args.get("Employee Type")

    if not employee_type:
        return jsonify({"error": "Employee type parameter is required"}), 400

    # Normalize the employee_type input
    employee_type_normalized = employee_type.strip().capitalize()

    valid_employee_types = ["Executive", "Technical", "Non-technical"]
    if employee_type_normalized not in valid_employee_types:
        return jsonify({"error": "Invalid employee type parameter"}), 400

    males_count = (
        session.query(func.count())
        .filter(
            func.lower(Employee.employee_type) == employee_type_normalized.lower(),
            func.lower(Employee.sex) == "male ",
        )
        .scalar()
    )
    females_count = (
        session.query(func.count())
        .filter(
            func.lower(Employee.employee_type) == employee_type_normalized.lower(),
            func.lower(Employee.sex) == "female",
        )
        .scalar()
    )

    data = {"male": males_count, "female": females_count}

    return jsonify(data)


@app.route("/employee_category_counts")
def employee_category_counts():
    employee_type = request.args.get("employee_type")

    if not employee_type:
        return jsonify({"error": "Employee type parameter is required"}), 400

    employee_categories_query = (
        session.query(Employee.employee_category)
        .filter(Employee.employee_type == employee_type)
        .distinct()
    )
    employee_categories = [category[0] for category in employee_categories_query.all()]

    employee_category_counts = {
        category: {"male": 0, "female": 0} for category in employee_categories
    }

    for category in employee_categories:

        male_count = (
            session.query(func.count())
            .filter(
                Employee.employee_type == employee_type,
                Employee.employee_category == category,
                Employee.sex == "Male ",
            )
            .scalar()
        )
        employee_category_counts[category]["male"] = male_count

        female_count = (
            session.query(func.count())
            .filter(
                Employee.employee_type == employee_type,
                Employee.employee_category == category,
                Employee.sex == "Female",
            )
            .scalar()
        )
        employee_category_counts[category]["female"] = female_count

    return jsonify(employee_category_counts)


def start_flask():
    app.run(host="localhost", port=5002)


def start_clean_and_archive():
    output_csv_folder = "../output_csv"
    xlsx_folder = "../assets/xlsx/attendance_xlsx"
    archive_csv_folder = "../historical_data"

    files = os.listdir(output_csv_folder)
    full_paths = [os.path.join(output_csv_folder, file) for file in files]
    creation_times = [os.path.getctime(path) for path in full_paths]
    index = creation_times.index(max(creation_times))
    latest_file = full_paths[index]

    global session
    session = create_database(latest_file)
    clean_and_archive(xlsx_folder, output_csv_folder, archive_csv_folder)


def signal_handler(sig, frame):
    if clean_and_archive_thread.is_alive():
        clean_and_archive_thread.join()
    sys.exit(0)


if __name__ == "__main__":
    clean_and_archive_thread = threading.Thread(target=start_clean_and_archive)
    clean_and_archive_thread.daemon = True
    clean_and_archive_thread.start()

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    start_flask()
