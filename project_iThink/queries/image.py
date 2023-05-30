import gridfs
from fastapi import UploadFile
from .client import Queries

class ImageQueries(Queries):
    DB_NAME = "db-name"
    COLLECTION = "images"

    @property
    def gridfs(self):
        db = self.collection.database
        return gridfs.GridFS(db)

    async def save_image(self, image: UploadFile):
        image_id = self.gridfs.put(await image.read(), filename=image.filename)
        return image_id
