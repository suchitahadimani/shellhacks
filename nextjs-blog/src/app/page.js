"use client"; // Ensure this file is a client component
import Navbar from '@/components/Navbar';
import MapPage from '@/pages/MapPage';

const App = () => { 
    return (
        <>
        
            <Navbar />
            <MapPage />

        </>
    );
};

// Don't forget to export the component
export default App;
