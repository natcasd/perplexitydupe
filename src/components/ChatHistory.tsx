import React from "react";
import { Message } from "../types/chat";
import { ChatMessage } from "./ChatMessage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
  relatedQuestions: string[];
  onQuestionClick: (question: string) => void;
}

export function ChatHistory({ messages, isLoading, relatedQuestions, onQuestionClick }: ChatHistoryProps) {
  // If there are no messages, don't render anything
  if (messages.length === 0) return null;

  // Get the most recent message
  const currentMessage = messages[messages.length - 1];
  
  // Get previous messages (all except the most recent)
  const previousMessages = messages.slice(0, -1);

  return (
    <div className="space-y-8 py-8">
      {/* Current message is always visible */}
      <ChatMessage 
        message={currentMessage} 
        relatedQuestions={currentMessage.role === 'assistant' ? relatedQuestions : undefined}
        onQuestionClick={onQuestionClick}
      />
      
      {/* Previous messages are stored in an accordion */}
      {previousMessages.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="previous-messages">
            <AccordionTrigger>Previous Messages</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-8">
                {previousMessages.slice().reverse().map((message, index) => (
                  <ChatMessage 
                    key={previousMessages.length - 1 - index}
                    message={message} 
                    onQuestionClick={onQuestionClick}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-gray-500 animate-pulse">
          Thinking...
        </div>
      )}
    </div>
  );
} 