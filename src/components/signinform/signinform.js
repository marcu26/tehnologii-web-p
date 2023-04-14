import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import IsLoggedIn from '../../GlobalVars/IsLoggedIn';
import { useNavigate } from "react-router-dom";

function SignInForm() {
    const navigate = useNavigate();

    const setX = () => {
        if (IsLoggedIn.value === "0") {
            IsLoggedIn.value = "1";
        }
        else {
            IsLoggedIn.value = "0";
        }
        navigate("/");
    };

    const navigateLogIn = () => {
        navigate("/login")
    }

    return (
        <Form>
            <div style={{ textAlign: 'center' }}>
                <h2>Welcome to a professional community</h2>
            </div>
            <br></br>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="reapeatpassword" placeholder="Repeat password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>


            <div className='d-flex justify-content-center p-2'>
                <Button variant="outline-dark" type="submit" onClick={setX}>
                Agree & Join
                </Button>
                </div>
                <div className='d-flex justify-content-center '>
                <Button variant="link" type="submit" onClick={navigateLogIn}>
                    Allready have an account?
                </Button>
            </div>
        </Form>
    );
}
export default SignInForm;