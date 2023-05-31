import os
import pymongo


dbname = os.environ["MONGO_URL"]
client = pymongo.MongoClient(dbname)


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
