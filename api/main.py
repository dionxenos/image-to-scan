from fastapi import FastAPI
from endpoints.scan_endpoint import router as scan_router

app = FastAPI(
    title="Image Scanner API",
    description="An API to scan and enhance images to look like scanned documents.",
    version="1.0.0",
)

app.include_router(scan_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
