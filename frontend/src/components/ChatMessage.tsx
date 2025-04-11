import ReactMarkdown from 'react-markdown';
import { Message } from '@/types/chat';
import { RelatedQuestions } from './RelatedQuestions';

interface ChatMessageProps {
  message: Message;
  onQuestionClick?: (question: string) => void;
}

export function ChatMessage({ message, onQuestionClick }: ChatMessageProps) {
  return (
    <div className="w-full space-y-2">
      <div className="font-bold text-lg border-b">
      </div>
      <div className="space-y-2">
        <div className="prose max-w-none bg-white rounded-lg shadow-sm pb-4">
          <ReactMarkdown>
            {message.response}
          </ReactMarkdown>
        </div>
        {message.sources && (
          <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
            <details>
              <summary className="cursor-pointer hover:text-gray-900">Sources</summary>
              <ul className="mt-2 space-y-1">
                {message.sources.map((source, idx) => (
                  <li key={idx}>
                    <a 
                      href={source.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
        {message.relatedQuestions && message.relatedQuestions.length > 0 && onQuestionClick && (
          <div className="mt-4">
            <RelatedQuestions 
              questions={message.relatedQuestions} 
              onQuestionClick={onQuestionClick}
            />
          </div>
        )}
      </div>
    </div>
  );
} 