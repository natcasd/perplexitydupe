import os
import requests
from typing import Dict, Any, Optional, List


# use ENV variables
# Constants
API_URL = "https://google.serper.dev/search"
API_KEY = os.getenv("SERPER_API_KEY")
DEFAULT_LOCATION = 'us'
HEADERS = {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json'
}

def get_sources(query: str, num_results, stored_location: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Fetch search results from Serper API.

    :param query: Search query string
    :param stored_location: Optional location string
    :return: Dictionary containing search results
    """
    try:
        search_location = (stored_location or DEFAULT_LOCATION).lower()

        payload = {
            "q": query,
            "num": num_results,
            "gl": search_location
        }

        response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=10)
        response.raise_for_status()

        data = response.json()
        results = []
        if 'organic' in data:
            for item in data['organic'][:num_results]:
                results.append({
                    'title': item.get('title', ''),
                    'link': item.get('link', ''),
                    'snippet': item.get('snippet', '')
                })
        
        return results

    except requests.RequestException as e:
        print(f"HTTP error while getting sources: {e}")
    except Exception as e:
        print(f"Unexpected error while getting sources: {e}")

    return []
