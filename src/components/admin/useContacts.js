import { useState, useEffect } from 'react';
import axios from 'axios';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/contact/get-all-contacts', {
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
