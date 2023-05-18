import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './singinform.css'

function SignInForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [allreadyExistsError, setAlreadyExistsError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        if (event.target.value.length < 8) {
            setUsernameError('Password must be at least 8 characters');
        } else {
            setUsernameError('');
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail)
            setEmailError("Enter a valid email");
        else
            setEmailError("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        if (event.target.value !== password) {
            setRepeatPasswordError('Passwords do not match');
        } else {
            setRepeatPasswordError('');
        }
    };




    const signIN = (event) => {
        event.preventDefault();

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        }


        if (username.length < 8) {
            setUsernameError('Username must be at least 8 characters');
        }

        if (repeatPassword !== password) {
            setRepeatPasswordError('Passwords do not match');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail)
            setEmailError("Enter a valid email");

        if (password.length >= 8 && repeatPassword === password) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password,
                "username": username
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8081/api/users/create", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                    return response.text();
                })
                .then(result => {
                    console.log(result);
                    navigate('/login');
                })
                .catch(error => {
                    setAlreadyExistsError(error.message);
                });


        }
    };

    const navigateLogIn = () => {
        navigate("/login")
    }



    return (
        <Form>
            <div style={{ textAlign: "center" }}>
                <h2>Welcome to a professional community</h2>
            </div>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                {usernameError && <div className="error">{usernameError}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />

                {emailError && <div className="error">{emailError}</div>}
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    minLength={8}
                    required
                />
                {passwordError && <div className="error">{passwordError}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    minLength={8}
                    required
                />
                {repeatPasswordError && <div className="error">{repeatPasswordError}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <div className="d-flex justify-content-center p-2">
                <Button
                    variant="outline-dark"
                    type="submit"
                    onClick={signIN}>
                    Agree & Join
                </Button>
            </div>
            <div className="d-flex justify-content-center ">
                <Button variant="link" type="submit" onClick={navigateLogIn}>
                    Already have an account?
                </Button>
            </div>
            {allreadyExistsError && <div className="error">{allreadyExistsError}</div>}
        </Form>
    );
}
export default SignInForm;