"use client";
import React from 'react';

// List of random credit card company names
const creditCardCompanies = [
    "Chase",
    "Visa",
    "MasterCard",
    "AMEX",
    "Discover it",
    "Capital One",
    "BofA"
];

const getRandomCreditCardCompany = () => {
    const randomIndex = Math.floor(Math.random() * creditCardCompanies.length);
    return creditCardCompanies[randomIndex];
};

const InfoWindowContent = ({ place, additionalInput, setAdditionalInput }) => {
    const handleGoHereClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.formatted_address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    const creditCardCompany = getRandomCreditCardCompany(); // Get a random company name

    return (
        <div>
            <strong>{place.name}</strong><br />
            {place.formatted_address}<br />
            <p>The best credit card to use here is {creditCardCompany}.</p>
            <button 
                onClick={handleGoHereClick} 
                style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#4285F4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                I Want to Go Here
            </button>
        </div>
    );
};

export default InfoWindowContent;
