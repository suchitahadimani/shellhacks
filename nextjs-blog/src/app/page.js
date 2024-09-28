// App.js (with Next.js routing system)
"use client"
import { useRouter } from 'next/router';
import NavbarPage from '@/pages/NavbarPage';
import MapPage from '@/pages/MapPage';

const App = () => {
    return (
        <>
            <NavbarPage />
            <MapPage />
        </>
    );
};

export default App;
