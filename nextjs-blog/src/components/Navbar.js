"use client"
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            backgroundColor: '#4285F4',
            color: '#fff'
        }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Maps</Link>
            <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
            <Link to="/nfc" style={{ color: '#fff', textDecoration: 'none' }}>NFC</Link>
        </nav>
    );
};

export default Navbar;
