"use client";
import { useState } from 'react';

const Profile = () => {
    const [cardDetails, setCardDetails] = useState({
        cardHolder: '',
        cardCompany: '',
        cardName: '',
        cardType: '',
        benefitPercentage: '',
        benefitType: '',
    });
    const [cards, setCards] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ensure all fields are filled
        if (Object.values(cardDetails).every((field) => field !== '')) {
            setCards([...cards, cardDetails]);
            setCardDetails({
                cardHolder: '',
                cardCompany: '',
                cardName: '',
                cardType: '',
                benefitPercentage: '',
                benefitType: '',
            }); // Clear the form
        }
    };

    const handleDelete = (index) => {
        const newCards = cards.filter((_, cardIndex) => cardIndex !== index);
        setCards(newCards);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'left', border: '2px solid #4285F4', borderRadius: '10px', maxWidth: '700px', margin: '40px auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Enter Your Card Details</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Card Holder Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ width: '35%', fontWeight: 'bold' }}>Card Holder Name:</label>
                    <input 
                        type="text" 
                        name="cardHolder"
                        value={cardDetails.cardHolder} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px', width: '60%', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                
                {/* Card Company */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ width: '35%', fontWeight: 'bold' }}>Card Company:</label>
                    <select 
                        name="cardCompany"
                        value={cardDetails.cardCompany} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px', width: '60%', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                        <option value="" disabled>Select Company</option>
                        <option value="AMEX">AMEX</option>
                        <option value="BofA">Bank of America</option>
                        <option value="CapitalOne">Capital One</option>
                        <option value="Chase">Chase</option>
                        <option value="Discover">Discover It</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="Visa">Visa</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Card Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ width: '35%', fontWeight: 'bold' }}>Card Name:</label>
                    <input 
                        type="text" 
                        name="cardName"
                        value={cardDetails.cardName} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px', width: '60%', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>

                {/* Card Type */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ width: '35%', fontWeight: 'bold' }}>Card Type:</label>
                    <select 
                        name="cardType" 
                        value={cardDetails.cardType} 
                        onChange={handleChange} 
                        required 
                        style={{ padding: '8px', width: '60%', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                        <option value="" disabled>Select Card Type</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>

                {/* Card Benefits */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ width: '35%', fontWeight: 'bold' }}>Card Benefits:</label>
                    <div style={{ display: 'flex', gap: '10px', width: '60%' }}>
                        <input 
                            type="number" 
                            name="benefitPercentage"
                            placeholder="e.g., 5"
                            value={cardDetails.benefitPercentage} 
                            onChange={handleChange} 
                            required 
                            style={{ padding: '8px', width: '30%', border: '1px solid #ccc', borderRadius: '5px' }}
                        />
                        <select 
                            name="benefitType"
                            value={cardDetails.benefitType} 
                            onChange={handleChange} 
                            required 
                            style={{ padding: '8px', width: '70%', border: '1px solid #ccc', borderRadius: '5px' }}
                        >
                            <option value="" disabled>Select Benefit Type</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Dining">Dining</option>
                            <option value="Travel">Travel</option>
                            <option value="Gas">Gas</option>
                            <option value="Shopping">Shopping</option>
                            {/* Add more benefit types as needed */}
                        </select>
                    </div>
                </div>

                {/* Centered Add Card Button */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" style={{ padding: '10px', width: '150px', background: '#4285F4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Add Card
                        </button>
                    </div>
            </form>
            
            <h3 style={{ fontWeight: 'bold', marginTop: '30px', textAlign: 'left' }}>Your Saved Cards</h3>
            <ul style={{ listStyleType: 'none', padding: '0', marginTop: '10px' }}>
                {cards.map((card, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span>{card.cardHolder} ({card.cardCompany}) </span>
                        <button 
                            onClick={() => handleDelete(index)} 
                            style={{ background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '5px 10px' }}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
