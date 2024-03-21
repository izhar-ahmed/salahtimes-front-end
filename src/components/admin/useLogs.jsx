// useLogs.js
import { useState, useEffect } from 'react';
import { consts } from '@/util/APIEndpoints';
import { getLocalStorageItem } from '@/util/common';

const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getLocalStorageItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(consts.GET_ALL_LOGS_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }

        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [token]);

  return { logs, loading, error };
};

export default useLogs;
