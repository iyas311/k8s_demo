from fastapi import FastAPI
from database import get_products_collection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "Product Service Running"}

@app.post("/products")
def create_product(name: str, price: int):
    products = get_products_collection()
    doc = {"name": name, "price": price}
    result = products.insert_one(doc)
    return {"id": str(result.inserted_id), "name": name, "price": price}

@app.get("/products")
def get_products():
    products = get_products_collection()
    out = []
    for doc in products.find({}, {"name": 1, "price": 1}):
        out.append({"id": str(doc.get("_id")), "name": doc.get("name"), "price": doc.get("price")})
    return out