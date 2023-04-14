import React from "react"
import Navbar from "../../components/navbar/navbar";
import "./signIn.css"
import SignInForm from "../../components/signinform/signinform";

const SignIn = () => {
    return (<div>
        <Navbar />
        <div className="bigDiv">
            <div className="loginForm">
                <SignInForm />
            </div>
        </div>
    </div>)
}
export default SignIn