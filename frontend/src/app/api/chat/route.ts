import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const num_results = searchParams.get('num_results');
  const scrape_websites = searchParams.get('scrape_websites');

  if (!query) {
    return new Response('Query parameter is required', { status: 400 });
  }

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
  
  // Add all required parameters with default values
  const params = new URLSearchParams({
    query: query,
    date_context: 'today',  // Default to today
    stored_location: 'us',  // Default to US
    scrape_websites: scrape_websites || 'false', // Default to false
    num_results: num_results || '10'  // Default to 10 results
  });

  const response = await fetch(`${backendUrl}/search?${params.toString()}`);

  if (!response.ok) {
    return new Response('Failed to fetch from backend', { status: response.status });
  }

  // Log the response headers
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
  // Forward the stream from the backend
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 