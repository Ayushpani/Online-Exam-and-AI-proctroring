import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import AWS from 'aws-sdk';
import 'reactjs-popup/dist/index.css';
import "./css/addQuestions.css";

function AddQuestions() {
    const history = useNavigate();
    const location = useLocation();
    const test_name = location.state.id;
    const email = location.state.email_id;
    const [data, setData] = useState([]);
    const [author_email, setAuthor] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [contributors, setContributors] = useState([]);
    useEffect(() => {
        if (!location.state.id) {
            history("/Home/existingTest", { state: { id: email } })
            alert("The test was deleted")
        }
        
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

    useEffect(() => {
        axios.post("http://localhost:8000/Home/addQuestions/author", {
            test_name
        })
            .then(res => {
                setAuthor(res.data);
                if (res.data == email) {
                    setDisabled(false);
                }
            })
            .catch(e => {
                alert("There was some error retrieving the email of author");
                console.log(e);
            });
    }, []);

    useEffect(() => {
        axios.post("http://localhost:8000/Home/addQuestions/contributors", {
            test_name
        })
        .then( res => {
            if (res.data == "no test"){
                alert("Test not found")
            }
            else{
                setContributors(res.data);
            }
        })
    })

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
    const [newContributor, setContributor] = useState('');
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
        setImage("https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/" + window.file.name);

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
    async function del(qn) {
        try {
            await axios.post("http://localhost:8000/Home/addQuestions/delete", {
                test_name, qn
            })
                .then(res => {
                    if (res.data == "Record deleted") {
                        alert("The record was deleted succesfully");
                    }
                    else {
                        alert("There was some error in deleting the record");
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }
    async function deleteTest() {
        try {
            await axios.post("http://localhost:8000/Home/addQuestions/deleteTest", {
                test_name
            })
                .then(res => {
                    if (res.data == "Test deleted") {
                        history(location.pathname, { replace: true });
                        history("/Home/existingTest", { state: { id: email } })
                    }
                    else {
                        alert("There was an error deleting the test");
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }
    async function addContributor(){
        try{
            await axios.post("http://localhost:8000/Home/addQuestions/addContributor", {
                test_name, newContributor
            })
            .then(res => {
                if (res.data == "successful") {
                    alert("The contributor was added")
                }
                else if (res.data == "invalid"){
                    alert("email id doesn't exist");
                }
                else{
                    alert("There was some error");
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
                <div>
                    <p>Test author: {author_email}</p>
                    <p>Contributors:
                        { contributors.map(i => {
                            return(
                                <ol type = "a">
                                    <li>{i}</li>
                                </ol>
                            )
                        })}
                    </p>
                </div>
                <Popup className="add_contributor_popup" trigger={
                    <input type="button" disabled={disabled} className="add_contributor" value="&#43; Add another contributor to this test" />} modal nested>
                        <form>
                            <div className = "field">
                                <label className = "contri_label">Enter the email id of the contributor:</label>
                                <input className = "contri_input" type = "text" onChange = {(e) => setContributor(e.target.value)} placeholder = "Enter the email id"/>
                            </div>
                            <div className = "add_contri">
                                <br/>
                                <input className = "contri_btn" type = "button" value = "submit" onClick = {addContributor}/>
                            </div>
                        </form>
                </Popup>
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
                                <td><div id="question"><img id="question_image" src={i.question} /></div></td>
                                <td><div id="correct_option">{i.option}</div></td>
                                <td><button onClick={() => del(i.qno)}>yes</button></td>
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
            <div>
                <input type="button" className="delete_test_btn" onClick={(e) => deleteTest()} value="Delete test" />
            </div>
        </div>
    )
}

export default AddQuestions;