import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function SignIn() {
  const navigate = useNavigate();
   let [email2,setEMAIL2]=useState("")
    let [password2,setPASSWORD2]=useState("")
    async function handleGoogleSignIn(response) { 
try { const result = await axios.post( "https://online-learning-platform-19fq.onrender.com/api/signInGoogle",
       { credential: response.credential } );
       if(result.data.message==='Google sign in successful'){
        localStorage.setItem("token",JSON.stringify(result.data.token));
    localStorage.setItem("user",JSON.stringify({name:result.data.user.name,email:result.data.user.email,
    role:result.data.user.role}));
        alert('Successful Login')
        document.getElementById("email2").value="";
        document.getElementById("password2").value="";
        navigate("/dashboard");
      }}catch(error){
if(error.response.data.message==='Account with this email does not exist. Please sign up first.'){
          alert("Account with this email does not exist. Please sign up first.");
        }
        else{
        alert("Login not successful.");
      }}
          }    
    useEffect(() => { if (window.google) { 
      window.google.accounts.id.initialize({ client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
         callback: handleGoogleSignIn });
          window.google.accounts.id.renderButton( document.getElementById("googleButton"),
           { theme: "outline", size: "large", text: "signin_with" } ); } }, []);
    async function validateSignin(event){
      try{
        event.preventDefault()
        const response = await axios.post(
          "http://localhost:8000/api/signIn",
          {
            email2,
            password2
          }
      );
  if(response.data.message==='Login Successful'){
    localStorage.setItem("token",JSON.stringify(response.data.token));
localStorage.setItem("user",JSON.stringify({name:response.data.user.name,email:response.data.user.email,
role:response.data.user.role}));
    alert('Successful Login')
    document.getElementById("email2").value="";
    document.getElementById("password2").value="";
    navigate("/dashboard");
  }}catch(error){
    alert("Login not successful. Please check your email and password and try again.");
  }
      }    
      function signInFieldsEmpty(){
    document.getElementById("email2").value="";
    document.getElementById("password2").value="";
      }
    return (<div className="container"><h1>Online Learning Platform</h1>
            <div className="card" style={{margin:'2% 25%',background:'pink'}}>

                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:'35px'}}>
                        Sign In
                    </h5>
                    <form onSubmit={validateSignin}><label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="email2" className="form-control" onChange={(e) => setEMAIL2(e.target.value)} required/>
  <br/>
  <label>Password: &nbsp;</label>
  <input type="password" id="password2" className="form-control" onChange={(e) => setPASSWORD2(e.target.value)} required/>
  <br/><div style={{ display: "flex", gap: "20px",justifyContent: "center"}}><button className="btn btn-light">Sign In
  </button><Link onClick={()=>{signInFieldsEmpty();}} className="btn btn-light" to="/signup">Sign Up</Link></div>
  </form><p style={{color:'white',fontSize:'25px'}}>OR</p> <div id="googleButton"></div>
                </div>

            </div>
        </div>
    );
}

export default SignIn;