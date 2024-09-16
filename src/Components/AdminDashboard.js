// src/Components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import app from './firebaseConfig'; // Adjust path if necessary
import { getDatabase, ref, get } from 'firebase/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// import './AdminDashboard.css';

const AdminDashboard = () => {
  const [votingData, setVotingData] = useState({ option1: 0, option2: 0, nota: 0 });
  const [percentages, setPercentages] = useState({ option1: 0, option2: 0, nota: 0 });

  useEffect(() => {
    const fetchVotingData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'votingdata/');

      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let option1Votes = 0;
          let option2Votes = 0;
          let notaVotes = 0;
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().selectedOption === 'flexRadioDefault3') {
              option1Votes += 1;
            } else if (childSnapshot.val().selectedOption === 'flexRadioDefault1') {
              option2Votes += 1;
            } else if (childSnapshot.val().selectedOption === 'flexRadioDefault2') {
              notaVotes += 1;
            }
          });
          const totalVotes = option1Votes + option2Votes + notaVotes;
          setVotingData({ option1: option1Votes, option2: option2Votes, nota: notaVotes });
          setPercentages({
            option1: totalVotes ? (option1Votes / totalVotes) * 100 : 0,
            option2: totalVotes ? (option2Votes / totalVotes) * 100 : 0,
            nota: totalVotes ? (notaVotes / totalVotes) * 100 : 0,
          });
        } else {
          setVotingData({ option1: 0, option2: 0, nota: 0 });
          setPercentages({ option1: 0, option2: 0, nota: 0 });
        }
      } catch (error) {
        console.error('Error fetching voting data:', error);
      }
    };

    fetchVotingData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Admin Dashboard</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <div className="card-body text-center">
              <h4 className="mb-4">Voting Results</h4>
              <div className="progress mb-4" style={{ height: '30px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${percentages.option1}%` }}
                  aria-valuenow={percentages.option1}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Ravi: {percentages.option1.toFixed(2)}%
                </div>
              </div>
              <div className="progress mb-4" style={{ height: '30px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${percentages.option2}%` }}
                  aria-valuenow={percentages.option2}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Vishnu: {percentages.option2.toFixed(2)}%
                </div>
              </div>
              <div className="progress mb-4" style={{ height: '30px' }}>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${percentages.nota}%` }}
                  aria-valuenow={percentages.nota}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  NOTA: {percentages.nota.toFixed(2)}%
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <h6 className="text-success">Ravi</h6>
                  <p>{votingData.option1} votes</p>
                </div>
                <div>
                  <h6 className="text-primary">Vishnu</h6>
                  <p>{votingData.option2} votes</p>
                </div>
                <div>
                  <h6 className="text-warning">NOTA</h6>
                  <p>{votingData.nota} votes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
