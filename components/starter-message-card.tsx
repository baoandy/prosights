import React from 'react';

interface StarterMessageCardProps {
    message: string;
    onClick: () => void;
}

const StarterMessageCard: React.FC<StarterMessageCardProps> = ({ message, onClick }) => {
    return (
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClick}>
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default StarterMessageCard;