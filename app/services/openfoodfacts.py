import requests

BASE_URL = "https://world.openfoodfacts.org/cgi/search.pl"

def search_food(query: str, page_size: int = 5):
    params = {
        "search_terms": query,
        "search_simple": 1,
        "action": "process",
        "json": 1,
        "page_size": page_size
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()