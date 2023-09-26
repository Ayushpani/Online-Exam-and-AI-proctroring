import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(''));
    const [answered, setAnswered] = useState(0);
    const [MFRed, setMFRed] = useState(0);
    const [ansMFRed, setAnsMFRed] = useState(0);
    const [notAnsed, setNotAnsed] = useState(0);
    const [visited, setVisited] = useState(0);
    const [tabImage, setTabImage] = useState([]);
    const [reload, setReload] = useState(0);

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET
    }

    const user_image = "https://" + config.bucketName + ".s3." + config.region + ".amazonaws.com/people_images/" + email + ".jpg";

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

        return() => {
            window.removeEventListener('beforeunload', handleReload);
        };
    }, []);

    const handleTabClick = (index) => {
        const changeImage = document.getElementById(activeQn);
        if (changeImage.src == MFR || changeImage.src == ansMFR || changeImage.src == ans) {

        }
        else if (typeof selectedOptions[activeQn] === 'undefined') {
            const updatedNotAnsed = notAnsed + 1;
            setNotAnsed(updatedNotAnsed);
            const updatedVisited = visited + 1;
            setVisited(updatedVisited);
            
            {/* Code to update the array of tab images */}
            const updatedTabImage = [...tabImage];
            updatedTabImage[activeQn] = notAns;
            setTabImage(updatedTabImage);
            changeImage.src = notAns;
        }
        else {
            const updatedAnswered = answered + 1;
            setAnswered(updatedAnswered);
            const updatedVisited = visited + 1;
            setVisited(updatedVisited);

            {/* Code to update the array of tab images */}
            const updatedTabImage = [...tabImage];
            updatedTabImage[activeQn] = ans;
            setTabImage(updatedTabImage);
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
        if (typeof selectedOptions[activeQn] === 'undefined') {
            alert("Please select an option first")
            return false;
        }
        const changeImage = document.getElementById(activeQn);
        var ifVisited = 0;
        if (changeImage.src == ans) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        if (changeImage.src == MFR){
            const updatedMFRed = MFRed - 1;
            setMFRed(updatedMFRed);
            ifVisited = 1;
        }
        if (changeImage.src == ansMFR) {
            const updatedAnsMFRed = ansMFRed - 1;
            setAnsMFRed(updatedAnsMFRed);
            ifVisited = 1;
        }
        if (changeImage.src == notAns) {
            const updatedNotAnsed = notAnsed - 1;
            setNotAnsed(updatedNotAnsed);
            ifVisited = 1;
        }

        {/* Code to update the array of tab images */}
        const updatedTabImage = [...tabImage];
        updatedTabImage[activeQn] = ans;
        setTabImage(updatedTabImage);
        changeImage.src = ans;

        const updatedAnswered = answered + 1;
        setAnswered(updatedAnswered);
        if (!ifVisited){
            const updatedVisited = visited + 1;
            setVisited(updatedVisited);
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
        var ifVisited = 0;
        if (changeImage.src == MFR) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        if (changeImage.src == ans){
            const updatedAnswered = answered - 1;
            setAnswered(updatedAnswered);
            ifVisited = 1;
        }
        if (changeImage.src == ansMFR) {
            const updatedAnsMFRed = ansMFRed - 1;
            setAnsMFRed(updatedAnsMFRed);
            ifVisited = 1;
        }
        if (changeImage.src == notAns) {
            const updatedNotAnsed = notAnsed - 1;
            setNotAnsed(updatedNotAnsed);
            ifVisited = 1;
        }

        {/* Code to update the array of tab images */}
        const updatedTabImage = [...tabImage];
        updatedTabImage[activeQn] = MFR;
        setTabImage(updatedTabImage);
        changeImage.src = MFR;

        const updatedMFRed = MFRed + 1;
        setMFRed(updatedMFRed);
        if (!ifVisited) {
            const updatedVisited = visited + 1;
            setVisited(updatedVisited);
        }
        const updatedActiveQn = activeQn + 1;
        if ((updatedActiveQn + 1) > questions.length) {
            alert("No more questions please submit");
            return false;
        }
        setActiveQn(updatedActiveQn);
    }

    const handleSaveAndMFR = () => {
        if (typeof selectedOptions[activeQn] === 'undefined') {
            alert("Please select an option first")
            return false;
        }
        const changeImage = document.getElementById(activeQn);
        var ifVisited = 0;
        if (changeImage.src == ansMFR) {
            const updatedActiveQn = activeQn + 1;
            if ((updatedActiveQn + 1) > questions.length) {
                alert("No more questions please submit");
                return false;
            }
            setActiveQn(updatedActiveQn);
            return;
        }
        if (changeImage.src == MFR){
            const updatedMFRed = MFRed - 1;
            setMFRed(updatedMFRed);
            ifVisited = 1;
        }
        if (changeImage.src == ans){
            const updatedAnswered = answered - 1;
            setAnswered(updatedAnswered);
            ifVisited = 1;
        }
        if (changeImage.src == notAns) {
            const updatedNotAnsed = notAnsed - 1;
            setNotAnsed(updatedNotAnsed);
            ifVisited = 1;
        }

        {/* Code to update the array of tab images */}
        const updatedTabImage = [...tabImage];
        updatedTabImage[activeQn] = ansMFR;
        setTabImage(updatedTabImage);
        changeImage.src = ansMFR;

        const updatedAnsMFRed = ansMFRed + 1;
        setAnsMFRed(updatedAnsMFRed);
        if (!ifVisited) {
            const updatedVisited = visited + 1;
            setVisited(updatedVisited);
        }
        const updatedActiveQn = activeQn + 1;
        if ((updatedActiveQn + 1) > questions.length) {
            alert("No more questions please submit");
            return false;
        }
        setActiveQn(updatedActiveQn);
    }

    const handleClear = () => {
        if (typeof selectedOptions[activeQn] === 'undefined') {
            alert("Please select an option first")
            return false;
        }
        const changeImage = document.getElementById(activeQn)
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[activeQn] = '';
        setSelectedOptions(updatedSelectedOptions);

        {/* Code to update the array of tab images */}
        const updatedTabImage = [...tabImage];
        updatedTabImage[activeQn] = notAns;
        setTabImage(updatedTabImage);
        changeImage.src = notAns;
    };

    const handleSubmit = () => {
        setShowTest(false);
        setShowSummary(true);
    };

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
                <div className = "summary_div">
                    <h2 className = "summary_header">Exam Summary</h2>
                    <br/>
                    <table border = "1" cellSpacing = "0">
                        <tr>
                            <th className = "summary_table_header noq" >No. of Questions</th>
                            <th className = "summary_table_header ans" >Answered</th>
                            <th className = "summary_table_header notAns" >Not Answered</th>
                            <th className = "summary_table_header MFR" >Marked for Review</th>
                            <th className = "summary_table_header ansMFR" >Answered and Marked for Review<br/>
                            (will be considered for evaluation)</th>
                            <th className = "summary_table_header notVis" >Not Visited</th>
                        </tr>
                        <tr>
                            <td>{questions.length}</td>
                            <td>{answered}</td>
                            <td>{notAnsed}</td>
                            <td>{MFRed}</td>
                            <td>{ansMFRed}</td>
                            <td>{questions.length - visited}</td>
                        </tr>
                    </table>
                    <br/>
                    <div className = "return_back_to_test_div">
                        <p className = "question_for_next_step">Are you sure you want to submit for final marking?<br/>
                        No changes will be allowed after submission.</p>
                        <br/>
                        <div className = "next_step_buttons">
                            <button className = "next_button yes" >Yes</button>&nbsp;&nbsp;
                            <button className = "next_button no" onClick = {handleNo}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Test;