import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import AWS from 'aws-sdk';
import 'reactjs-popup/dist/index.css';
import "./css/addQuestions.css";

function AddQuestions() {
    const location = useLocation();
    const test_name = location.state.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8000/Home/addQuestions/questions', {
            test_name
        })
            .then(res => {
                setData(res.data);
            })
            .catch(e => {
                alert("Data couldn't be fetched");
            });
    }, []);
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }
    const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const uploadTos3 = e => {
        window.file = e.target.files[0];
        if (!validFileTypes.find(type => type === window.file.type)) {
            console.log(e);
            alert('File must be in jpg/jpeg/png format');
        }
    };
    const [qno, setQno] = useState('');
    const [question, setImage] = useState('');
    const [option, setOption] = useState('');
    async function upload(e) {
        AWS.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        });
        const s3 = new AWS.S3({
            params: { Bucket: config.bucketName },
            region: config.region,
        });
        const params = {
            Bucket: config.bucketName,
            Key: window.file.name,
            Body: window.file,
        };
        const params_retrieve = {
            Bucket: config.bucketName,
            Key: window.file.name,
        }
        var upload = s3
            .putObject(params)
            .on("httpUploadProgress", (e) => {
                console.log(
                    "Uploading " + parseInt((e.loaded * 100) / e.total) + "%"
                );
            })
            .promise();

        await upload.then((err, data) => {
            console.log(err);
            alert("File uploaded successfully.");
        });
        setImage("https://" + config.bucketName +".s3." + config.region + ".amazonaws.com/" + window.file.name);
        
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/Home/addQuestions", {
                test_name, qno, question, option
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    async function del(qn, question){
        AWS.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        });
        const s3 = new AWS.S3({
            params: {Bucket: config.bucketName},
            region: config.region,
        });
        const key = question.split('/').pop();
        console.log(key)
        const params = {
            Bucket: config.bucketName,
            Key: key,
        }
        try{
            await s3.deleteObject(params).promise();
            console.log("Object deleted successfully");
        }
        catch(e){
            console.log(e);
        }
        try{
            await axios.post("http://localhost:8000/Home/addQuestions/delete", {
                test_name, qn
            })
            .then(res => {
                if(res.data == "Record deleted"){
                    alert("The record was deleted succesfully");
                }
                else{
                    alert("There was some error in deleting the record");
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <div className="addQuestions">
            <div className="title">
                <h1>Add questions to {test_name}</h1>
            </div>
            <div className="existing_questions">
                <table width="100%" border="1" cellspacing="0">
                    <tr>
                        <th>Qn. no.</th>
                        <th>Question</th>
                        <th>Correct option</th>
                        <th>Delete Question</th>
                    </tr>
                    {data.map(i => {
                        return (
                            <tr>
                                <td><div id="qno">{i.qno}</div></td>
                                <td><div id="question"><img id = "question_image" src = {i.question}/></div></td>
                                <td><div id="correct_option">{i.option}</div></td>
                                <td><button onClick = {() => del(i.qno, i.question)}>yes</button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <Popup className="popup" trigger=
                {<div className="add">
                    &#43; Add New Questions
                </div>}
                modal nested>
                <form name="question_details">
                    <div className="question_no">
                        <div className="label">
                            <label>Question no.:</label>
                        </div>
                        <div className="textbox">
                            <input name="question_no" onChange={(e) => { setQno(e.target.value) }} type="number" required />
                        </div>
                    </div>
                    <div className="image">
                        <div className="label">
                            <label>Question image:</label>
                        </div>
                        <div className="textbox">
                            <input name="image" onChange={uploadTos3} type="file" required />
                        </div>
                    </div>
                    <div className="option">
                        <div className="label">
                            <label>Correct Option:</label>
                        </div>
                        <div className="radiobox">
                            a<input name="a" value="a" onClick={(e) => { setOption(e.target.value) }} className="radio" type="radio" />
                            b<input name="b" value="b" onClick={(e) => { setOption(e.target.value) }} className="radio" type="radio" />
                            c<input name="c" value="b" onClick={(e) => { setOption(e.target.value) }} className="radio" type="radio" />
                            d<input name="d" value="d" onClick={(e) => { setOption(e.target.value) }} className="radio" type="radio" />
                        </div>
                    </div>
                    <div className="submit_div">
                        <input className="sub_btn" type="button" value="Submit" onClick={upload} />
                    </div>
                </form>
            </Popup>
        </div>
    )
}

export default AddQuestions;