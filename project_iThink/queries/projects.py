from pydantic import BaseModel
from typing import Optional, List
from .client import Queries


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
        if 'responses' not in props:
            props['responses'] = []   # ensure 'responses' is initialized as an empty list
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




# from pydantic import BaseModel
# from typing import Optional, List
# from .client import Queries


# class ProjectIn(BaseModel):
#     title: str
#     description: Optional[str] = None
#     responses: Optional[List[str]] = []


# class ProjectOut(ProjectIn):
#     id: str


# class ProjectQueries(Queries):
#     DB_NAME = "db-name"
#     COLLECTION = "projects"

#     def create_project(self, info: ProjectIn) -> ProjectOut:
#         props = info.dict()
#         self.collection.insert_one(props)
#         props["id"] = str(props["_id"])
#         return ProjectOut(**props)

#     def get_all_projects(self) -> list[ProjectOut]:
#         db = self.collection.find()
#         projects = []
#         for document in db:
#             document["id"] = str(document["_id"])
#             projects.append(ProjectOut(**document))
#         return projects