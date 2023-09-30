from torch import torch, hub
import cv2

class ObjectDetection(object):
    
    def __init__(self, model):
        self.model = model
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    def score_frame(self, frame):
        '''
        Takes a single frame as input, and scores the frame using yolo5 model
        :return: Labels and Coordinates of objects detected by model in the frame.
        '''
        self.model.to(self.device)
        frame = [frame]
        results = self.model(frame)
        labels, cord = results.xyxyn[0][:, -1].cpu().numpy(), results.xyxyn[0][:, :-1].cpu().numpy()
        return labels, cord
    
    def class_to_label(self, x):
        '''
        For a given label value, return correspondig string label.
        :param x: numeric label
        :return: corresponding string label
        '''
        return self.classes[int(x)]
    
    def plot_boxes(self, results, frame):
        '''
        Takes a frame and its results as input, and plots the bounding boxes and label on to the frame.
        :param results: contains labels and coordinates predicted by model on the given frame.
        :param frame: Frame which has been scored
        :return: Frame with bounding boxes and labels plotted on it
        '''
        labels, cord = results
        n = len(labels)
        phone_status = 0
        people_count = 0
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.2:
                x1, y1, x2, y2 = int(row[0] * x_shape), int(row[1] * y_shape), int(row[2] * x_shape), int(row[3] * y_shape)
                bgr = (0, 255, 0)
                if self.classes[int(labels[i])] == "person":
                    people_count += 1
                if self.classes[int(labels[i])] == "cell phone":
                    phone_status = 1
                cv2. rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
        
        return frame, phone_status, people_count