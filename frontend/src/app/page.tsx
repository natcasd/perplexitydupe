'use client';

import { ChatHistory } from '@/components/ChatHistory';
import { ChatInput } from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';

export default function Home() {
  const {
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
  } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] items-center">
      <div className="flex-1 w-5/8 max-w-5xl overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-8xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow-lg">Hit me!</h1>
              <div className="w-full max-w-2xl">
                <ChatInput
                  input={input}
                  isLoading={isLoading}
                  onInputChange={setInput}
                  onSubmit={handleSubmit}
                  numResults={numResults}
                  setNumResults={setNumResults}
                  enableScraping={enableScraping}
                  setEnableScraping={setEnableScraping}
                  enableQueryRewrite={enableQueryRewrite}
                  setEnableQueryRewrite={setEnableQueryRewrite}
                  model={model}
                  setModel={setModel}
                />
              </div>
            </div>
          ) : (
            <>
              <ChatHistory 
                messages={messages} 
                isLoading={isLoading} 
                onQuestionClick={handleQuestionClick}
              />
              <div className="sticky bottom-0">
                <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
                <div className="bg-white">
                  <ChatInput
                    input={input}
                    isLoading={isLoading}
                    onInputChange={setInput}
                    onSubmit={handleSubmit}
                    numResults={numResults}
                    setNumResults={setNumResults}
                    enableScraping={enableScraping}
                    setEnableScraping={setEnableScraping}
                    enableQueryRewrite={enableQueryRewrite}
                    setEnableQueryRewrite={setEnableQueryRewrite}
                    model={model}
                    setModel={setModel}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
