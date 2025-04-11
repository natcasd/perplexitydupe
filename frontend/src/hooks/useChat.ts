import { useState } from 'react';
import { Message, StreamResponse, Source } from '@/types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [numResults, setNumResults] = useState(5);
  const [enableScraping, setEnableScraping] = useState(true);
  const [enableQueryRewrite, setEnableQueryRewrite] = useState(true);
  const [model, setModel] = useState('gpt-4');

  const processQuery = async (query: string) => {
    if (!query.trim() || isLoading) return;

    // Create a new message with the query and empty response
    const newMessage: Message = { 
      query: query, 
      response: '' 
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat?query=${encodeURIComponent(query)}&num_results=${numResults}&scrape_websites=${enableScraping}`);
      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let currentResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data:')) continue;
          
          try {
            const jsonStr = line.slice(5).trim();
            if (!jsonStr || jsonStr === 'null') continue;
            
            const data: StreamResponse = JSON.parse(jsonStr);
            
            // Get the last message once before the switch statement
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              
              if (!lastMessage) return newMessages;
              
              switch (data.type) {
                case 'sources':
                  if (data.data && Array.isArray(data.data)) {
                    lastMessage.sources = data.data as Source[];
                  }
                  break;
                  
                case 'llm':
                  if (data.text) {
                    currentResponse += data.text;
                    lastMessage.response = currentResponse;
                  }
                  break;
                  
                case 'relevant':
                  if (data.data && typeof data.data === 'object' && data.data !== null) {
                    if ('questions' in data.data && Array.isArray(data.data.questions)) {
                      lastMessage.relatedQuestions = data.data.questions as string[];
                    }
                    else {
                      lastMessage.relatedQuestions = [];
                    }
                  }
                  break;
                  
                case 'error':
                  if (typeof data.data === 'string') {
                    throw new Error(data.data);
                  }
                  throw new Error('An unknown error occurred');
                  
                case 'finished':
                  console.log('Received finished event');
                  break;
              }
              
              return newMessages;
            });
          } catch (e) {
            console.error('Error parsing stream:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processQuery(input);
  };

  return {
    messages,
    input,
    isLoading,
    setInput,
    handleSubmit,
    handleQuestionClick,
    numResults,
    setNumResults,
    enableScraping,
    setEnableScraping,
    enableQueryRewrite,
    setEnableQueryRewrite,
    model,
    setModel,
  };
} 