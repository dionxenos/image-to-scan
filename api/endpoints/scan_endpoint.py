from fastapi import File, HTTPException, UploadFile
from fastapi.routing import APIRouter
from fastapi.responses import FileResponse
from services import scan_service

router = APIRouter()


@router.post("/scan")
async def scan_image(file: UploadFile = File(...)):
    """
    Accept an image file and return a scanned version.
    """
    if not file.content_type.startswith("image/"):
        return HTTPException(status_code=400, detail="Invalid image file")

    # Read the uploaded file
    contents = await file.read()

    tmp_path = scan_service.scan_image(contents)

    return FileResponse(
        tmp_path, media_type="image/png", filename=f"scanned_{file.filename}"
    )
