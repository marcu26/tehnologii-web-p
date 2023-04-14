import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import IsLoggedIn from '../../GlobalVars/IsLoggedIn';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../forgotpassword/forgotpassword';

function LoginForm() {
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const setX = () => {
    if (IsLoggedIn.value === '0') {
      IsLoggedIn.value = '1';
    } else {
      IsLoggedIn.value = '0';
    }
    navigate('/');
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
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
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
          <Button variant='outline-dark' type='submit' onClick={setX}>
            Sign In
          </Button>
          <div className='px-3'></div>
          <Button variant='outline-dark' type='submit' onClick={navigateSignIN}>
            Join now
          </Button>
        </div>
      </Form>
      <ForgotPasswordModal showModal={showForgotPasswordModal} handleCloseModal={handleCloseForgotPasswordModal} />
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
