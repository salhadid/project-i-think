from .client import Queries
from pydantic import BaseModel


class Message(BaseModel):
    message: str


class AiQueries(Queries):
    DB_NAME = "db-name"
    COLLECTION = "ai"

    def add_idea(self, message: Message) -> Message:
        props = message.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Message(**props)
