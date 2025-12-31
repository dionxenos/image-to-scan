import uvicorn
from config import get_settings

settings = get_settings()


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.AUTO_RELOAD,
        log_level=settings.LOG_LEVEL,
    )
