export interface Source {
  title: string;
  link: string;
  snippet: string;
  content?: string;
}

export interface StreamResponse {
  type: 'sources' | 'llm' | 'relevant' | 'finished' | 'error';
  text?: string;
  data?: {
    followUp?: string[];
  } | Source[] | string[] | string | null;
}

export interface Message {
  query: string;
  response: string;
  sources?: Source[];
  relatedQuestions?: string[];
} 