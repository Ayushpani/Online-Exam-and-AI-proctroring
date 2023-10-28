import threading

import cv2
from deepface import DeepFace

face_cap = cv2.CascadeClassifier("..\..\proctorenv\Lib\site-packages\cv2\data\haarcascade_frontalface_default.xml")
cap = cv2.VideoCapture( cv2.CAP_DSHOW)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

counter = 0 

face_match = False

reference_img1 = cv2.imread('./krithik.png')
ref = [reference_img1]

def check_face(frame):
    global face_match
    global Name
    try:
        if DeepFace.verify(frame, reference_img1)['verified']:
            face_match = True
            Name=" Harsh"
        else:
            face_match = False
            Name =" lol"
    except ValueError:
        face_match = False

while True:
    ret, frame = cap.read()
        
    if ret:
        
        col = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_cap.detectMultiScale(
            col,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30,30),
            flags= cv2.CASCADE_SCALE_IMAGE
        )
        for (x,y,w,h) in faces:
            cv2.rectangle(frame, (x,y),(x+w,x+h),(255,0,0),3)
        
        if counter % 30 == 0:
            try:
                threading.Thread(target=check_face, args=(frame.copy(),)).start()
                print("checking")
            except ValueError:
                pass
        counter += 1
        
        if face_match:
            cv2.putText(frame, "MATCH"+Name, (20,450), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 3)
            #print("yes")
        else:
            cv2.putText(frame, "NO MATCH", (20,450), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 3)
            #print("no")
            
        cv2.imshow("video", frame)
            
    key = cv2.waitKey(1)
    if key == ord("q"):
        break

cv2.destroyAllWindows()

    