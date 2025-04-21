import os
import psycopg2 
import psycopg2.extras 
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect
app = Flask(__name__)
from datetime import datetime 

hostname = "localhost"
database = "todo"
username = "postgres"
pwd = "Krisha@727"
port_id = 5432
cur = None
conn = None

def get_db_connection():
    return psycopg2.connect(
        host=hostname,
        dbname=database,
        user=username,
        password=pwd,
        port=port_id,
        cursor_factory=psycopg2.extras.DictCursor,
    )

try:
    conn = psycopg2.connect(
        host = hostname,
        dbname = database,
        user = username,
        password = pwd,
        port = port_id
    )

    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor) 

    cur.execute("DROP TABLE IF EXISTS todos")

    create_script = '''CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,              -- Serial number as the unique identifier
    title VARCHAR(255) NOT NULL,        -- Todo title (up to 255 characters)
    content TEXT,                       -- Todo content (no character limit)
    last_modified TIMESTAMP DEFAULT NOW() -- Timestamp for when the todo was created or last updated
    )'''
    cur.execute(create_script)

    cur.execute('SELECT * FROM todos')
    allTodos = cur.fetchall()
    print(allTodos)
    for record in allTodos:
        print(record["title"], record["content"])

    conn.commit()

except Exception as error:
    print(error)
finally:
    if cur is not None:
        cur.close()
    if conn is not None:
        conn.close()

count = 1
@app.route('/', methods=['GET', 'POST'])
def home():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        if request.method == "POST":
            global count
            id = count
            count = count+1
            title = request.form['title']
            content = request.form['content']
            current_time = datetime.now()
            insert_script = 'INSERT INTO todos (id, title, content, last_modified) VALUES (%s, %s, %s, %s)'
            cur.execute(insert_script, (id, title, content, current_time))
            conn.commit()

        cur.execute('SELECT * FROM todos')
        allTodos = cur.fetchall()
        print(allTodos)

    except Exception as error:
        print("Error in home route:", error)
        allTodos = []
    finally:
        cur.close()
        conn.close()
    return render_template('index.html', allTodos=allTodos)

@app.route('/delete/<int:id>')
def delete(id):
    id = id
    try:
        conn = get_db_connection()
        cur = conn.cursor()


        delete_script = "DELETE FROM todos WHERE id = %s"
        delete_record = (id,)
        cur.execute(delete_script,delete_record)
        conn.commit()

    except Exception as error:
        print("Error in home route:", error)
        allTodos = []
    finally:
        cur.close()
        conn.close()
    return redirect('/')

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    id = id
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        todo_script = "SELECT * FROM todos WHERE id = %s"
        todo_record = (id,)
        cur.execute(todo_script,todo_record)
        todo = cur.fetchone()

        if request.method == 'POST':
            updated_title = request.form['title']
            updated_content = request.form['content']
            current_time = datetime.now()
            update_script = '''
                UPDATE todos
                SET title = %s, content = %s, last_modified = %s
                WHERE id = %s
            '''
            cur.execute(update_script, (updated_title, updated_content, current_time, id))
            conn.commit()
            return redirect('/')

    except Exception as error:
        print("Error in home route:", error)
        allTodos = []
    
    finally:
        cur.close()
        conn.close()

    return render_template('update.html', todo = todo)
if __name__ == '__main__':
    app.run(debug=True, port=8000)

