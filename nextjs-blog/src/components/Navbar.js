"use client"
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
const Navbar = () => {
    const { user } = useUser();
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
            {user ? (
                <a href="/api/auth/logout">Logout</a>
            ) : (
                <a href="/api/auth/login">Login</a>
                
            )}
        </nav>


    );
};

export default Navbar;
