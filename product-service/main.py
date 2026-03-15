from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"service": "Product Service Running"}


@app.post("/products")
def create_product(name: str, price: int, db: Session = Depends(get_db)):
    product = models.Product(name=name, price=price)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()