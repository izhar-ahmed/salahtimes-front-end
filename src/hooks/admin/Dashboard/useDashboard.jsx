import { useState, useEffect } from 'react';
import axios from 'axios';
import { consts } from '@/util/APIEndpoints';

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
	const userName = localStorage.getItem('name') || 'User';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
				

        const response = await axios.get(consts.GET_ALL_DASHBOARD_API, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error, userName };
};

export default useDashboard