from pydantic import BaseModel
from pymongo import MongoClient
<<<<<<< HEAD
from pymongo.errors import DuplicateKeyError

# from typing import Optional
=======
from .client import Queries
from typing import Optional
>>>>>>> main
import os

from queries.client import Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    # username: Optional(str)
    email: str
    password: str
    full_name: str


class AccountOut(AccountIn):
    id: str


class AccountPatch(BaseModel):
    email: Optional[str]
    password: Optional[str]
    full_name: Optional[str]


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

    def update_user(self, email: str, info: AccountPatch) -> AccountOut:
        data = info.dict(exclude_unset=True)
        self.collection.update_one({"email": email}, {"$set": data})
        updated_user = self.collection.find_one({"email": email})
        return updated_user

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
