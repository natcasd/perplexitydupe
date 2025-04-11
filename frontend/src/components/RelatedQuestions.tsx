interface RelatedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestions({ questions, onQuestionClick }: RelatedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-4 text-gray-700">Related Questions</h3>
      <ul className="space-y-3">
        {questions.map((question, index) => (
          <li key={index}>
            <button
              onClick={() => onQuestionClick(question)}
              className="text-left text-blue-600 hover:text-blue-800 hover:underline w-full transition-colors"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 