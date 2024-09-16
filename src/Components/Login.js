import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Correct import

import './Login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLoginSuccess = (response) => {
    try {
      const { credential } = response;
      const decoded = jwtDecode(credential); // Correct usage
      const email = decoded.email;

      // Check if email ends with "@klu.ac.in"
      if (email.endsWith('@klu.ac.in')) {
        console.log('Login Success:', email);
        // Navigate to home and pass the email
        navigate('/profile', { state: { email } });
      } 
      else if(email==='hemanthkumar312004@gmail.com')
      {

        console.log('Login Success:', email);
        // Navigate to home and pass the email
        navigate('/ad', { state: { email } });

      }
      else {
        setError('You must use an @klu.ac.in email to login.');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('An error occurred while processing your login.');
    }
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
    setError('Login Failed. Please try again.');
  };

  return (
    <div className="Login">
      <h1 className='maintitle'>KALASALINGAM UNIVERSITY</h1>
      <h2 className='title'>Login with Google</h2>
    
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
