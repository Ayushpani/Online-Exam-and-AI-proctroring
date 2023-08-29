import React, { useState } from 'react'                                                    
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bgimg from './Bgimg'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';




const Home = () => {
    
    const[inpval,setInpval] = useState({
        name:"",
        email:"",
        date:"",
        password:""
    })

    const [data,setData] = useState([]);
    console.log(inpval);
  
    const getdata = (e)=>{
       // console.log(e.target.value); 

       const {value,name} = e.target;
       // console.log(value,name);

       setInpval(()=>{
            return {
                ...inpval,
                [name]:value
            }

       })
       
}

    const addData = (e)=>{
        e.preventDefault();

        const {name,email,date,password} = inpval;

        if(name === ""){
            alert("name field is required")

        }else if(email === ""){
            alert("email field is required")

        }else if (!email.includes("@")){
            alert("please enter valid email address")

        }else if(date === ""){
            alert("date field is required")

        }else if(password === ""){
            alert("password field is required")

        }else if(password.length < 5){
            alert("password length must be greater than 5")

        }else{
            console.log("data added succesfully");  

            localStorage.setItem("userguy",JSON.stringify([...data,inpval]));
        }
    }


  return (
    <>
        <div className="container mt-5">
            <section className='d-flex justify-content-between'>
              <div className="left_data mt-5 p-3" style={{width:"100%"}}>
                <h3 className='text-center col-lg-6'> SIGN UP</h3>
               
                <Form>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    
                    <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    
                    <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    
                    <Form.Control name='date' onChange={getdata} type="date"  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                   
                    <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                </Form.Group>               
                   <Button variant="primary" className='col-lg-6' onClick={addData} style={{background:"rgb(67,185,127)"}} type="submit">
                    Submit
                  </Button> 
                </Form>
                <p className='mt-3'>Already have an account ? <span><NavLink to="/Signin"> SIGN IN </NavLink> </span> </p>
              </div>
                <Bgimg />       
            </section>
        </div>
    </>
  )
}

export default Home
