from fastapi import (
    Depends,
    UploadFile,
    APIRouter,
    File,
)

from queries.image import ImageQueries


router = APIRouter()

@router.post("/images/")
async def create_upload_image(image: UploadFile = File(...), image_queries: ImageQueries = Depends()):
    image_id = await image_queries.save_image(image)
    return {"image_id": str(image_id)}
