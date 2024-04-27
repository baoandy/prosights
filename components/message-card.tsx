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

interface Message {
    text: string;
    language?: string;
}


const MessageCard: React.FC<MessageCardProps> = ({ avatarSrc, avatarAlt, message, isUser }) => {
    const avatarFallbackText = isUser ? 'AB' : 'Prosights';
    const displayName = avatarFallbackText === 'AB' ? 'You' : 'Prosights';
    const displayNameColor = isUser ? '' : 'text-prosightsBlue';
    const test = `1. Market Skepticism:\n a 2. Hello`
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