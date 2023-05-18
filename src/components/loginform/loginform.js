import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../forgotpassword/forgotpassword';

function LoginForm() {
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [doesNotExistError, setDoesNotExistError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };




  const navigateSignIN = () => {
    navigate('/signIn');
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const logIn = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8081/api/users/authenticate", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json(); 
    })
    .then(result => {
      console.log(result);
      localStorage.setItem('jwt', result.token);
      localStorage.setItem('userId', result.userId); 
      navigate('/')
    })
    .catch(error => {
      setDoesNotExistError(error.message);
    });
};

  return (
    <div className='form-container'>
      <Form>
        <div style={{ textAlign: 'center' }}>
          <h2>Welcome to a professional community</h2>
        </div>
        <br />
        <br />
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            minLength={8}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Remember me' />
        </Form.Group>
        <div className='d-flex justify-content-center p-1'>
          <Button variant='link' onClick={handleForgotPasswordClick}>
            Forgot password?
          </Button>
        </div>
        <div className='d-flex justify-content-center p-4'>
          <Button
            variant="outline-dark"
            type="submit"
            onClick={logIn}>
            Log in
          </Button>
          <div className='px-3'></div>
          <Button variant='outline-dark' type='submit' onClick={navigateSignIN}>
            Join now
          </Button>
        </div>
      </Form>
      <ForgotPasswordModal showModal={showForgotPasswordModal} handleCloseModal={handleCloseForgotPasswordModal} />
      {doesNotExistError && <div className="error">{doesNotExistError}</div>}
    </div>
  );
}

function LoginPage() {
  return (
    <div className='login-page-container'>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
