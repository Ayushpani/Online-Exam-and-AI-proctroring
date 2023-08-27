import React, { useState } from 'react'                                                                  //1:18:33
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bgimg from './Bgimg'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const history = useNavigate();

    const[inpval,setInpval] = useState({
        
        email:"",
        
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

        const getuserArr = localStorage.getItem("userguy");
        console.log(getuserArr);

        const {email,password} = inpval;

         if(email === ""){
            alert("email field is required")

        }else if (!email.includes("@")){
            alert("please enter valid email address")

        }else if(password === ""){
            alert("password field is required")

        }else if(password.length < 5){
            alert("password length must be greater than 5")

        }else{
            if(getuserArr && getuserArr.length){
                const userdata = JSON.parse(getuserArr);
                const usersignin = userdata.filter((el,k)=>{
                    return el.email === email && el.password === password
                    
                });  
                if(usersignin.length === 0){
                    alert("invalid details")
                }else{
                    console.log("user login successful");
                    history("/Uhome")
                }
            
           }
        }
    }

  return (
    <>
        <div className="container mt-5">
            <section className='d-flex justify-content-between'>
              <div className="left_data mt-5 p-3" style={{width:"100%"}}>
                <h3 className='text-center col-lg-6'> SIGN IN</h3>
               
                <Form>
                

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    
                    <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                   
                    <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                </Form.Group>               
                   <Button variant="primary" className='col-lg-6' onClick={addData} style={{background:"rgb(67,185,127)"}} type="submit">
                    Submit
                  </Button> 
  </Form>  
                <p className='mt-3'>Want to create an account ? <span> SIGN UP </span> </p>
              </div>
                <Bgimg />      
            </section>
        </div>
    </>
  )
}

export default Signin
