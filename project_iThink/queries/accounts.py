from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

# from typing import Optional
import os

from queries.client import Queries


client = MongoClient(os.environ["DATABASE_URL"])
dbname = os.environ["DATABASE_NAME"]


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    # username: Optional(str)
    email: str
    password: str
    full_name: str


class AccountOut(AccountIn):
    id: str


class AccountQueries(Queries):
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["mydatabase"]
        self.users_collection = self.db["users"]

    def get_all_users(self):
        results = self.users_collection.find()
        return list(results)

    def get_user(self, email: str) -> AccountOut:
        return self.users_collection.find_one({"email": email})

    def create_user(self, info: AccountIn, hashed_password: str) -> AccountOut:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.users_collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateKeyError
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def update_user(self, info: AccountOut, data):
        self.users_collection.update_one(info, data)
        return data

    def delete_user(self, user_id):
        self.users_collection.delete_one({"_id": user_id})
        return True


def get_all_accounts(self) -> list[AccountOut]:
    db = self.collection.find()
    accounts = []
    for document in db:
        document["id"] = str(document["_id"])
        accounts.append(AccountOut(**document))
    return accounts
