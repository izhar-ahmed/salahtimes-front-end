import { useState, useEffect } from 'react';
import axios from 'axios';
import { consts } from '@/util/APIEndpoints';

const useUserProfile = (token) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(consts.GET_USER_PROFILE_API, {
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
