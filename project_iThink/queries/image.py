import gridfs
from fastapi import UploadFile
from .client import Queries
from bson import ObjectId


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

    def get_image(self, filename: str):
        grid_out = self.gridfs.find_one({"filename": filename})
        if not grid_out:
            raise ValueError(f"No file with name: {filename}")
        return grid_out.read()

    def get_all_images(self):
        files = self.gridfs.find()
        return [
            {"filename": file.filename, "_id": str(file._id)}
            for file in files
            if self.gridfs.exists(file._id)
        ]

    async def delete_image(self, image_id: str):
        try:
            self.gridfs.delete(ObjectId(image_id))
            return "Image deleted successfully"
        except Exception as e:
            return str(e)
