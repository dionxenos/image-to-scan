from fastapi import FastAPI
from endpoints.scan_endpoint import router as scan_router
from config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
)

app.include_router(scan_router)
