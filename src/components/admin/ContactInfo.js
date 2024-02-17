import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactInfo = ({ contactId }) => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
					const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8080/api/contact/get-all-contacts/${contactId}`, {
									headers: {
										Authorization: `Bearer ${token}`
									}
								});
                setContact(response.data);
            } catch (error) {
                console.error('Error fetching contact info:', error);
                // Handle error if needed
            }
        };

        fetchContactInfo();

        // Cleanup function (optional)
        return () => {
            // Perform any cleanup (if needed)
        };
    }, [contactId]); // Runs effect whenever contactId changes

    return (
        <div className="container mx-auto">
            <div style={{ fontWeight: "400" }} className='evaFvq'>Contact Details</div>
            <div className="max-w-md p-6 rounded-lg shadow-xl">
                {contact ? (
                    <div>
                        <div className="mb-2"><strong>Name:</strong> {contact.name}</div>
                        <div className="mb-2"><strong>Email:</strong> {contact.email}</div>
                        <div className="mb-2"><strong>Subject:</strong> {contact.subject}</div>
                        <div><strong>Message:</strong> {contact.message}</div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;
