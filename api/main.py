from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.courses_routes import router as courses_router
from routes.review_router import router as review_router
from dep.security import verify_api_key
app = FastAPI()
# cors stuff
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(courses_router, prefix = "/api", tags = ["courses"], dependencies=[Depends(verify_api_key)])
app.include_router(review_router, prefix = "/api", tags = ["reviews"], dependencies=[Depends(verify_api_key)])
@app.get("/")
def root():
    return {"Test for backend": True}