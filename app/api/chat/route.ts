import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';

export const dynamic = 'force-dynamic';
export const runtime = 'edge'


const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};
export async function POST(req: Request) {

    const { messages } = await req.json();
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    // Send http request to http://127.0.0.1:8000/
    const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: formattedPreviousMessages,
            input: currentMessageContent,
        }),
    });

    // const responseIterator = response.body?.getReader();
    const readableStream = response.body;
    if (readableStream === null || !(readableStream instanceof ReadableStream)) {
        throw new Error('Failed to get response body');
    }
    return new StreamingTextResponse(readableStream);
}