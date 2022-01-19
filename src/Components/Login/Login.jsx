import { useRef, useState } from "react/cjs/react.development";
import {Redirect} from "react-router-dom"

function Login() {
const [checker, setChecker] = useState(false);
const name = useRef(null)
const password = useRef(null)
const render = ((evt)=>{
  evt.preventDefault()
  let obj = {
    admin_name: name.current.value.trim(),
    admin_password: password.current.value.trim()
  }
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
  fetch("http://192.168.1.9:4000/", requestOptions)
    .then((data) => data.json())
    .then((m) => {
      if(m=='false'){
        console.log('turYoqol')
      }else{
        window.localStorage.setItem('token', m)
        setChecker('true')
      }
    });
    name.current.value = null
    password.current.value = null
})
if(checker=='true'){
  return <Redirect to="/" />;
}
  return (
    <>
      <form className="login" onSubmit={render}>
        <div className="container">
            <h1 className="LoginHeader">LOGIN HOTEL ADMISTRATION</h1>
          <div className="labelWrapper">
            <div className="loginWrapper">
              <span>Login</span>
              <input type="text" ref ={name}/>
            </div>
            <div className="passwordWrapper">
              <span>Password</span>
              <input type="password" ref ={password}/>
            </div>
            <button className="subBtn">SUBMIT</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
