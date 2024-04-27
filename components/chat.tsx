'use client';
import { useChat } from 'ai/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import MessageCard from "./message-card";
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Scroll to the bottom of the chat
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }
    , [messages]);
  return (
    <div className="flex flex-col flex-grow justify-center items-center w-full h-screen" >
      <Image src="/prosights-logo.jpg" alt="Prosights" width={messages.length === 0 ? 300 : 200} height={messages.length === 0 ? 300 : 200} className='mt-6' />
      <div className="w-full sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4 overflow-hidden">
        <CardContent
          className="relative flex flex-col h-full"
        >
          <ScrollArea className="p-4" ref={scrollRef}> {/* Makes this div grow and be the only scrollable area */}
            {messages.length > 0 ? messages.map((message, index) => (
              <div>
                <MessageCard
                  key={index}
                  avatarAlt="TA"
                  isUser={message.role === "user"}
                  avatarSrc={message.role === "assistant" ? "/prosights-icon.svg" : ""}
                  message={message.content}
                />
                <Separator />
                {error && <div className="text-red-500 text-sm">{error.message}</div>}
              </div>
            )) :
              <div className="text-center p-4">Ask me anything!</div>
            }
          </ScrollArea>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-4 w-full">
              <Input
                className="flex-1"
                placeholder="Ask me anything!"
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <Button
                size="sm"
                className="bg-prosightsBlue"
                type='submit'
                disabled={isLoading}
              >
                Send
              </Button>
            </form>
          </CardContent>
        </CardContent>
      </div>
    </div>
  )
}
