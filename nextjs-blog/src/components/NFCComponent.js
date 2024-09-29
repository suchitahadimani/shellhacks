"use client";
import React, { useEffect, useState } from 'react';
import { sendDataToApi } from '@/app/api/nfcApi';

// List of credit card company names mapped to categories
const categoryToCardMap = {
    Amazon: "Discover it",
    Grocery: "Visa",
    Dining: "MasterCard",
    Travel: "Chase",
    Gas: "BofA",
    Shopping: "Capital One"
};

const NFCComponent = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(categoryToCardMap)[0]); // Default to the first category

    const log = (message) => {
        setCurrentMessage(message); 
        console.log(message); 
    };

    const handleScan = async () => {
        log("Starting scan for NFC tag...");

        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            log("> Scan started");

            ndef.addEventListener("readingerror", () => {
                log("Cannot read data from the NFC tag. Try another one?");
            });

            ndef.addEventListener("reading", async ({ message, serialNumber }) => {
                log(`> Serial Number: ${serialNumber}`);
                log(`> Records: (${message.records.length})`);

                // Prepare data to send to the API
                const data = {
                    serialNumber: serialNumber,
                    records: message.records.map(record => ({
                        recordType: record.recordType,
                        mediaType: record.mediaType,
                        data: record.data,
                    })),
                    category: selectedCategory, // Include the selected category
                    timestamp: new Date().toISOString(),
                };

                // Handle API call
                try {
                    const apiResponse = await sendDataToApi(data);
                    log('API Response: ' + JSON.stringify(apiResponse)); 
                } catch (error) {
                    log(error.message);
                    const bestCard = categoryToCardMap[selectedCategory];
                    setCurrentMessage(`Since you chose ${selectedCategory}, the best card is ${bestCard}.`);
                }
            });
        } catch (error) {
            log("Argh! " + error);
        }
    };

    useEffect(() => {
        handleScan();
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
        }}>
            <h2>NFC Reader!</h2>
            <div>
                <label htmlFor="category-select">Select Category:</label>
                <select 
                    id="category-select" 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)} 
                    style={{ margin: '10px', padding: '5px' }}
                >
                    {Object.keys(categoryToCardMap).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <h3>Result:</h3>
            <p>{currentMessage}</p> 
        </div>
    );
};

export default NFCComponent;
