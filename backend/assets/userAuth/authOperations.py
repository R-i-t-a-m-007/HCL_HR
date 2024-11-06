from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Function to create a connection to the SQLite database
def create_connection():
    conn = sqlite3.connect('userdata.db')
    return conn

# Function to create a table to store user data if it doesn't exist already
def create_table(conn):
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                      id INTEGER PRIMARY KEY,
                      name TEXT NOT NULL,
                      email TEXT NOT NULL)''')
    conn.commit()

# Route for the form to input user data
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission and insert data into the database
@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    
    conn = create_connection()
    create_table(conn)
    
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (name, email) VALUES (?, ?)', (name, email))
    conn.commit()
    conn.close()
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)