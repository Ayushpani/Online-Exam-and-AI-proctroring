from flask import Flask, Response, jsonify
from flask_cors import CORS
from decouple import config
import cv2
import io
import boto3
import botocore
import sys
import signal
import os

app = Flask(__name__)
CORS(app)
camera = cv2.VideoCapture(0)  # 0 for the default camera

def handle_sigint(signum, frame):
    print("Received SIGINT. Cleaning up and exiting...")
    
    # Release the camera and any resources
    camera.release()
    cv2.destroyAllWindows()
    
    os.kill(os.getpid(), signal.SIGINT)
    os.kill(os.getpid(), signal.SIGTERM)
    # Exit the application
    sys.exit(0)

# Register the signal handler for SIGINT
signal.signal(signal.SIGINT, handle_sigint)
signal.signal(signal.SIGTERM, handle_sigint)

AWS_ACCESS_KEY_ID = config('REACT_APP_ACCESS')
AWS_SECRET_ACCESS_KEY = config('REACT_APP_SECRET')
AWS_REGION = config('REACT_APP_REGION')
bucket_name = config('REACT_APP_BUCKET_NAME')

def generate_frames():

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            if ret:
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/capture_image/<email>')
def capture_image(email):
    pEmail = email
    ret, frame = camera.read()
    if ret:
        # Save the captured frame as an image
        _, buffer = cv2.imencode('.jpg', frame)
        image_bytes = buffer.tobytes()
        s3 = boto3.client('s3',aws_access_key_id=AWS_ACCESS_KEY_ID,
                        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                        region_name=AWS_REGION)
        object_key = f"people_images/{pEmail}.jpg"
        try:
            # Upload the image to S3
            s3.upload_fileobj(io.BytesIO(image_bytes), bucket_name, object_key)
            print(f"Image uploaded to S3 bucket: s3://{bucket_name}/{object_key}")
        except botocore.exceptions.NoCredentialsError:
            print("AWS credentials not found.")
        except Exception as e:
            print(f"Error uploading image to S3: {e}")
        return jsonify({'message': 'captured'})
    else:
        return jsonify({'message': 'failed'})

if __name__ == '__main__':
    app.run(debug=False)
