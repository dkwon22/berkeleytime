"""Cache GraphQL requests."""
import json
from functools import wraps
from hashlib import sha1

from django.core.cache import cache
from graphene_django.views import GraphQLView


CACHE_TIMEOUT = 24 * 60 * 60
CACHE_BLOCKLIST = ['Login', 'GetUser']

def cache_graphql(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode("utf-8"))
            query, variables, operation_name, id = GraphQLView.get_graphql_params(request, data)

            assert operation_name not in CACHE_BLOCKLIST

            hashed_query = sha1(str(query).encode("utf-8")).hexdigest()
            cache_key = (hashed_query, variables, operation_name, id)

            if cache_key in cache:
                response = cache.get(cache_key)
            else:
                response = view_func(request, *args, **kwargs)
            cache.set(cache_key, response, CACHE_TIMEOUT)
        except:
            response = view_func(request, *args, **kwargs)

        return response
    return wrapped_view