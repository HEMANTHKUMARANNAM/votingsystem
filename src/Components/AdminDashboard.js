// src/Components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import app from './firebaseConfig'; // Adjust path if necessary
import { getDatabase, ref, get } from 'firebase/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// import './AdminDashboard.css';

const AdminDashboard = () => {
  const [votingData, setVotingData] = useState({ option1: 0, option2: 0 });
  const [percentages, setPercentages] = useState({ option1: 0, option2: 0 });

  useEffect(() => {
    const fetchVotingData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'votingdata/');

      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let option1Votes = 0;
          let option2Votes = 0;
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() === 'flexRadioDefault1') {
              option1Votes += 1;
            } else if (childSnapshot.val() === 'flexRadioDefault2') {
              option2Votes += 1;
            }
          });
          const totalVotes = option1Votes + option2Votes;
          setVotingData({ option1: option1Votes, option2: option2Votes });
          setPercentages({
            option1: totalVotes ? (option1Votes / totalVotes) * 100 : 0,
            option2: totalVotes ? (option2Votes / totalVotes) * 100 : 0,
          });
        } else {
          setVotingData({ option1: 0, option2: 0 });
          setPercentages({ option1: 0, option2: 0 });
        }
      } catch (error) {
        console.error('Error fetching voting data:', error);
      }
    };

    fetchVotingData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mt-4">
        <h4>Voting Results</h4>
        <p>Option 1: {votingData.option1} votes ({percentages.option1.toFixed(2)}%)</p>
        <p>Option 2: {votingData.option2} votes ({percentages.option2.toFixed(2)}%)</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
