import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = (token) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/get-user-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();

    return () => {
      // Clean up if needed
    };
  }, [token]);

  return { userProfile, error };
};

export default useUserProfile;
