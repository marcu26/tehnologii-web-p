import React from "react"
import LoginForm from "../../components/loginform/loginform";
import Navbar from "../../components/navbar/navbar";
import "./login.css"

const Login = () => {
    return (<div className="wrapper">
        <Navbar />
        <div className="bigDiv">
            <div className="loginForm">
                <LoginForm />
            </div>
        </div>
    </div>)
}
export default Login