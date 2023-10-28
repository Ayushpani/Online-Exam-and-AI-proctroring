import cv2
import requests
from flask import Flask, request, jsonify
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
        self.resume = 1
        self.model = self.load_model()
        self.objDetect = ObjectDetection(self.model)
        self.api_url = 'http://localhost:8000/test/proctor'
        self.response_url = 'http://localhost:8000/resume/pythonResponse'
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
            print(key, value)
        else:
            print("Error sending data")
    
    def get_response(self):
        response = requests.post(self.response_url)
        response_data = response.json()
        
        if response.status_code == 200:
            self.resume = response_data.get('resume')
        else:
            print(response.status_code)
    
    def video_feed(self):
        phone_status = 0
        people_count = 0
        while True:
            print(self.resume)
            if self.resume == 0:
                self.get_response()
                continue
            ret, frame = self.camera.read()
            results = self.objDetect.score_frame(frame)
            frame, phone_status, people_count = self.objDetect.plot_boxes(results, frame)
            
            # cv2.imshow('window', frame)
            
            if phone_status == 1:
                self.resume = 0
                self.send_response("phone_status", 1)

            if people_count == 0:
                self.resume = 0
                self.send_response("people_count", 0)
            
            if people_count > 1:
                self.resume = 0
                self.send_response("people_count", 2)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                self.camera.release()
                cv2.destroyAllWindows()
                break
        

if __name__ == "__main__":
    proc = Proctoring()