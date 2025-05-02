import numpy as np
import cv2 as cv 

haar_cascade = cv.CascadeClassifier('haar_face.xml')

people = ['kendrick_lamar', 'taylor_swift', 'christane_bale']
face_recognizer = cv.face.LBPHFaceRecognizer_create()
face_recognizer.read('face_trained.yml')

img = cv.imread('faces/taylor_swift/download-1.jpg')

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow('person', gray)

faces_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)

for (x,y,w,h) in faces_rect:
    faces_region_of_interest = gray[y:y+h, x:x+w]

    label, confidence = face_recognizer.predict(faces_region_of_interest)
    print(f"label = {people[label]} with a confidence of {confidence}")

    cv.putText(img, str(people[label]), (20,20), cv.FONT_HERSHEY_COMPLEX, 0.5, (0,255,0), thickness=2)
    cv.rectangle(img, (x,y), (x+w, y+h), (0,255,0), thickness=2)

cv.imshow("Detected face", img)
     
cv.waitKey(0)