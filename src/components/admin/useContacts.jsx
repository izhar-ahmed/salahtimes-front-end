import { useState, useEffect } from 'react';
import axios from 'axios';
import { consts } from '@/util/APIEndpoints';
import { getLocalStorageItem } from '@/util/common';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = getLocalStorageItem('token');
        const response = await axios.get(consts.GET_ALL_CONTACT_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading, error };
};

export default useContacts;
