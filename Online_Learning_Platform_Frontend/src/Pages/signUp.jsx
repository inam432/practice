import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
function SignUp() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let [name,setNAME]=useState("")
const [showOTP, setShowOTP] = useState(false);
const [otp, setOtp] = useState("");
    let [email,setEMAIL]=useState("")
    let [password,setPASSWORD]=useState("")
    let [role,setRole]=useState("")
    let [phonenumber,setPHONENUMBER]=useState("")
    const [googleSignup, setGoogleSignup] = useState(false);
  const [googleCredential, setGoogleCredential] = useState("");
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleSignup
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        text: "signup_with"
      }
    );
  }, [googleSignup]);
  const handleGoogleSignup = (response) => {
    const credential = response.credential;
alert("Please enter your phone number and role and then click on sign up button to complete the signup process");
    setGoogleCredential(credential);
    setGoogleSignup(true);
  };
    async function validateSignUp(e){
      try{    
        if (googleSignup) {
          e.preventDefault();
          if (!(/^[0-9]{11}$/.test(phonenumber))) {
            e.preventDefault();
            alert("Phone number must be 11 digits");
          }else{
          let response = await axios.post(
            "https://practice-kqep.onrender.com/api/signUpGoogle",
            {
              credential: googleCredential,
              phonenumber,
              role
            }
          );
          if(response.data.message==='Google signup successful'){
            alert("Successful signup")
            document.getElementById("phoneNumber").value="";
            document.getElementById("role").value="";
          }
        }}else{
        if(!(/^[A-Za-z\s]{2,}$/.test(name))){
          e.preventDefault();
          alert("Your name should have more than one characters");
    }     
       if(!(emailRegex.test(email))){
          e.preventDefault();
          alert("Your email must include “@” and end with a valid domain like .com or .net (e.g., name@332.com)");
        }   
        if (!(/^[0-9]{11}$/.test(phonenumber))) {
          e.preventDefault();
          alert("Phone number must be 11 digits");
        }    
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))) {
          e.preventDefault();
          alert("Password should be 7 characters long with one uppercase letter,one lowercase letter and one special symbol");
        }if((/^[A-Za-z\s]{2,}$/.test(name))&&(emailRegex.test(email))&&(/^[0-9]{11}$/.test(phonenumber))&&
        (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/.test(password))){
          e.preventDefault();
          const response = await axios.post(
            "https://practice-kqep.onrender.com/api/signUp",
            {name, email,phonenumber,password,role}
        );
        if(response.data.message==='token send to your email for verification'){
          document.getElementById("name").value="";
          document.getElementById("email").value="";
          document.getElementById("phoneNumber").value="";
          document.getElementById("password").value="";
          document.getElementById("role").value="";
          setShowOTP(true);
        }}}}catch(error){if(error.response.data.message==='Error sending email'){
alert("OTP cannot be send to your email for successful sign up. Please check your email address and try again.");
        }else{
         alert("User with this email already exists. Please enter a different email"); 
        }}}
        function signUpFieldsEmpty(){
          document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("phoneNumber").value="";
      document.getElementById("password").value="";
      document.getElementById("role").value="";
        }
       async function verifyOTP(){
        try{ 
        if(otp.length===6){
      const response=await axios.post("https://practice-kqep.onrender.com/api/verifyOTP", {
        email,
        otp
    }
);if(response.data.message==='Email verified successfully.'){
  alert("Sign up successful");
}}
else{
  alert("Please enter a valid 6-digit OTP");
}}catch(error){alert("Invalid OTP or OTP expired.");}}
    return (<div className="container"><h1>Online Learning Platform</h1>
            {showOTP?
    <><h5>Enter 6-digit opt sent to your email for successful sign up</h5><br/>
        <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
        />
<br/><br/>
        <button  className="btn btn-secondary" onClick={verifyOTP}>
            Verify Email
        </button>
    </>
:<><div className="card" style={{margin:'2% 25%',background:'pink'}}>

                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:'35px'}}>
                        Sign Up
                    </h5>
                    <form onSubmit={validateSignUp}>{!googleSignup?<><label>Name: &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" id="name" className="form-control" onChange={(e) => setNAME(e.target.value)} required/>
  <br/><label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="email" className="form-control" onChange={(e) => setEMAIL(e.target.value)} required/>
  <br/>
  <label>Password: &nbsp;</label>
  <input type="password" id="password" className="form-control" onChange={(e) => setPASSWORD(e.target.value)} required/>
  <br/></>:null}<label>Phone Number: &nbsp;</label>
  <input type="tel" id="phoneNumber" className="form-control" onChange={(e) => setPHONENUMBER(e.target.value)} required/><br/><label>Role: &nbsp;</label>
  <select id="role" className="form-select" onChange={(e) => setRole(e.target.value)} required>
  <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select><br/><div style={{ display: "flex", gap: "20px",justifyContent: "center"}}>
                          <button className="btn btn-light">Sign Up
  </button><Link onClick={()=>{signUpFieldsEmpty();}} className="btn btn-light" to="/">Sign In</Link></div>
  </form><p style={{color:'white',fontSize:'25px'}}>OR</p>{!googleSignup?<div id="googleButton"></div>:
  <button onClick={()=>{setGoogleSignup(false)}}>Back to normal signup</button>}
                </div>

            </div></>}
        </div>
    );
}

export default SignUp;