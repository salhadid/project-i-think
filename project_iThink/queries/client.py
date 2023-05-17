import os
import pymongo


dbname = os.environ["DATABASE_URL"]
client = pymongo.MongoClient[dbname]


class Queries:
    property
    def collection(self):
        db = client[self.DB_Name]
        return db[self.COLLECTION]
