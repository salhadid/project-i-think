from fastapi import (
    Depends,
    UploadFile,
    APIRouter,
    File,
    Response
)

from queries.image import ImageQueries


router = APIRouter()


@router.post("/api/images/")
async def create_upload_image(image: UploadFile = File(...), image_queries: ImageQueries = Depends()):
    image_id = await image_queries.save_image(image)
    return {"image_id": str(image_id)}


@router.get("/api/images/list/")
async def get_all_projects(repo: ImageQueries = Depends()):
    return repo.get_all_images()


@router.get("/api/images/{filename}")
async def get_image(filename: str, repo: ImageQueries = Depends()):
    file = repo.get_image(filename)
    return Response(file, media_type="image/jpeg")  # adjust the media_type according to your needs


@router.delete("/api/images/{image_id}")
async def delete_image(image_id: str, repo: ImageQueries = Depends()):
    delete_status = await repo.delete_image(image_id)
    return {"status": delete_status}
