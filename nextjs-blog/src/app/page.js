// App.js
"use client"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from '../components/Map';
import Profile from '../components/Profile';
import Navbar from '../components/Navbar';
import NFCComponent from '@/components/NFCComponent';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/nfc" element={<NFCComponent />} />
            </Routes>
        </Router>
    );
};

export default App;
