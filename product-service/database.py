import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_HOST = os.getenv("MONGO_HOST", "mongodb")
MONGO_PORT = int(os.getenv("MONGO_PORT", "27017"))
MONGO_DB = os.getenv("MONGO_DB", "productdb")

_client = MongoClient(host=MONGO_HOST, port=MONGO_PORT)
_db = _client[MONGO_DB]


def get_products_collection():
    return _db["products"]