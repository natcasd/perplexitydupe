import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def build_context(sources_result, query):
    """
      Build context from search results.

      :param sources_result: Dictionary containing search results
      :param query: Search query string
      :param pro_mode: Boolean indicating whether to use pro mode (reranking)
      :param date_context: Date context string
      :return: Built context as a string
      """
    try:
        search_contexts = ''
        for source in sources_result:
            search_contexts += "\n"
            if 'title' in source:
                search_contexts += f"\n{source['title']}"
            if 'snippet' in source:
                search_contexts += f"\n{source['snippet']}"
            if 'content' in source:
                search_contexts += f"\n{source['content']}"
                                    
        return search_contexts
    except Exception as e:
        logger.exception(f"An error occurred while building context: {e}")
        return ""
