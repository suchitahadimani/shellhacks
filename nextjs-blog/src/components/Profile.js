"use client";
import { useState } from 'react';

const Profile = () => {
    const [cardHolder, setCardHolder] = useState('');
    const [cards, setCards] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardHolder) {
            setCards([...cards, cardHolder]);
            setCardHolder(''); // Clear the input field
        }
    };

    const handleDelete = (index) => {
        const newCards = cards.filter((_, cardIndex) => cardIndex !== index);
        setCards(newCards);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', border: '2px solid #4285F4', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
            <h2 style={{ fontWeight: 'bold' }}>Add Your Card Holder Name</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px 0', width: '100%' }}>
                    <label>Card Holder Name:</label>
                    <input 
                        type="text" 
                        value={cardHolder} 
                        onChange={(e) => setCardHolder(e.target.value)} 
                        required 
                        style={{ margin: '10px 0', padding: '8px', width: '100%' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', width: '220px' }}>Add Card Holder</button>
            </form>

            <h3 style={{ fontWeight: 'bold' }}>Your Card Holders</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {cards.map((holder, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '250px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span>{holder}</span>
                        <button 
                            onClick={() => handleDelete(index)} 
                            style={{ background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
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
