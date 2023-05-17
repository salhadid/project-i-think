from pydantic import BaseModel
from pymongo import MongoClient
from .client import Queries
# from typing import Optional
import os


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

    DB_NAME = "db-name"
    COLLECTION = "accounts"

    def get_all_users(self):
        results = self.collection.find()
        return list(results)

    def get(self, email: str) -> AccountOut:
        return self.collection.find_one({"email": email})

    def create_user(self, info: AccountIn, hashed_password: str) -> AccountOut:
        props = info.dict()
        props["password"] = hashed_password
        if self.collection.find_one({"email": props["email"]}):
            raise DuplicateAccountError()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def update_user(self, info: AccountOut, data):
        self.collection.update_one(info, data)
        return data

    def delete_user(self, user_id):
        self.collection.delete_one({"_id": user_id})
        return True


def get_all_accounts(self) -> list[AccountOut]:
    db = self.collection.find()
    accounts = []
    for document in db:
        document["id"] = str(document["_id"])
        accounts.append(AccountOut(**document))
    return accounts
