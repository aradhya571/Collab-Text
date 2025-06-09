import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username, currentUser }) => {
    // Only render the client if it matches the current user's username
    if (username !== currentUser) {
        return null;
    }

    return (
        <div className="client">
            <Avatar name={username} size={50} round="14px" />
            <span className="userName">{username}</span>
        </div>
    );
};

export default Client;
