import React, { useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
  onQuestionClick: (question: string) => void;
}

export function ChatHistory({ messages, isLoading, onQuestionClick }: ChatHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const currentMessage = messages[messages.length - 1];

  // Scroll to top when current message query changes
  useEffect(() => {
      cur.current?.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
  }, [currentMessage?.query]);

  // If there are no messages, don't render anything
  if (messages.length === 0) return null;
  
  // Get previous messages (all except the most recent)
  const previousMessages = messages.slice(0, -1);

  return (
    <div 
      className="border-b pb-2"
    >
      {/* Previous messages are stored in accordion items */}
      {previousMessages.length > 0 && (
        <Accordion type="multiple" className="w-full">
          {previousMessages.map((message, index) => (
            <AccordionItem key={index} value={`message-${index}`}>
              <AccordionTrigger className="text-left">
                {message.query}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <ChatMessage 
                    message={message}
                    onQuestionClick={onQuestionClick}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      
      {/* Current message is shown below the history */}
      <div ref={cur} className="border-b pb-2">
        <h2 className="text-4xl font-bold">{currentMessage.query}</h2>
      </div>
      <ChatMessage 
        message={currentMessage} 
        onQuestionClick={onQuestionClick}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-gray-500 animate-pulse">
          Thinking...
        </div>
      )}
    <div style={{ height: '40vh' }}></div>
    </div>
  );
} 