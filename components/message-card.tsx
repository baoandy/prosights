import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ReactMarkdown from 'react-markdown';
import styles from './message-card.module.css';

interface MessageCardProps {
    avatarSrc?: string;
    avatarAlt: string;
    message: string;
    isUser: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({ avatarSrc, avatarAlt, message, isUser }) => {
    // NOTE: hardcoding the text for now since have not implemented login
    const avatarFallbackText = isUser ? 'AB' : 'Prosights';
    const displayName = avatarFallbackText === 'AB' ? 'You' : 'Prosights';
    const displayNameColor = isUser ? '' : 'text-prosightsBlue';
    return (
        <div className={`rounded-lg p-4`}>
            <div className="flex flex-col">
                <div className="flex items-start gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage alt={avatarAlt} src={avatarSrc} />
                        <AvatarFallback>{avatarFallbackText}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className={`text-md font-lg ${displayNameColor}`}>{displayName}</p>
                        <ReactMarkdown className={styles.markdown}>{message}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;