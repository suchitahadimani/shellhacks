"use client"
import React, { useEffect, useState } from 'react';

const NFCComponent = () => {
  const [logMessages, setLogMessages] = useState([]);

  const log = (message) => {
    setLogMessages((prev) => [...prev, message]);
    console.log(message); // For debugging purposes
  };

  const handleScan = async () => {
    log("Starting scan for NFC tag...");

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);
      });
    } catch (error) {
      log("Argh! " + error);
    }
  };

  // Automatically start scanning when the component mounts
  useEffect(() => {
    handleScan();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full height of the viewport
      textAlign: 'center' // Center the text
    }}>
      <h2>NFC Operations</h2>
      <h3>Log:</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {logMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default NFCComponent;
