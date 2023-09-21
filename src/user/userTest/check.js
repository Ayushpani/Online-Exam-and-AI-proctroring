import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from "react";
import './css/check.css'
import axios from 'axios'
import AWS from 'aws-sdk';

function Check() {

    const location = useLocation();
    const email = location.state.id;
    console.log(email);

    useEffect(() => {
        const loadWebcam = async () => {
            axios.post('http://localhost:8000/test/check')
            .then(res => {
                if (res.data == "executed") {
                    console.log("pyScript execution successful");
                }
                else {
                    alert("There was some error executing the pyScript");
                }
            })
          };
      
          loadWebcam();
    }, []);

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const CaptureImage = async() => {
        window.location.reload();
        const capture = document.getElementById('captured_image');
        console.log(email);
        fetch(`http://localhost:5000/capture_image/${email}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            capture.src = "https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/people_images/" + email + ".jpg";
        })
    }

    const Retake = async() => {
        const capture = document.getElementById('captured_image');
        AWS.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        });
        const s3 = new AWS.S3({
            params: {Bucket: config.bucketName},
            region: config.region,
        });
        const params = {
            Bucket: config.bucketName,
            Key: "people_images/" + email + ".jpg",
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
            }
            else{
                capture.src = '';
                window.location.reload();
            }
        })
    }

    return (
        <div className = "check">
            <img src = 'http://localhost:5000/video_feed' width = "640px" height = "480px" />
            <div className = "buttons">
                <input type = "button" className = "capture" value = "Capture Image" onClick = {CaptureImage} />
                <input type = "button" className = "retake" value = "Retake Image" onClick = {Retake} />
            </div>
            <img id = "captured_image" width = "640px" height = "480px"/>
        </div>
    )
}

export default Check;