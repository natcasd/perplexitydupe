import trafilatura
from typing import Optional

def extract_website_content(url: str) -> Optional[str]:
    """
    Extracts and cleans the main content from a given website URL using Trafilatura.

    Args:
    url (str): The URL of the website from which to extract content.
    timeout (int): Timeout in seconds for the request (default: 10)

    Returns:
    Optional[str]: The extracted text content or None if extraction failed.
    """
    try:
        # Download and extract content with Trafilatura
        downloaded = trafilatura.fetch_url(url)
        if downloaded is None:
            print(f"Failed to download content from {url}")
            return None
            
        # Extract the main content
        text = trafilatura.extract(downloaded, include_comments=False, 
                                  fast=True, output_format='markdown', deduplicate=True)
        
        if text is None or len(text.strip()) < 200:
            print(f"Failed to extract meaningful content from {url}")
            return None
        
        text = ' '.join(text.split())
            
        return text

    except Exception as error:
        print('Error extracting main content from {url}:', error)
        return ""
