import cv2
import requests
import json
from object_detection.ObjectDetection import ObjectDetection
from torch import torch, hub

class Proctoring():
    
    def __init__(self):
        self.detected_objects = {
            "phone_status": 0,
            "people_count": 0
        }
        self.camera = cv2.VideoCapture(0)
        self.model = self.load_model()
        self.objDetect = ObjectDetection(self.model)
        self.api_url = 'http://localhost:8000/test/proctor'
        self.video_feed()
    
    def load_model(self):
        '''
        Loads Yolo5 model from pytorch hub
        :return: Trained Pytorch model
        '''
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained = True)
        return model
    
    def send_response(self, key, value):
        self.detected_objects[key] = value
        response = requests.post(self.api_url, json = self.detected_objects)
        if response.status_code == 200:
            print("Mobile phone status sent")
        else:
            print("Error sending data")
    
    def video_feed(self):
        phone_status = 0
        people_count = 0
        while True:
            ret, frame = self.camera.read()
            results = self.objDetect.score_frame(frame)
            frame, phone_status, people_count = self.objDetect.plot_boxes(results, frame)
            
            # cv2.imshow('window', frame)
            
            if phone_status == 1:
                break
            
            if people_count == 0:
                break
            
            if people_count > 1:
                break
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                self.camera.release()
                cv2.destroyAllWindows()
                break
        
        if phone_status == 1:
            self.send_response("phone_status", 1)
        
        if people_count == 0:
            self.send_response("people_count", 0)
        
        if people_count > 1:
            self.send_response("people_count", 2)
        
        self.video_feed()

if __name__ == "__main__":
    proc = Proctoring()