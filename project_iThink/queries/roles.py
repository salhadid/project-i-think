from pydantic import BaseModel
from .client import Queries


class RoleIn(BaseModel):
    user_id: str
    project_id: str
    role: str


class RoleOut(RoleIn):
    id: str


class RoleQueries(Queries):
    DB_NAME = "db-name"
    COLLECTION = "roles"

    def create_role(self, info: RoleIn) -> RoleOut:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return RoleOut(**props)
