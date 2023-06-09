from bson import ObjectId
from pydantic import BaseModel
from typing import Optional, List
from .client import Queries
from pymongo.collection import ReturnDocument


class ProjectIn(BaseModel):
    title: str
    description: Optional[str] = None
    responses: Optional[List[str]] = []


class ProjectOut(ProjectIn):
    id: str


class ProjectQueries(Queries):
    DB_NAME = "db-name"
    COLLECTION = "projects"

    def create_project(self, info: ProjectIn) -> ProjectOut:
        props = info.dict()
        if "responses" not in props:
            props[
                "responses"
            ] = []
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return ProjectOut(**props)

    def get_all_projects(self) -> list[ProjectOut]:
        db = self.collection.find()
        projects = []
        for document in db:
            document["id"] = str(document["_id"])
            projects.append(ProjectOut(**document))
        return projects

    def delete_project(self, project_id: str) -> None:
        """Delete a project by id."""
        self.collection.delete_one({"_id": ObjectId(project_id)})

    def remove_idea(self, id: str, response: str):
        collection = self.collection.find_one({"_id": ObjectId(id)})
        ideas = collection["responses"]
        ideas.pop(ideas.index(response))
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": collection},
            return_document=ReturnDocument.AFTER,
        )
        return ProjectOut(**collection, id=id)

    def get_project_by_id(self, id: str):
        return self.collection.find_one({"_id": ObjectId(id)})

    def get_ideas(self, project_id: str):
        collection = self.collection.find()
        responses = []
        for response in collection:
            response_data = {
                "response": response,
            }
            responses.append(response_data)
        return responses

    def get_projects_for_user(self, user_id: str) -> list[ProjectOut]:
        db = self.collection.find({"user_id": user_id})
        projects = []
        for document in db:
            document["id"] = str(document["_id"])
            projects.append(ProjectOut(**document))
        return projects
