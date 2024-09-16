import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import app from './firebaseConfig';
import { getDatabase, ref, get, set } from 'firebase/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('userEmail');

  const [selectedOption, setSelectedOption] = useState('flexRadioDefault2');
  const [message, setMessage] = useState('');
  const [isVotingDisabled, setIsVotingDisabled] = useState(false);

  useEffect(() => {
    // Store email in localStorage if available in location.state
    if (location.state?.email) {
      localStorage.setItem('userEmail', location.state.email);
    }

    // Check if voting has already been completed when the component mounts
    const checkVotingStatus = async () => {
      if (!email) {
        console.error('No email found');
        return;
      }

      const db = getDatabase(app);
      const dbRef = ref(db, `votingdata/${email.substring(0, 11)}/selectedOption`);

      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setMessage('Voting already completed');
          setIsVotingDisabled(true);
        } else {
          setMessage('');
          setIsVotingDisabled(false);
        }
      } catch (error) {
        console.error('Error checking voting status:', error);
      }
    };

    checkVotingStatus();
  }, [email, location.state]);

  const handleChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const handleSubmit = async () => {
    if (!email) {
      console.error('No email found for submission');
      return;
    }

    const db = getDatabase(app);
    const dbRef = ref(db, `votingdata/${email.substring(0, 11)}/selectedOption`);

    try {
      // Data does not exist, proceed with submission
      await set(dbRef, selectedOption);
      console.log('Data successfully written to Firebase');
      setMessage('Vote submitted successfully');
      // Redirect to home page after successful submission
      navigate('/home');
    } catch (error) {
      console.error('Error writing data to Firebase:', error);
    }
  };

  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          checked={selectedOption === 'flexRadioDefault1'}
          onChange={handleChange}
          disabled={isVotingDisabled}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Option 1
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked={selectedOption === 'flexRadioDefault2'}
          onChange={handleChange}
          disabled={isVotingDisabled}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Option 2
        </label>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit} disabled={isVotingDisabled}>
        Submit
      </button>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Profile;
