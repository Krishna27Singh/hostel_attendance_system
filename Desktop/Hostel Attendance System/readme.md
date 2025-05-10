# Online Hostel Attendance System

## Overview
The *Online Hostel Attendance System* is an innovative project aimed at automating hostel attendance tracking. By combining advanced technologies such as React, Flask, OpenCV, and MongoDB, this system offers a secure, efficient, and scalable solution to manage hostel attendance records. 

## Features
### 1. Student Portal
- **Authentication**: Students log in using their official Gmail and password verified against MongoDB.
- **Location Verification**: Ensures students are within the hostel premises using the Haversine formula.
- **Facial Recognition**: Confirms identity using OpenCV and Haar Cascade-based facial detection.

### 2. Warden Portal *(Upcoming)*
- Features for managing hostel-wide attendance and analytics.

### 3. Attendant Portal *(Upcoming)*
- Tools for attendants to monitor attendance in real-time.

## Tech Stack
### **Frontend**
- **React.js**: For creating a responsive, user-friendly interface.
- **Tailwind CSS**: Ensures clean and customizable UI styling.

### **Backend**
- **Flask**: Powers the backend API and application logic.

### **Database**
- **MongoDB**: Provides flexible and secure data storage for user and attendance records.

### **AI Integration**
- **OpenCV**: Facilitates real-time facial recognition.
- **NumPy**: Supports mathematical computations.

## Libraries Used
- `flask`: API and backend framework.
- `cv2`: Image processing and facial recognition.
- `numpy`: Mathematical operations and optimizations.
- `base64`: Encoding image data for secure transmission.
- `math`: Calculations for the Haversine formula.
- `pymongo`: Database operations with MongoDB.
- `flask-cors`: Enabling cross-origin requests for seamless frontend-backend communication.

## How It Works
### **1. Authentication**
- Students log in with their Gmail credentials.
- Passwords and email IDs are securely validated using MongoDB.

### **2. Location Verification**
- The system uses GPS coordinates and the Haversine formula to verify whether the student is within the hostel radius.

### **3. Facial Recognition**
- Captured images are processed using OpenCV and Haar Cascade classifiers.
- The system verifies the student’s face against pre-stored data.

## Project Status
- **Completed**: Student portal with Gmail authentication, location verification, and facial recognition.
- **In Progress**: Development of warden and attendant portals.

## Challenges and Solutions
- **Camera Access**: Handled browser-level camera permissions with fallback alerts.
- **GPS Accuracy**: Implemented a tolerance radius to account for minor discrepancies.
- **Facial Recognition**: Enhanced image preprocessing to improve accuracy in various lighting conditions.

## Future Enhancements
- Developing dashboards for warden and attendant roles.
- Upgrading facial recognition with deep learning models.
- Adding real-time notifications and advanced analytics for better hostel management.

## How to Run the Project
1. Clone the repository.
2. Set up MongoDB and configure the connection in the Flask backend.
3. Install dependencies using `npm install` (for React) and `pip install -r requirements.txt` (for Flask backend).
4. Start the backend server: `python app.py`.
5. Start the React frontend: `npm start`.
