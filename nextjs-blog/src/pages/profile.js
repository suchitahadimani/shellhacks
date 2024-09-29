// app/profile/page.js
"use client";

import Profile from '../components/Profile';
import Navbar from '@/components/Navbar_mini';

const ProfilePage = () => {

    return (
        <div>
            <Navbar />
            <Profile /> 
        </div>
    );
};

export default ProfilePage;
   