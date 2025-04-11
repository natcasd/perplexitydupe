import json
import os
from google import genai
from langchain_core.prompts import PromptTemplate
from prompts import search_prompt_system, relevant_prompt_system
from pydantic import BaseModel

# Configure Gemini API
API_KEY=os.getenv('GOOGLE_API_KEY')
MODEL = "gemini-2.0-flash"

def get_answer(query, contexts, date_context):
    """
    Get an answer from Gemini using the provided query and contexts.
    
    Args:
        query (str): The user's question
        contexts (str): The context information
        date_context (str): The date context for the system prompt
        
    Yields:
        str: Chunks of the response
    """
    system_prompt_search = PromptTemplate(input_variables=["date_today"], template=search_prompt_system)
    
    prompt = f"{system_prompt_search.format(date_today=date_context)}\n\n"
    prompt += f"User Question: {query}\n\n"
    prompt += f"CONTEXTS:\n\n{contexts}"
    
    try:
        client = genai.Client(api_key=API_KEY)
        response = client.models.generate_content_stream(
            model=MODEL,
            contents=prompt,
        )
        
        for chunk in response:
            if chunk.text:
                yield chunk.text
                
    except Exception as e:
        print(f"Error during get_answer_gemini call: {e}")
        yield "data:" + json.dumps(
            {'type': 'error', 'data': "We are currently experiencing some issues. Please try again later."}) + "\n\n"

class FollowUpQuestions(BaseModel):
    questions: list[str]

def get_relevant_questions(contexts, query):
    """
    Get relevant questions from Gemini based on the context and query.
    
    Args:
        contexts (str): The context information
        query (str): The user's query
        
    Returns:
        str: JSON string containing relevant questions
    """
    try:
        prompt = f"{relevant_prompt_system}\n\n"
        prompt += f"User Query: {query}\n\n"
        prompt += f"Contexts:\n{contexts}\n"
        
        client = genai.Client(api_key=API_KEY)
        response = client.models.generate_content(
            model=MODEL, 
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': FollowUpQuestions,
            }
        )
        
        # Ensure the response is in JSON format
        try:
            # Try to parse as JSON to validate
            json.loads(response.text)
            return response.text
        except json.JSONDecodeError:
            # If not valid JSON, wrap in a JSON object
            print(f'Model didnt return valid JSON: {response.text}')
            return "{}"
            
    except Exception as e:
        print(f"Error during RELEVANT GEMINI: {e}")
        return "{}" 