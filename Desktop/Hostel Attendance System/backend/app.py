from flask import Flask, request, jsonify, session
from flask_session import Session
import cv2
import numpy as np
import base64
import math
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'your_secret_key'
Session(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:8080"}})

client = MongoClient("mongodb://localhost:27017/")
db = client["hostel-attendance-system"]
users_collection = db["users"]

face_recognizer = cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read("face_trained.yml")
people = ['krishnas.bt.24@nitj.ac.in', 'rathodr.it.24@nitj.ac.in', 'shashi']
haar_cascade = cv2.CascadeClassifier('haar_face.xml')

TARGET_LAT = 31.39809
TARGET_LON = 75.53226
RADIUS = 500000

def haversine(lat1, lon1, lat2, lon2):
    to_rad = lambda x: x * math.pi / 180
    R = 6371000
    d_lat = to_rad(lat2 - lat1)
    d_lon = to_rad(lon2 - lon1)
    a = (math.sin(d_lat / 2) ** 2 +
         math.cos(to_rad(lat1)) * math.cos(to_rad(lat2)) * math.sin(d_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@app.route('/api/verify-location', methods=['POST'])
def verify_location():
    print(session)
    print(session.sid)
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if not latitude or not longitude:
        return jsonify({"message": "Invalid location data"}), 400

    distance = haversine(latitude, longitude, TARGET_LAT, TARGET_LON)
    is_verified = distance <= RADIUS
    print("verifying location")
    print(RADIUS)
    print(distance)
    return jsonify({"isVerified": is_verified, "distance": distance}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(username, password)

    user = users_collection.find_one({"username": username, "password": password})

    if not user:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    session['username'] = username
    print(session)
    print(session.sid)
    print("debugging1")
    return jsonify({"success": True, "message": "Login successful"}), 200

@app.route('/verify-face', methods=['POST'])
def verify_face():
    print(session)
    print(session.sid)
    if 'username' not in session:
        print("new_debugging")
        return jsonify({"success": False, "message": "User not logged in"}), 401

    logged_in_email = session['username']
    print(logged_in_email)
    data = request.json
    image_data = data.get("image")

    if not image_data:
        return jsonify({"success": False, "message": "Image is required"}), 400

    img_data = base64.b64decode(image_data.split(",")[1])
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    print("debugging2")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces_rect = haar_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4)

    for (x, y, w, h) in faces_rect:
        face_roi = gray[y:y+h, x:x+w]
        label, confidence = face_recognizer.predict(face_roi)

        print(people[label])
        recognized_email = people[label]

        if recognized_email == logged_in_email:
            print("success")
            return jsonify({"success": True, "message": "Face verification successful"}), 200
        else:
            return jsonify({"success": False, "message": "Face does not match the logged-in email"}), 400

    return jsonify({"success": False, "message": "No face detected"}), 400

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('email', None)
    return jsonify({"success": True, "message": "Logged out successfully"}), 200

@app.route('/session-details', methods=['GET'])
def session_details():
    return jsonify({"session": session.get('username', "No active session")}), 200

@app.route('/status', methods=['GET'])
def status():
    print("Server is running")
    return jsonify({"status": "Server is active"}), 200

@app.route('/keep-alive', methods=['GET'])
def keep_alive():
    print("Session keep-alive ping")
    return jsonify({"message": "Session is alive"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=6565)
