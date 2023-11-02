import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import notVis from './imagesProj/notVis.png'
import notAns from './imagesProj/notAns.png'
import ans from './imagesProj/ans.png'
import MFR from './imagesProj/MFR.png'
import ansMFR from './imagesProj/ansMFR.png'
import './css/Test.css';

function Test() {

    const [showTest, setShowTest] = useState(true);
    const [showSummary, setShowSummary] = useState(false);
    const location = useLocation();
    const email = location.state.id;
    const test_name = location.state.test_name;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(10 * 60);
    const [questions, setQuestions] = useState([]);
    const [activeQn, setActiveQn] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [notAnsed, setNotAnsed] = useState([]);
    const [MFRed, setMFRed] = useState([]);
    const [ansMFRed, setAnsMFRed] = useState([]);
    const [visited, setVisited] = useState([]);
    const [tabImage, setTabImage] = useState([]);
    const [reload, setReload] = useState(0);
    const [proctorAlert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [no_of_alerts, setNo_of_alerts] = useState(0);

    const history = useNavigate();

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const user_image = "https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/people_images/" + email + ".jpg" + `?${new Date().getTime()}`;

    document.addEventListener('visibilitychange',
        function () {
            if (document.visibilityState === 'visible') {
                document.title = "Active Tab";
            }
            else {
                document.title = "inactive tab";
            }
            if (document.title === "inactive tab") {
                closeWindow();

            }
            function closeWindow() {
                setTimeout(() => {
                    Kill();
                    history("/test", { state: { id: email }});
                }, 60000);
            }
        });

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (totalSeconds > 0) {
                const remainingSeconds = totalSeconds - 1;
                const updatedMinutes = Math.floor(remainingSeconds / 60);
                const updatedSeconds = remainingSeconds % 60;
                setMinutes(updatedMinutes);
                setSeconds(updatedSeconds);
                setTotalSeconds(remainingSeconds);
            }
            else {
                clearInterval(countdownInterval);
                Kill();
                history("/test/result", { state: { id: email, test_name: test_name, answers: selectedOptions } });
            }
        }, 1000)

        return () => {
            clearInterval(countdownInterval);
        };
    }, [seconds]);

    useEffect(() => {
        axios.post("http://localhost:8000/test/fetchQuestions", {
            test_name
        })
            .then(res => {
                if (res.data == "no question") {
                    alert("There are no questions in this test");
                }
                else {
                    setQuestions(res.data);
                    setSelectedOptions(Array(res.data.length).fill(''));
                    setAnswered(Array(res.data.length).fill(0));
                    setNotAnsed(Array(res.data.length).fill(0));
                    setAnsMFRed(Array(res.data.length).fill(0));
                    setMFRed(Array(res.data.length).fill(0));
                    setVisited(Array(res.data.length).fill(0));
                    setTabImage(Array(res.data.length).fill(notVis));
                }
            })
            .catch(e => {
                console.log(e);
            });
    }, [reload]);

    useEffect(() => {

        const handleReload = (e) => {
            e.preventDefault();
            setReload(1);
            e.returnValue = 0;
            const valueOfReload = reload;
            e.returnValue = valueOfReload;
        };

        window.addEventListener('beforeunload', handleReload);

        return () => {
            window.removeEventListener('beforeunload', handleReload);
        };
    }, []);

    useEffect(() => {
        try {
            axios.post("http://localhost:8000/test/proctoring")
                .then(res => {
                    if (res.data == "error") {
                        alert("There was some error executing the proctoring script");
                    }
                    else {
                        console.log("headless.py executed successfully");
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        if (no_of_alerts == 3) {
            Kill();
            history("/test", { state: { id: email } });
            return;
        }
        const proctor = setInterval(() => {
            console.log("Hi there");
            axios.post("http://localhost:8000/test/proctor_data")
                .then(res => {
                    if (res.data != null) {
                        if (res.data["phone_status"] == 1) {
                            let updateAlert = no_of_alerts;
                            setNo_of_alerts(updateAlert + 1);
                            if ((updateAlert + 1) == 3) {
                                Kill();
                                history("/test", { state: { id: email } });
                                return;
                            }
                            setShowTest(false);
                            setAlert(true);
                            setMessage('Malicious activity detected');
                        }
                        if (res.data["people_count"] == 0) {
                            let updateAlert = no_of_alerts;
                            setNo_of_alerts(updateAlert + 1);
                            if ((updateAlert + 1) == 3) {
                                Kill();
                                history("/test", { state: { id: email } });
                                return;
                            }
                            setShowTest(false);
                            setAlert(true);
                            setMessage('Malicious activity detected');
                        }
                        if (res.data["people_count"] == 2) {
                            let updateAlert = no_of_alerts;
                            setNo_of_alerts(updateAlert + 1);
                            if ((updateAlert + 1) == 3) {
                                Kill();
                                history("/test", { state: { id: email } });
                                return;
                            }
                            setShowTest(false);
                            setAlert(true);
                            setMessage('Malicious activity detected');
                        }
                        else {
                            console.log(res.data);
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }, 1000)
    });

    const Kill = () => {
        axios.post("http://localhost:8000/test/kill")
            .then(res => {
                return;
            })
            .catch(e => {
                console.log(e);
            })
    }

    const updateAnswered = (index, value) => {
        const updatedAnswered = [...answered];
        updatedAnswered[index] = value;
        setAnswered(updatedAnswered);
    };

    const updateNotAnsed = (index, value) => {
        const updatedNotAnsed = [...notAnsed];
        updatedNotAnsed[index] = value;
        setNotAnsed(updatedNotAnsed);
    }

    const updateMFR = (index, value) => {
        const updatedMFRed = [...MFRed];
        updatedMFRed[index] = value;
        setMFRed(updatedMFRed);
    };

    const updateAnsMFR = (index, value) => {
        const updatedAnsMFRed = [...ansMFRed];
        updatedAnsMFRed[index] = value;
        setAnsMFRed(updatedAnsMFRed);
    };

    const updateVisited = (index, value) => {
        const updatedVisited = [...visited];
        updatedVisited[index] = value;
        setVisited(updatedVisited);
    };

    const updateTabImage = (index, image) => {
        const updatedTabImage = [...tabImage];
        updatedTabImage[index] = image;
        setTabImage(updatedTabImage);
    };

    const handleAlert = async () => {
        setAlert(false);
        setShowTest(true);
        const resume = 1;
        try {
            await axios.post("http://localhost:8000/resume/response", {
                resume
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleTabClick = (index) => {
        const changeImage = document.getElementById(activeQn);
        if (MFRed[activeQn] == 1 || ansMFRed[activeQn] == 1 || answered[activeQn] == 1) {

        }
        else if (selectedOptions[activeQn] === '') {
            {/* Updating the visited array */ }
            updateVisited(activeQn, 1);

            {/* Updating the not answered array */ }
            updateNotAnsed(activeQn, 1);

            {/* Code to update the array of tab images */ }
            updateTabImage(activeQn, notAns)
            changeImage.src = notAns;
        }
        else {
            {/* Updating the answered array */ }
            updateAnswered(activeQn, 1)

            {/* Updating the visited  array */ }
            updateVisited(activeQn, 1)

            {/* Updating the array of tab images */ }
            updateTabImage(activeQn, ans)
            changeImage.src = ans;
        }
        setActiveQn(index);
    };

    const handleOptionChange = (qnIndex, option) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[qnIndex] = option;
        setSelectedOptions(updatedSelectedOptions);
        console.log(selectedOptions);
    }

    const handleSave = () => {
        if (selectedOptions[activeQn] === '') {
            alert("Please select an option first")
            return false;
        }

        const changeImage = document.getElementById(activeQn);

        if (answered[activeQn] == 1) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        else if (MFRed[activeQn] == 1) {
            updateMFR(activeQn, 0);
        }
        else if (ansMFRed[activeQn] == 1) {
            updateAnsMFR(activeQn, 0);
        }
        else if (notAnsed[activeQn] == 1) {
            updateNotAnsed(activeQn, 0);
        }

        updateAnswered(activeQn, 1);

        {/* Code to update the array of tab images */ }
        updateTabImage(activeQn, ans)
        changeImage.src = ans;

        if (visited[activeQn] == 0) {
            updateVisited(activeQn, 1);
        }
        const updatedActiveQn = activeQn + 1;
        if ((updatedActiveQn + 1) > questions.length) {
            alert("No more questions please submit");
            return false;
        }
        setActiveQn(updatedActiveQn);
    }

    const handleMFR = () => {
        const changeImage = document.getElementById(activeQn);

        if (answered[activeQn] == 1) {
            updateAnswered(activeQn, 0);
        }
        else if (MFRed[activeQn] == 1) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        else if (ansMFRed[activeQn] == 1) {
            updateAnsMFR(activeQn, 0);
        }
        else if (notAnsed[activeQn] == 1) {
            updateNotAnsed(activeQn, 0);
        }

        updateMFR(activeQn, 1);

        {/* Code to update the array of tab images */ }
        updateTabImage(activeQn, MFR)
        changeImage.src = MFR;

        if (visited[activeQn] == 0) {
            updateVisited(activeQn, 1);
        }
        const updatedActiveQn = activeQn + 1;
        if ((updatedActiveQn + 1) > questions.length) {
            alert("No more questions please submit");
            return false;
        }
        setActiveQn(updatedActiveQn);
    }

    const handleSaveAndMFR = () => {
        if (selectedOptions[activeQn] === '') {
            alert("Please select an option first")
            return false;
        }

        const changeImage = document.getElementById(activeQn);

        if (answered[activeQn] == 1) {
            updateAnswered(activeQn, 0);
        }
        else if (MFRed[activeQn] == 1) {
            updateMFR(activeQn, 0);
        }
        else if (ansMFRed[activeQn] == 1) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        else if (notAnsed[activeQn] == 1) {
            updateNotAnsed(activeQn, 0);
        }

        updateAnsMFR(activeQn, 1);

        {/* Code to update the array of tab images */ }
        updateTabImage(activeQn, ansMFR)
        changeImage.src = ansMFR;

        if (visited[activeQn] == 0) {
            updateVisited(activeQn, 1);
        }
        const updatedActiveQn = activeQn + 1;
        if ((updatedActiveQn + 1) > questions.length) {
            alert("No more questions please submit");
            return false;
        }
        setActiveQn(updatedActiveQn);
    }

    const handleClear = () => {
        if (selectedOptions[activeQn] === '') {
            alert("Please select an option first")
            return false;
        }
        const changeImage = document.getElementById(activeQn);

        if (ansMFRed[activeQn] == 1) {
            updateAnsMFR(activeQn, 0);
        }
        if (MFRed[activeQn] == 1) {
            updateMFR(activeQn, 0);
        }
        if (answered[activeQn] == 1) {
            updateAnswered(activeQn, 0);
        }

        updateNotAnsed(activeQn, 1);

        {/* Updating the options array */ }
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[activeQn] = '';
        setSelectedOptions(updatedSelectedOptions);

        {/* Code to update the array of tab images */ }
        updateTabImage(activeQn, notAns);
        changeImage.src = notAns;
    };

    const handleSubmit = () => {
        setShowTest(false);
        setShowSummary(true);
    };

    const handleYes = () => {
        axios.post("http://localhost:8000/test/kill")
            .then(res => {
                history("/test/result", { state: { id: email, test_name: test_name, answers: selectedOptions } });
            })
            .catch(e => {
                console.log(e);
            })
    }

    const handleNo = () => {
        setShowSummary(false);
        setShowTest(true);
    }

    return (
        <div className="test_page">
            <div className="header">
                <div className="user_image_div">
                    <img src={user_image} width="120px" height="100px" />
                </div>
                <div className="candidate_details_div">
                    <table className="details_table" cellSpacing="0">
                        <tr className='row'>
                            <td className='cell'>Candidate email&nbsp;</td>
                            <td className='cell'>:&nbsp;</td>
                            <td className='cell'>{email}</td>
                        </tr>
                        <tr className='row'>
                            <td className='cell'>Exam Name&nbsp;</td>
                            <td className='cell'>:&nbsp;</td>
                            <td className='cell'>{test_name}</td>
                        </tr>
                        <tr className='row'>
                            <td className='cell'>Remaining Time&nbsp;</td>
                            <td className='cell'>:&nbsp;</td>
                            <td className='cell'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <br />
            {proctorAlert && (
                <div className="alert">
                    <p className="alert_message">{message}</p>
                    <button className="alert_button" onClick={handleAlert}>OK</button>
                </div>
            )}
            {showTest && (
                <div className="body">
                    <div className="question_div">
                        {questions.length > 0 && (
                            <div className="question_container_div">
                                <div className="question_header_div">
                                    Question {questions[activeQn].qno}
                                    <hr />
                                </div>
                                <div className="question_image_div">
                                    <img src={questions[activeQn].question} width="600px" height="300px" />
                                </div>
                                <div className="question_option_div">
                                    <table className="question_option_table" cellSpacing="0">
                                        <tr className="question_option_row">
                                            <td className="option"><input checked={selectedOptions[activeQn] === 'a'}
                                                onClick={() => handleOptionChange(activeQn, 'a')} type="radio" />a</td>
                                            <td className="option"><input checked={selectedOptions[activeQn] === 'b'}
                                                onClick={() => handleOptionChange(activeQn, 'b')} type="radio" />b</td>
                                            <td className="option"><input checked={selectedOptions[activeQn] === 'c'}
                                                onClick={() => handleOptionChange(activeQn, 'c')} type="radio" />c</td>
                                            <td className="option"><input checked={selectedOptions[activeQn] === 'd'}
                                                onClick={() => handleOptionChange(activeQn, 'd')} type="radio" />d</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="question_buttons_div">
                                    <button className="question_buttons save" onClick={handleSave} >Save and Next</button>&nbsp;&nbsp;
                                    <button className="question_buttons mfr" onClick={handleMFR} >Mark for Review</button>&nbsp;&nbsp;
                                    <button className="question_buttons save_and_mfr" onClick={handleSaveAndMFR} >Save and Mark for Review</button>&nbsp;&nbsp;
                                    <button className="question_buttons clear" onClick={handleClear} >Clear</button>
                                </div>
                                <div className="submit_button_div">
                                    <button className="submit_button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='question_panel_div'>
                        <div className="question_panel_instruction_div">
                            <table className="question_panel_instruction_table" cellSpacing="0">
                                <tr>
                                    <td className="qp_ins_logo_cell"><img src={notVis} /></td>
                                    <td className="qp_ins_cell">Not visited</td>
                                    <td className="qp_ins_logo_cell"><img src={notAns} /></td>
                                    <td className="qp_ins_cell">Not Answered</td>
                                </tr>
                                <tr>
                                    <td className="qp_ins_logo_cell"><img src={ans} /></td>
                                    <td className="qp_ins_cell">Answered</td>
                                    <td className="qp_ins_logo_cell"><img src={MFR} /></td>
                                    <td className="qp_ins_cell">Marked for Review</td>
                                </tr>
                                <tr>
                                    <td className="qp_ins_logo_cell"><img src={ansMFR} /></td>
                                    <td className="qp_ins_cell" colspan="3">Answered and Marked for Review<br />
                                        (Will be considered for evaluation)</td>
                                </tr>
                            </table>
                        </div>
                        <br />
                        <br />
                        {questions.length > 0 && (
                            <div className="question_panel_tabs_div">
                                {questions.map((i, index) => {
                                    return (
                                        <div className="question_panel_tab"
                                            key={index}
                                            onClick={() => handleTabClick(index)}>
                                            <a><img id={index} src={tabImage[index]} />{i.qno}</a>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showSummary && (
                <div className="summary_div">
                    <h2 className="summary_header">Exam Summary</h2>
                    <br />
                    <table border="1" cellSpacing="0">
                        <tr>
                            <th className="summary_table_header noq" >No. of Questions</th>
                            <th className="summary_table_header ans" >Answered</th>
                            <th className="summary_table_header notAns" >Not Answered</th>
                            <th className="summary_table_header MFR" >Marked for Review</th>
                            <th className="summary_table_header ansMFR" >Answered and Marked for Review<br />
                                (will be considered for evaluation)</th>
                            <th className="summary_table_header notVis" >Not Visited</th>
                        </tr>
                        <tr>
                            <td>{questions.length}</td>
                            <td>{answered.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                            <td>{notAnsed.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                            <td>{MFRed.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                            <td>{ansMFRed.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                            <td>{questions.length - visited.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                        </tr>
                    </table>
                    <br />
                    <div className="return_back_to_test_div">
                        <p className="question_for_next_step">Are you sure you want to submit for final marking?<br />
                            No changes will be allowed after submission.</p>
                        <br />
                        <div className="next_step_buttons">
                            <button className="next_button yes" onClick={handleYes} >Yes</button>&nbsp;&nbsp;
                            <button className="next_button no" onClick={handleNo}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Test;