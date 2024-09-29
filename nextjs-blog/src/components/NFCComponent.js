"use client";
import React, { useEffect, useState } from 'react';
import { sendDataToApi } from '@/app/api/nfcApi';

const NFCComponent = () => {
  const [currentMessage, setCurrentMessage] = useState('');

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
          timestamp: new Date().toISOString(),
        };

        // Call the API with the data
        try {
          const apiResponse = await sendDataToApi(data);
          log('API Response: ' + JSON.stringify(apiResponse)); // Update currentMessage with API response
        } catch (error) {
          log(error.message); // Update currentMessage on error
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
      <h3>Result:</h3>
      <p>{currentMessage}</p> {/* Display the current message */}
    </div>
  );
};

export default NFCComponent;
