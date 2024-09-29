"use client"
import Link from 'next/link';
const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
            backgroundColor: '#4285F4',
            color: '#fff'
        }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Maps</Link>
            <Link href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
            <Link href="/nfc" style={{ color: '#fff', textDecoration: 'none' }}>NFC</Link>
        </nav>


    );
};

export default Navbar;
