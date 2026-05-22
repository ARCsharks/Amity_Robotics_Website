from slowapi import Limiter
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.extension import (
    _rate_limit_exceeded_handler
)
from fastapi import Request

def real_ip(request: Request):
    forwarded = request.headers.get(
        "X-Forwarded-For"
    )

    if forwarded:
        return forwarded.split(",")[0]

    return request.client.host

limiter = Limiter(
    key_func=real_ip,
    default_limits=["100/hour"]
)