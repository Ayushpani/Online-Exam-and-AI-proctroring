import cv2
import tkinter as tk
from tkinter import ttk
from torch import hub, torch

class First:
    def __init__(self, window, window_title):
        self.window = window
        self.window.title(window_title)
        
        # Open the camera for video capture
        self.video_capture = cv2.VideoCapture(0)
        
        if not self.video_capture.isOpened():
            print("Error: Could not open the camera.")
            exit()
        
        # Create a label to display the video feed
        self.video_label = ttk.Label(self.window)
        self.video_label.pack()
        
        # Create a button to capture an image
        capture_button = ttk.Button(self.window, text="Capture Image", command=self.capture_image)
        capture_button.pack()
        
        self.model = self.load_model()
        self.classes = self.model.names
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        
        # Start the video feed update
        self.update_video_feed()
        
        self.window.protocol("WM_DELETE_WINDOW", self.on_closing)
    
    def load_model(self):
        '''
        Loads Yolo5 model from pytorch hub
        :return: Trained Pytorch model
        '''
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained = True)
        return model
    
    def on_closing(self):
        # Release the camera when the GUI is closed
        self.video_capture.release()
        self.window.destroy()
    
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
        x_shape, y_shape = frame.shape[1], frame.shape[0]
        for i in range(n):
            row = cord[i]
            if row[4] >= 0.2:
                x1, y1, x2, y2 = int(row[0] * x_shape), int(row[1] * y_shape), int(row[2] * x_shape), int(row[3] * y_shape)
                bgr = (0, 255, 0)
                cv2. rectangle(frame, (x1, y1), (x2, y2), bgr, 2)
                cv2.putText(frame, self.class_to_label(labels[i]), (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 0.9, bgr, 2)
        
        return frame

    # Create a function to capture and save the image
    def capture_image(self):
        # Capture a single frame from the video feed
        ret, frame = self.video_capture.read()

        if not ret:
            return

        # Specify the file path to save the captured image
        image_path = "captured_image.jpg"

        # Save the captured frame as an image
        cv2.imwrite(image_path, frame)

    # Create a function to update the video feed
    def update_video_feed(self):
        # Read a frame from the video capture
        ret, frame = self.video_capture.read()

        if ret:
            
            results = self.score_frame(frame)
            frame = self.plot_boxes(results, frame)
            
            # Convert the frame to RGB format for displaying in Tkinter
            #frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # Create a PhotoImage object from the frame
            photo = tk.PhotoImage(data=cv2.imencode('.ppm', frame)[1].tobytes())

            # Update the label with the new frame
            self.video_label.config(image=photo)
            self.video_label.image = photo

            # Schedule the next update after a delay (in milliseconds)
            self.video_label.after(10, self.update_video_feed)

if __name__ == "__main__":
    root = tk.Tk()
    app = First(root, "Image capture app")
    # Start the GUI event loop
    root.mainloop()
