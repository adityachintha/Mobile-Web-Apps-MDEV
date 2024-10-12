// src/components/UserProfile.js
import React from 'react';
import { auth } from '../firebase';

const UserProfile = () => {
    const user = auth.currentUser;

    return (
        <div>
            <h3>User Profile</h3>
            {user ? (
                <p>Email: {user.email}</p>
            ) : (
                <p>No user is logged in.</p>
            )}
        </div>
    );
};

export default UserProfile;
