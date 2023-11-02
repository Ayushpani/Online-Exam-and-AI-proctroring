import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/result.css'

function Result() {
    const history = useNavigate();
    const location = useLocation();
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [no_of_questions, setQuestions] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [attempted, setAttempted] = useState(0);
    const email = location.state.id;
    const test_name = location.state.test_name;
    const answers = location.state.answers;

    useEffect(() => {
        axios.post("http://localhost:8000/test/optionsData", {
            test_name
        })
            .then(res => {
                if (res.data) {
                    setCorrectAnswers(res.data);
                    setQuestions(res.data.length);
                    console.log(res.data);
                    values(res.data);
                }
                else {
                    alert("data not fetched");
                }
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    const Print_btn = () => {
        window.print();
    }

    const values = (correct) => {
        let temp_attempted = attempted;
        let temp_incorrect = incorrect;
        answers.forEach((item, index) => {
            if (item != undefined || item != '') {
                temp_attempted += 1
                console.log(temp_attempted);
                console.log(item, correct[index]);
                if (item != correct[index]) {
                    temp_incorrect += 1;
                }
                console.log(temp_incorrect);
            }
        });
        setAttempted(temp_attempted);
        setIncorrect(temp_incorrect);
    };

    const handleReturn = () => {
        history("/test", { state: { id: email }});
    }

    return (
        <div className="mainbody">
            <button id="printButton" onClick = {Print_btn}>Print Page</button>
            <div class="table_summary" >
                <table border="5" cellspacing="0" align="center" width="50% " height="250" class="table1">
                    <tr>
                        <th colspan="4">SCORE CARD</th>
                    </tr>

                    <tr>
                        <td>Total Questions &#10173;</td>
                        <td width = "60px">{no_of_questions}</td>
                        <td>Total Attempted &#10173;</td>
                        <td>{attempted}</td>
                    </tr>
                    <tr>

                        <td>Correct answers &nbsp;&nbsp;&nbsp; &#9989;</td>

                        <td>{attempted - incorrect}</td>

                        <td>Incorrect answers  &nbsp;&nbsp;&nbsp; &#10060;</td>

                        <td>{incorrect}</td>
                    </tr>


                    <tr>
                        <td>score</td>
                        <td>{attempted - incorrect}</td>
                    </tr>
                </table>
            </div>
            <br />
            <br />
            <div class="data">
                <table border="5" cellspacing="0" align="center" width="50%" height="" class="table2">
                    <tr>
                        <th>Question No.</th>
                        <th>selected option</th>
                        <th>correct option</th>
                    </tr>

                    {answers.map((i, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{i}</td>
                                <td>{correctAnswers[index]}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <br/>
            <br/>
            <div className = "return_to_attempt_div">
                <button className = "return_to_attempt" onClick = {handleReturn}>Return to home page</button>
            </div>
        </div>
    )
}

export default Result;